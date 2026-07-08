import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../src/models/Service';

dotenv.config();

const SERVICES_DATA = [
  {
    title: 'Full Stack Web Development',
    description: 'End-to-end web applications from database design to polished UI deployment.',
    icon: 'FaCode',
    features: ['React + TypeScript Frontend', 'Node.js + Express Backend', 'MongoDB Database', 'REST API Development', 'Authentication & Authorization'],
    order: 1,
  },
  {
    title: 'MERN Stack Development',
    description: 'Specialized MERN stack solutions for startups and enterprises alike.',
    icon: 'FaLayerGroup',
    features: ['MongoDB Schema Design', 'Express.js APIs', 'React SPA Development', 'Node.js Server Architecture', 'Real-time Features'],
    order: 2,
  },
  {
    title: 'REST API Development',
    description: 'Scalable, secure, and well-documented REST APIs with best practices.',
    icon: 'FaServer',
    features: ['Express.js API Design', 'JWT Authentication', 'Rate Limiting & Security', 'Swagger Documentation', 'API Testing'],
    order: 3,
  },
  {
    title: 'AI Integration',
    description: 'Integrate cutting-edge AI capabilities into your existing applications.',
    icon: 'FaBrain',
    features: ['OpenAI API Integration', 'Chatbot Development', 'AI Content Generation', 'Image Analysis', 'Smart Recommendations'],
    order: 5,
  },
  {
    title: 'Performance Optimization',
    description: 'Diagnose and fix performance bottlenecks for lightning-fast user experiences.',
    icon: 'FaRocket',
    features: ['Rate-limiting', 'Code Splitting', 'Database Optimization', 'Caching Strategies'],
    order: 6,
  },
  {
    title: 'Cloud Deployment',
    description: 'Deploy your applications to production with CI/CD and monitoring.',
    icon: 'FaCloud',
    features: ['Vercel / Render Deploy', 'Environment Configuration', 'GitHub Actions CI/CD', 'Monitoring Setup'],
    order: 7,
  },
  {
    title: 'Authentication Systems',
    description: 'Secure, robust authentication with JWT, OAuth, and role-based access control.',
    icon: 'FaShieldAlt',
    features: ['JWT Auth', 'Google OAuth', 'Role-based Access', 'Session Management'],
    order: 8,
  },
];

const seedServices = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI missing in .env');
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const svcCount = await Service.countDocuments();
    if (svcCount > 0) {
      console.log('Clearing existing services...');
      await Service.deleteMany({});
    }

    await Service.insertMany(SERVICES_DATA);
    console.log('Seeded services successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
