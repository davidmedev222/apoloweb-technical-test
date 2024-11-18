import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using Tailwind's `twMerge` function.
 * @param inputs - Class names to combine
 * @returns The combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
