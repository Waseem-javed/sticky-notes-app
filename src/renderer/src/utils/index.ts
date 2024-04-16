import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Use 12-hour format
  }
  return date.toLocaleDateString('en-US', options as any)
}
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
