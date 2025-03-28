"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeContextType } from '@/types';
import { isClient } from '@/utils/helpers';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Safely get an item from localStorage with error handling
const getLocalStorageItem = (key: string): string | null => {
  if (!isClient) return null;
  
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

// Safely set an item in localStorage with error handling
const setLocalStorageItem = (key: string, value: string): void => {
  if (!isClient) return;
  
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (!isClient) return;

    const storedTheme = getLocalStorageItem('theme') as Theme | null;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemPreference;
    
    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  // Update data-theme attribute and store preference
  useEffect(() => {
    if (!isClient || !isInitialized) return;

    document.documentElement.setAttribute('data-theme', theme);
    setLocalStorageItem('theme', theme);
    
    // Optionally update the meta theme-color for browser UI
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#161B23' : '#ffffff'
      );
    }
  }, [theme, isInitialized]);

  // Listen for system preference changes
  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = getLocalStorageItem('theme');
      // Only update if the user hasn't explicitly set a preference
      if (!storedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Some older browsers use deprecated addListener method
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if ('addListener' in mediaQuery) {
      // @ts-ignore - For backwards compatibility
      mediaQuery.addListener(handleChange);
      return () => {
        // @ts-ignore - For backwards compatibility
        mediaQuery.removeListener(handleChange);
      };
    }
  }, []);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}