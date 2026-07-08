import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/models/Project';

dotenv.config();

const PROJECTS_DATA = [
  {
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
    challenges: ['Managing state with Context API across complex feeds', 'Optimizing Cloudinary uploads and retrieval'],
    architecture: 'Standard MERN with Cloudinary for asset delivery',
  },
  {
    title: 'MindMatch — React Memory Card Game',
    description: 'A responsive brain-training card matching game built in React, featuring multiple difficulty levels.',
    longDescription: 'A responsive brain-training card matching game built in React, featuring multiple difficulty levels, animated flip transitions, live score & move tracking, a countdown timer, dark/light theme toggle, and persistent best-score storage — showcasing clean component architecture and React Hooks best practices.',
    techStack: ['React', 'Tailwind CSS', 'Vite', 'LocalStorage'],
    images: ['/images/mindmatch.jpg'],
    github: 'https://github.com/Shukan-4978/memory_matching_game_',
    live: 'https://memorymatchinggame-kappa.vercel.app',
    category: ['React', 'Frontend'],
    featured: true,
    order: 5,
    features: ['Multiple difficulty levels', 'Animated flip transitions', 'Live score tracking', 'Dark/light theme toggle', 'Persistent best-score storage'],
    challenges: ['Managing complex state with Hooks for game logic', 'Creating smooth flip animations'],
    architecture: 'React Hooks-based component architecture',
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI missing in .env');
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if projects already exist
    const count = await Project.countDocuments();
    if (count > 0) {
      console.log(`Found ${count} existing projects. Clearing them for seed...`);
      await Project.deleteMany({});
    }

    const mappedProjects = PROJECTS_DATA.map(p => ({
      ...p,
      images: p.images.map(img => ({ url: img, publicId: 'static_seed' }))
    }));

    await Project.insertMany(mappedProjects);
    console.log(`Successfully seeded ${PROJECTS_DATA.length} projects!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
