---
title: TypeScript Tips for Better Code Quality
date: 2023-01-10
excerpt: Discover advanced TypeScript techniques that will help you write more maintainable code. From utility types to strict null checks, level up your TypeScript skills.
categories:
  - TypeScript
  - Best Practices
  - Code Quality
readTime: 10 min read
coverImage: /images/blog/default-cover.png
---

# TypeScript Tips for Better Code Quality

TypeScript has become an essential tool for many JavaScript developers, offering static typing and improved tooling that can help catch errors before they reach production. In this article, we'll explore some advanced TypeScript techniques to help you write cleaner, more maintainable code.

## Use Strict Compiler Options

One of the first things you should do in any TypeScript project is to enable strict mode in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    // ...other options
  }
}
```

This enables a suite of type-checking flags, including:

- `noImplicitAny`: Raise error on expressions and declarations with an implied 'any' type
- `strictNullChecks`: Make null and undefined have their own distinct types
- `strictFunctionTypes`: Enable stricter checking of function types
- `strictPropertyInitialization`: Ensure non-undefined class properties are initialized

These options will help catch many common errors and force you to write more explicit, type-safe code.

## Leverage TypeScript's Utility Types

TypeScript comes with a set of utility types that can help you transform and manipulate existing types:

### `Partial<T>`

Makes all properties in a type optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(userId: number, updates: Partial<User>) {
  // ...
}

// Now you can update just a subset of properties
updateUser(1, { name: "New Name" });
```

### `Pick<T, K>` and `Omit<T, K>`

Select or exclude specific properties from a type:

```typescript
type UserBasicInfo = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;
```

### `Record<K, T>`

Create a type with a set of properties of type K with values of type T:

```typescript
type UserRoles = Record<string, "admin" | "editor" | "viewer">;

const roles: UserRoles = {
  "user1": "admin",
  "user2": "editor",
};
```

## Type Guards for Runtime Type Checking

Type guards help you narrow down types within conditional blocks:

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // Now TypeScript knows value is a string
    console.log(value.toUpperCase());
  } else {
    console.log("Not a string");
  }
}
```

You can also use the `in` operator or `instanceof` for more complex types:

```typescript
interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function isDog(animal: Dog | Cat): animal is Dog {
  return "bark" in animal;
}
```

## Discriminated Unions

A powerful pattern for modeling complex data structures:

```typescript
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; size: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.size ** 2;
    default:
      // TypeScript will catch if we forget to handle any case
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape kind: ${_exhaustiveCheck}`);
  }
}
```

## Generic Constraints

Add constraints to generics to make them more specific:

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): T {
  console.log(value.length);
  return value;
}

// Works for strings, arrays, or any type with a length property
logLength("Hello");
logLength([1, 2, 3]);
logLength({ length: 10, value: "test" });
```

## Template Literal Types

TypeScript 4.1 introduced template literal types, allowing you to perform string manipulations at the type level:

```typescript
type EventName = "click" | "focus" | "blur";
type Handler = `on${Capitalize<EventName>}`;

// Type is "onClick" | "onFocus" | "onBlur"
```

## Mapped Types

Create new types by transforming properties of existing ones:

```typescript
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type ReadOnlyUser = ReadOnly<User>;
```

## Conditional Types

Create types that depend on other types:

```typescript
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function fetcher(): Promise<User> {
  return fetch('/api/user').then(r => r.json());
}

type FetcherReturn = ExtractReturnType<typeof fetcher>; // Promise<User>
```

## Avoid Type Assertions When Possible

Type assertions (using `as`) bypass TypeScript's type checking. While sometimes necessary, they should be used sparingly:

```typescript
// Avoid this when possible
const userData = apiResponse as User;

// Better: Use type guards or other type-safe patterns
if (isUser(apiResponse)) {
  const userData: User = apiResponse;
}
```

## Type-Safe Event Handlers

Make your event handlers type-safe to avoid common errors:

```typescript
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value;
  // ...
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // ...
}
```

## Conclusion

TypeScript offers a wealth of features to improve code quality and developer experience. By embracing these advanced techniques, you can make your codebase more robust, self-documenting, and maintainable.

Remember that the goal of TypeScript is not just to add types for the sake of it, but to use the type system as a tool to clarify your code's intent and prevent potential bugs. A well-typed codebase serves as living documentation and a safety net for refactoring.

As you continue to work with TypeScript, you'll develop an intuition for when to apply these techniques and how to balance type safety with code simplicity.