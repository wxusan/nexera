export interface SiteContent {
  [key: string]: string;
}

export interface Stat {
  number: number;
  suffix: string;
  prefix: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  timeline: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  photo_url: string;
}

export interface Testimonial {
  name: string;
  country: string;
  university: string;
  program: string;
  quote: string;
  rating: number;
  flag: string;
}

export interface University {
  name: string;
  country: string;
  countryCode: string;
  programs: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteData {
  content: SiteContent;
  stats: Stat[];
  services: Service[];
  process: ProcessStep[];
  team: TeamMember[];
  testimonials: Testimonial[];
  universities: University[];
  faq: FaqItem[];
  countries: string[];
}
