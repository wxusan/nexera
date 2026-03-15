import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{1,3})(\d{1,3})(\d{4})/, '($1) $2-$3');
}

export function getWhatsAppURL(message: string = 'Hello, I\'m interested in your services.'): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+1234567890';
  const cleanNumber = number.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function getServiceIcon(serviceType: string): string {
  const iconMap: Record<string, string> = {
    'university-admissions': 'BookOpen',
    'student-visa': 'Passport',
    'tourist-visa': 'Plane',
    'business-visa': 'Briefcase',
  };
  return iconMap[serviceType] || 'Globe';
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
