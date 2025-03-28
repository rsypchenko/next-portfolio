export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10;
};

export const validateSubject = (subject: string): boolean => {
  return subject.trim().length >= 3;
};

export type ValidationErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export const validateContactForm = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateSubject(formData.subject)) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  if (!validateMessage(formData.message)) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};