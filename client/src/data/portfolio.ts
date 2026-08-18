// ===========================
// Static portfolio data
// (used as fallback when API is unavailable)
// ===========================
import type {
  Project, Skill, Experience, Certificate,
  Achievement, Testimonial, Service, Blog,
  HeroData, AboutData, SocialLink
} from '@/types'

export const HERO_DATA: HeroData = {
  name: 'Shukan Prajapati',
  title: ['Full Stack Developer', 'MERN Stack Developer', 'React Developer', 'Backend Engineer'],
  subtitle: 'I build scalable web applications with modern technologies.',
  availability: true,
}

export const ABOUT_DATA: AboutData = {
  bio: `I'm Shukan Prajapati, a passionate Full Stack MERN Developer who loves turning complex problems into elegant, user-friendly solutions. With a deep focus on clean code, performance, and modern design, I craft web applications that are both powerful and beautiful.

My journey in web development started with curiosity and has evolved into a deep expertise spanning the entire JavaScript ecosystem — from pixel-perfect React UIs to robust Node.js APIs and MongoDB databases.`,
  stats: {
    yearsOfExperience: 0,
    projectsCompleted: 5,
    githubContributions: 500,
    problemsSolved: 0,
  },
  education: [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      school: 'Gujarat Technological University',
      year: '2022 – 2026',
      grade: '8.21 CGPA',
      description: 'Focused on backend & frontend development, Web Development, and Software Engineering.',
    },
  ],
  highlights: [
    'Full Stack MERN expertise with TypeScript',
    'RESTful API design & development',
    'Database design & optimization',
    'Cloud deployment & DevOps basics',
    'Strong problem-solving skills',
    'Clean code & best practices advocate',
  ],
}

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { _id: '1', name: 'React.js', icon: 'react', category: 'Frontend', level: 90, yearsExp: 2 },
  { _id: '2', name: 'TypeScript', icon: 'typescript', category: 'Frontend', level: 85, yearsExp: 1.5 },
  { _id: '4', name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend', level: 90, yearsExp: 2 },
  { _id: '5', name: 'HTML5', icon: 'html', category: 'Frontend', level: 95, yearsExp: 3 },
  { _id: '6', name: 'CSS3', icon: 'css', category: 'Frontend', level: 90, yearsExp: 3 },
  // Backend
  { _id: '7', name: 'Node.js', icon: 'nodejs', category: 'Backend', level: 85, yearsExp: 2 },
  { _id: '8', name: 'Express.js', icon: 'express', category: 'Backend', level: 85, yearsExp: 2 },
  { _id: '9', name: 'REST APIs', icon: 'api', category: 'API', level: 88, yearsExp: 2 },
  // Database
  { _id: '11', name: 'MongoDB', icon: 'mongodb', category: 'Database', level: 85, yearsExp: 2 },

  // Languages
  { _id: '14', name: 'JavaScript', icon: 'javascript', category: 'Languages', level: 92, yearsExp: 3 },

  // State Management
  { _id: '16', name: 'Redux Toolkit', icon: 'redux', category: 'State Management', level: 80, yearsExp: 1.5 },
  // Authentication
  { _id: '18', name: 'JWT', icon: 'jwt', category: 'Authentication', level: 85, yearsExp: 2 },
  { _id: '19', name: 'OAuth 2.0', icon: 'oauth', category: 'Authentication', level: 75, yearsExp: 1 },
  // Cloud & Deployment
  { _id: '20', name: 'Vercel', icon: 'vercel', category: 'Deployment', level: 85, yearsExp: 2 },
  { _id: '20b', name: 'Render', icon: 'render', category: 'Deployment', level: 80, yearsExp: 1 },
  { _id: '21', name: 'Cloudinary', icon: 'cloudinary', category: 'Cloud', level: 80, yearsExp: 1.5 },
  // DevOps
  { _id: '23', name: 'Docker', icon: 'docker', category: 'DevOps', level: 65, yearsExp: 0.5 },
  { _id: '24', name: 'GitHub Actions', icon: 'github', category: 'DevOps', level: 70, yearsExp: 1 },
  // Version Control
  { _id: '25', name: 'Git', icon: 'git', category: 'Version Control', level: 88, yearsExp: 3 },
  { _id: '26', name: 'GitHub', icon: 'github', category: 'Version Control', level: 88, yearsExp: 3 },
  // Testing
  { _id: '27', name: 'Postman', icon: 'postman', category: 'Testing', level: 85, yearsExp: 1.5 },
  { _id: '27b', name: 'Thunder Client', icon: 'thunderclient', category: 'Testing', level: 80, yearsExp: 1 },
  // AI Tools
  { _id: '28', name: 'OpenAI API', icon: 'openai', category: 'AI Tools', level: 70, yearsExp: 0.5 },
  { _id: '29', name: 'Gemini API', icon: 'gemini', category: 'AI Tools', level: 65, yearsExp: 0.5 },
  { _id: '29b', name: 'Claude AI', icon: 'claude', category: 'AI Tools', level: 65, yearsExp: 0.5 },
  // Libraries
  { _id: '30', name: 'Framer Motion', icon: 'framer', category: 'Libraries', level: 80, yearsExp: 1 },
]

export const PROJECTS_DATA: Project[] = [
  {
    _id: '1',
    title: 'ContentForge AI — AI-Powered Content Generator & SaaS Platform',
    description: 'A full-stack SaaS web app that generates marketing and blog content on demand with subscription tiers.',
    longDescription: "A full-stack SaaS web app that generates marketing and blog content on demand using OpenAI's API. Users sign up, get JWT-secured accounts, and generate content within usage limits tied to Free, Basic, or Premium subscription tiers — upgradeable via Stripe or Razorpay. Includes content history, an admin panel, and automated monthly usage resets via cron jobs.",
    techStack: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'KryonexG API', 'Tailwind CSS'],
    images: ['/images/contentforge.jpg'],
    github: 'https://github.com/Shukan-4978/AI-Content_genertor',
    live: 'https://ai-content-genertor-khaki.vercel.app',
    category: ['AI', 'MERN', 'Full Stack'],
    featured: true,
    order: 1,
    features: ['AI content generation', 'Subscription tiers', 'Razorpay payment integration', 'Admin panel', 'Automated monthly usage resets'],
    challenges: ['Handling payment webhooks securely', 'Integrating external AI APIs efficiently'],
    architecture: 'MERN Stack with JWT Auth and CRON jobs for monthly resets',
  },
  {
    _id: '2',
    title: 'P.I.E — Platform for Investors & Entrepreneurs',
    description: 'A full-stack social platform connecting startup founders with investors, featuring AI-powered pitch deck analysis.',
    longDescription: 'A full-stack social platform connecting startup founders with investors. Founders create detailed startup profiles and upload pitch decks for AI-powered analysis — Google Gemini extracts and scores the deck (investment score, market score, strengths/risks) and returns a recommendation. The platform supports a social feed, real-time chat, live notifications via Socket.IO, and subscription payments via Razorpay.',
    techStack: ['React', 'Redux Toolkit', 'Socket.IO', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Razorpay', 'Tailwind CSS'],
    images: ['/images/pie_project.jpg'],
    github: 'https://github.com/Shukan-4978/P.I.E',
    live: 'https://p-i-e-zeta.vercel.app',
    category: ['AI', 'MERN', 'Full Stack'],
    featured: true,
    order: 2,
    features: ['AI pitch-deck analysis', 'Real-time chat & notifications', 'Social feed for startups', 'Investor matching', 'Razorpay subscriptions'],
    challenges: ['Processing and extracting text from PDFs', 'Real-time bidirectional communication with Socket.IO'],
    architecture: 'MERN stack with WebSockets for real-time features and Bull/Redis for background jobs',
  },
  {
    _id: '3',
    title: 'AI Chat Assistant — MERN AI Chatbot with Groq-powered conversations',
    description: "A ChatGPT-style conversational assistant built on the MERN stack, powered by Groq's LLM API for fast responses.",
    longDescription: "A ChatGPT-style conversational assistant built on the MERN stack, powered by Groq's LLM API for fast responses. Users register with basic details and get a unique 4-digit passcode for login (no email/password flow). The app supports multiple chat sessions per user, persistent message history, file/image attachments in messages, and a typing indicator for a natural chat feel. Fully containerized with Docker for easy deployment.",
    techStack: ['React 19', 'Vite', 'Framer Motion', 'Node.js', 'Express', 'MongoDB', 'Groq SDK', 'Docker'],
    images: ['/images/ai_chat_project.jpg'],
    github: 'https://github.com/Shukan-4978/AI_Chatbot_Gemini_',
    live: 'https://ai-chatbot-gemini-frontend.vercel.app',
    category: ['AI', 'MERN', 'Full Stack'],
    featured: true,
    order: 3,
    features: ['Live typing indicator', 'Multiple chat sessions', 'Persistent message history', 'File/image attachments', 'Docker containerization'],
    challenges: ['Integrating fast LLM inference with Groq', 'Handling file attachments in chat'],
    architecture: 'MERN Stack with Groq API integration and Dockerized deployment',
  },
  {
    _id: '4',
    title: 'PostSocial — A MERN Social Feed App',
    description: 'A lightweight social networking app where users can post text and images to a shared community feed.',
    longDescription: 'A lightweight social networking app where users sign up, log in with JWT-based auth, and post text and/or images to a shared feed. Posts support likes and comments, images are uploaded to Cloudinary, and the feed is sorted newest-first. Built with a Material UI + Bootstrap frontend and an Express/MongoDB backend.',
    techStack: ['React 19', 'Vite', 'Material UI', 'React Bootstrap', 'Node.js', 'Express 5', 'MongoDB', 'Cloudinary'],
    images: ['/images/postsocial_project.jpg'],
    github: 'https://github.com/Shukan-4978/post_social_',
    live: 'https://post-social-iota.vercel.app',
    category: ['MERN', 'Full Stack'],
    featured: true,
    order: 4,
    features: ['JWT-based signup/login with protected routes', 'Create posts with text, image, or both', 'Feed sorted by newest first', 'Likes and comments on posts', 'Cloudinary image storage (5MB limit)'],
    challenges: ['Handling multi-part form data for image uploads', 'CORS configuration for multiple deployed origins'],
    architecture: 'MERN stack with Cloudinary for media and Vercel for frontend hosting',
  },
  {
    _id: '5',
    title: 'MindMatch — React Memory Card Game',
    description: 'A responsive memory-matching game with multiple difficulty levels, animated flips, score & move tracking, dark mode, and saved best scores.',
    longDescription: 'A responsive brain-training card matching game built in React, featuring multiple difficulty levels, animated flip transitions, live score & move tracking, a countdown timer, dark/light theme toggle, and persistent best-score storage — showcasing clean component architecture and React Hooks best practices.',
    techStack: ['React', 'React Hooks', 'Vite', 'Tailwind CSS', 'LocalStorage'],
    images: ['/images/mindmatch_project.jpg'],
    github: 'https://github.com/Shukan-4978/memory_matching_game_',
    live: 'https://memorymatchinggame-kappa.vercel.app',
    category: ['React', 'Frontend'],
    featured: true,
    order: 5,
    features: ['Multiple difficulty levels', 'Live score & move tracking', 'Dark/light theme toggle', 'Persistent best-score storage', 'Animated flip transitions'],
    challenges: ['Managing complex state with React Hooks', 'Implementing smooth card flip animations in CSS/React'],
    architecture: 'Component-based frontend architecture with browser LocalStorage for data persistence',
  }
]

export const EXPERIENCE_DATA: Experience[] = [
  {
    _id: '1',
    company: 'Vedshil Careers',
    role: 'MERN Stack Intern',
    startDate: '2026-01',
    current: true,
    type: 'Internship',
    location: 'Gandhinagar, Gujarat (On-site)',
    description: [
      'Developed and maintained full-stack web applications using the MERN stack.',
      'Collaborated with the team to implement new features and improve application performance.',
      'Gained hands-on experience in building scalable RESTful APIs and responsive user interfaces.',
    ],
    skills: ['React', 'Express', 'Node.js', 'MongoDB', 'TypeScript', 'Cloudinary', 'Tailwind CSS'],
  },
  {
    _id: '2',
    company: 'Clickaway IT Solutions',
    role: 'Junior Python Developer',
    startDate: '2025-06',
    endDate: '2025-07',
    current: false,
    type: 'Internship',
    location: 'Ahmedabad, Gujarat (On-site)',
    description: [
      'Assisted in developing and debugging Python scripts for various internal projects.',
      'Learned foundational software development practices and Python programming concepts.',
    ],
    skills: ['Python'],
  },
]

export const CERTIFICATES_DATA: Certificate[] = [
  {
    _id: '1',
    title: 'The Complete Web Developer Bootcamp',
    issuer: 'Udemy',
    date: '2023-03',
    credentialUrl: '#',
  },
  {
    _id: '2',
    title: 'Node.js, Express, MongoDB & More',
    issuer: 'Udemy',
    date: '2023-06',
    credentialUrl: '#',
  },
  {
    _id: '3',
    title: 'React - The Complete Guide 2024',
    issuer: 'Udemy',
    date: '2023-09',
    credentialUrl: '#',
  },
  {
    _id: '4',
    title: 'TypeScript Complete Developer Guide',
    issuer: 'Udemy',
    date: '2024-01',
    credentialUrl: '#',
  },
  {
    _id: '5',
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training',
    date: '2024-03',
    credentialUrl: '#',
  },
  {
    _id: '6',
    title: 'Google UX Design Certificate',
    issuer: 'Google',
    date: '2024-06',
    credentialUrl: '#',
  },
]

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    _id: '1',
    title: 'JavaScript for Beginners',
    type: 'Badge',
    description: 'Completion Certificate for the JavaScript for Beginners course by Simplilearn.',
    date: '2026',
  }
]

export const SERVICES_DATA: Service[] = [
  {
    _id: '1',
    title: 'Full Stack Web Development',
    description: 'End-to-end web applications from database design to polished UI deployment.',
    icon: 'FaCode',
    features: ['React + TypeScript Frontend', 'Node.js + Express Backend', 'MongoDB Database', 'REST API Development', 'Authentication & Authorization'],
    order: 1,
  },
  {
    _id: '2',
    title: 'MERN Stack Development',
    description: 'Specialized MERN stack solutions for startups and enterprises alike.',
    icon: 'FaLayerGroup',
    features: ['MongoDB Schema Design', 'Express.js APIs', 'React SPA Development', 'Node.js Server Architecture', 'Real-time Features'],
    order: 2,
  },
  {
    _id: '3',
    title: 'REST API Development',
    description: 'Scalable, secure, and well-documented REST APIs with best practices.',
    icon: 'FaServer',
    features: ['Express.js API Design', 'JWT Authentication', 'Rate Limiting & Security', 'Swagger Documentation', 'API Testing'],
    order: 3,
  },

  {
    _id: '5',
    title: 'AI Integration',
    description: 'Integrate cutting-edge AI capabilities into your existing applications.',
    icon: 'FaBrain',
    features: ['OpenAI API Integration', 'Chatbot Development', 'AI Content Generation', 'Image Analysis', 'Smart Recommendations'],
    order: 5,
  },
  {
    _id: '6',
    title: 'Performance Optimization',
    description: 'Diagnose and fix performance bottlenecks for lightning-fast user experiences.',
    icon: 'FaRocket',
    features: ['Rate-limiting', 'Code Splitting', 'Database Optimization', 'Caching Strategies'],
    order: 6,
  },
  {
    _id: '7',
    title: 'Cloud Deployment',
    description: 'Deploy your applications to production with CI/CD and monitoring.',
    icon: 'FaCloud',
    features: ['Vercel / Render Deploy', 'Environment Configuration', 'GitHub Actions CI/CD', 'Monitoring Setup'],
    order: 7,
  },
  {
    _id: '8',
    title: 'Authentication Systems',
    description: 'Secure, robust authentication with JWT, OAuth, and role-based access control.',
    icon: 'FaShieldAlt',
    features: ['JWT Auth', 'Google OAuth', 'Role-based Access', 'Session Management'],
    order: 8,
  },
]

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    _id: '1',
    name: 'Rahul Sharma',
    role: 'Startup Founder',
    company: 'TechVentures',
    rating: 5,
    message: 'Shukan delivered an exceptional e-commerce platform that exceeded all our expectations. His attention to detail, clean code, and ability to meet tight deadlines made him an invaluable partner. Highly recommended!',
    createdAt: '2024-05-01',
  },
  {
    _id: '2',
    name: 'Priya Patel',
    role: 'Product Manager',
    company: 'DigitalFirst Agency',
    rating: 5,
    message: 'Working with Shukan was an absolute pleasure. He built our entire admin dashboard from scratch and the result was beyond impressive. His expertise in MERN stack is evident in every line of code.',
    createdAt: '2024-04-15',
  },
  {
    _id: '3',
    name: 'Arjun Mehta',
    role: 'CTO',
    company: 'InnovateTech',
    rating: 5,
    message: 'Shukan is one of the best developers I have worked with. He integrated our AI features seamlessly and the performance optimizations he made resulted in a 40% improvement in load times.',
    createdAt: '2024-03-20',
  },
  {
    _id: '4',
    name: 'Sneha Gupta',
    role: 'Lead Developer',
    company: 'WebSolutions',
    rating: 5,
    message: 'Exceptional TypeScript skills and a great eye for UI/UX. Shukan refactored our entire codebase making it maintainable and scalable. The code quality is production-ready from day one.',
    createdAt: '2024-02-10',
  },
]

export const BLOGS_DATA: Blog[] = [
  {
    _id: '1',
    title: 'Building Scalable MERN Apps: Architecture Patterns I Swear By',
    slug: 'scalable-mern-architecture',
    excerpt: 'Lessons learned from building production MERN applications — folder structure, error handling, authentication, and performance patterns that actually scale.',
    content: '',
    tags: ['MERN', 'Node.js', 'Architecture', 'TypeScript'],
    readTime: 8,
    publishedAt: '2024-10-15',
    featured: true,
  },
  {
    _id: '2',
    title: 'TypeScript with React: The Patterns That Changed My Code Forever',
    slug: 'typescript-react-patterns',
    excerpt: 'How TypeScript generics, discriminated unions, and custom hooks can make your React codebase bulletproof and a joy to maintain.',
    content: '',
    tags: ['TypeScript', 'React', 'Patterns', 'Frontend'],
    readTime: 6,
    publishedAt: '2024-09-28',
    featured: true,
  },
  {
    _id: '3',
    title: 'MongoDB Aggregations: From Zero to Analytics Pipeline',
    slug: 'mongodb-aggregation-guide',
    excerpt: 'A practical guide to MongoDB aggregation pipelines — grouping, lookups, and building real analytics dashboards with real data.',
    content: '',
    tags: ['MongoDB', 'Database', 'Backend', 'Aggregation'],
    readTime: 10,
    publishedAt: '2024-09-10',
    featured: false,
  },
  {
    _id: '4',
    title: 'JWT Auth Done Right: Refresh Tokens & Security Best Practices',
    slug: 'jwt-auth-best-practices',
    excerpt: 'Stop storing JWTs in localStorage. A deep dive into secure JWT implementation with httpOnly cookies, refresh token rotation, and CSRF protection.',
    content: '',
    tags: ['Security', 'JWT', 'Authentication', 'Node.js'],
    readTime: 7,
    publishedAt: '2024-08-20',
    featured: false,
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { _id: '1', platform: 'GitHub', url: 'https://github.com/Shukan-4978', icon: 'FaGithub' },
  { _id: '2', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shukan-prajapati-407106338/', icon: 'FaLinkedin' },
  { _id: '3', platform: 'Email', url: 'mailto:shukanp0509@gmail.com', icon: 'FaEnvelope' },
]
