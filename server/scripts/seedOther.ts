import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from '../src/models/Skill';
import Experience from '../src/models/Experience';
import Achievement from '../src/models/Achievement';

dotenv.config();

const SKILLS_DATA = [
  { name: 'React.js', icon: 'react', category: 'Frontend', level: 90, yearsExp: 2 },
  { name: 'TypeScript', icon: 'typescript', category: 'Frontend', level: 85, yearsExp: 1.5 },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend', level: 90, yearsExp: 2 },
  { name: 'HTML5', icon: 'html', category: 'Frontend', level: 95, yearsExp: 3 },
  { name: 'CSS3', icon: 'css', category: 'Frontend', level: 90, yearsExp: 3 },
  { name: 'Node.js', icon: 'nodejs', category: 'Backend', level: 85, yearsExp: 2 },
  { name: 'Express.js', icon: 'express', category: 'Backend', level: 85, yearsExp: 2 },
  { name: 'REST APIs', icon: 'api', category: 'API', level: 88, yearsExp: 2 },
  { name: 'MongoDB', icon: 'mongodb', category: 'Database', level: 85, yearsExp: 2 },
  { name: 'Redis', icon: 'redis', category: 'Database', level: 60, yearsExp: 0.5 },
  { name: 'JavaScript', icon: 'javascript', category: 'Languages', level: 92, yearsExp: 3 },
  { name: 'Python', icon: 'python', category: 'Languages', level: 70, yearsExp: 1.5 },
  { name: 'Redux Toolkit', icon: 'redux', category: 'State Management', level: 80, yearsExp: 1.5 },
  { name: 'JWT', icon: 'jwt', category: 'Authentication', level: 85, yearsExp: 2 },
  { name: 'OAuth 2.0', icon: 'oauth', category: 'Authentication', level: 75, yearsExp: 1 },
  { name: 'Vercel', icon: 'vercel', category: 'Deployment', level: 85, yearsExp: 2 },
  { name: 'Render', icon: 'render', category: 'Deployment', level: 80, yearsExp: 1 },
  { name: 'Cloudinary', icon: 'cloudinary', category: 'Cloud', level: 80, yearsExp: 1.5 },
  { name: 'Docker', icon: 'docker', category: 'DevOps', level: 65, yearsExp: 0.5 },
  { name: 'GitHub Actions', icon: 'github', category: 'DevOps', level: 70, yearsExp: 1 },
  { name: 'Git', icon: 'git', category: 'Version Control', level: 88, yearsExp: 3 },
  { name: 'GitHub', icon: 'github', category: 'Version Control', level: 88, yearsExp: 3 },
  { name: 'Postman', icon: 'postman', category: 'Testing', level: 85, yearsExp: 1.5 },
  { name: 'Thunder Client', icon: 'thunderclient', category: 'Testing', level: 80, yearsExp: 1 },
  { name: 'OpenAI API', icon: 'openai', category: 'AI Tools', level: 70, yearsExp: 0.5 },
  { name: 'Gemini API', icon: 'gemini', category: 'AI Tools', level: 65, yearsExp: 0.5 },
  { name: 'Framer Motion', icon: 'framer', category: 'Libraries', level: 80, yearsExp: 1 }
];

const EXPERIENCE_DATA = [
  {
    company: 'Vedshil Careers',
    role: 'MERN Stack Intern',
    startDate: '2026-01-01',
    current: true,
    type: 'Internship',
    location: 'Gandhinagar, Gujarat (On-site)',
    description: [
      'Developed and maintained full-stack web applications using the MERN stack.',
      'Collaborated with the team to implement new features and improve application performance.',
      'Gained hands-on experience in building scalable RESTful APIs and responsive user interfaces.'
    ],
    skills: ['React', 'Express', 'Node.js', 'MongoDB', 'TypeScript', 'Cloudinary', 'Tailwind CSS']
  },
  {
    company: 'Clickaway IT Solutions',
    role: 'Junior Python Developer',
    startDate: '2025-06-01',
    endDate: '2025-07-31',
    current: false,
    type: 'Internship',
    location: 'Ahmedabad, Gujarat (On-site)',
    description: [
      'Assisted in developing and debugging Python scripts for various internal projects.',
      'Learned foundational software development practices and Python programming concepts.'
    ],
    skills: ['Python']
  }
];

const ACHIEVEMENTS_DATA = [
  {
    title: 'JavaScript for Beginners',
    type: 'Badge',
    description: 'Completion Certificate for the JavaScript for Beginners course by Simplilearn.',
    date: '2026-01-01'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI missing in .env');
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount > 0) {
      console.log('Clearing existing skills...');
      await Skill.deleteMany({});
    }
    await Skill.insertMany(SKILLS_DATA);
    console.log('Seeded skills!');

    // Seed Experience
    const expCount = await Experience.countDocuments();
    if (expCount > 0) {
      console.log('Clearing existing experiences...');
      await Experience.deleteMany({});
    }
    await Experience.insertMany(EXPERIENCE_DATA);
    console.log('Seeded experiences!');

    // Seed Achievements
    const achCount = await Achievement.countDocuments();
    if (achCount > 0) {
      console.log('Clearing existing achievements...');
      await Achievement.deleteMany({});
    }
    await Achievement.insertMany(ACHIEVEMENTS_DATA);
    console.log('Seeded achievements!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();

