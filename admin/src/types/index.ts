// ===========================
// Core Portfolio Types
// ===========================

export interface Project {
  _id: string
  title: string
  description: string
  longDescription?: string
  techStack: string[]
  images: string[]
  github?: string
  live?: string
  category: ('AI' | 'MERN' | 'Full Stack' | 'React' | 'Backend')[]
  featured: boolean
  order: number
  features?: string[]
  challenges?: string[]
  architecture?: string
  performance?: string
  createdAt?: string
}

export interface Skill {
  _id: string
  name: string
  icon: string
  category: SkillCategory
  level: number // 0-100
  yearsExp?: number
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud'
  | 'DevOps'
  | 'AI Tools'
  | 'Languages'
  | 'Libraries'
  | 'Frameworks'
  | 'State Management'
  | 'Authentication'
  | 'Testing'
  | 'Deployment'
  | 'API'
  | 'Version Control'

export interface Experience {
  _id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
  logo?: string
  type: 'Internship' | 'Freelance' | 'Full-time' | 'Part-time'
  location?: string
  skills?: string[]
}

export interface Certificate {
  _id: string
  title: string
  issuer: string
  date: string
  image?: string
  credentialUrl?: string
  credentialId?: string
}

export interface Achievement {
  _id: string
  title: string
  type: 'Hackathon' | 'Contest' | 'Open Source' | 'LeetCode' | 'GitHub' | 'Award' | 'Badge'
  description: string
  icon?: string
  date?: string
  url?: string
  rank?: string
}

export interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  readTime: number
  coverImage?: string
  publishedAt: string
  featured: boolean
}

export interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  avatar?: string
  rating: number
  message: string
  createdAt: string
}

export interface Service {
  _id: string
  title: string
  description: string
  icon: string
  features: string[]
  order: number
}

export interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export interface HeroData {
  name: string
  title: string[]
  subtitle: string
  availability: boolean
}

export interface AboutData {
  bio: string
  photo?: string
  stats: {
    yearsOfExperience: number
    projectsCompleted: number
    githubContributions: number
    problemsSolved: number
  }
  education: Education[]
  highlights: string[]
}

export interface Education {
  degree: string
  school: string
  year: string
  grade?: string
  description?: string
}

export interface SocialLink {
  _id: string
  platform: string
  url: string
  icon: string
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

// ===========================
// API Response Types
// ===========================
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  count?: number
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
}

// ===========================
// Theme Types
// ===========================
export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

// ===========================
// Contact Form
// ===========================
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// ===========================
// Admin Types
// ===========================
export interface Admin {
  _id: string
  email: string
  role: 'admin' | 'super_admin'
}

export interface AuthState {
  admin: Admin | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// ===========================
// Filter Types
// ===========================
export type ProjectFilter = 'All' | 'AI' | 'MERN' | 'Full Stack' | 'React' | 'Backend'

// ===========================
// Visitor Types
// ===========================
export interface Visitor {
  _id: string
  ip: string
  page: string
  userAgent: string
  timestamp: string
  country?: string
}

// ===========================
// Analytics Types
// ===========================
export interface Analytics {
  totalVisitors: number
  totalMessages: number
  totalProjects: number
  totalBlogs: number
  recentMessages: Message[]
  visitorTrend: { date: string; count: number }[]
}
