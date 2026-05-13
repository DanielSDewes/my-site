export const personalInfo = {
  name: 'Daniel Dewes',
  role: 'Full Stack Developer',
  tagline: 'Building fast, scalable, and elegant software.',
  subtitle:
    'Backend-focused developer specializing in robust systems, high-performance APIs, and modern web applications. Turning complex problems into clean, efficient solutions.',
  github: 'https://github.com/DanielSDewes',
  linkedin: 'https://linkedin.com/in/danieldewes',
  email: 'danieldewes@email.com',
  location: 'Brazil',
};

export const aboutHighlights = [
  'Problem Solving',
  'Clean Code',
  'Performance first',
  'Scalability',
  'Continuous Learning',
  'SOLID Principles',
];

export const aboutStats = [
  { num: '3+', label: 'Years of experience' },
  { num: '30+', label: 'Projects' },
  { num: '8+', label: 'APIs created' },
  { num: '200+', label: 'Commits' },
];

export const skills = [
  {
    category: 'Backend',
    icon: 'Zap',
    items: [
      { name: 'Python', level: 92 },
      { name: 'FastAPI', level: 88 },
      { name: 'APIs REST', level: 90 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'SQL', level: 84 },
    ],
  },
  {
    category: 'Frontend',
    icon: 'Code2',
    items: [
      { name: 'React', level: 78 },
      { name: 'JavaScript', level: 80 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'HTML / CSS', level: 88 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: 'Tool',
    items: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'Postman', level: 88 },
      { name: 'Linux', level: 72 },
    ],
  },
  {
    category: 'Architecture',
    icon: 'Building2',
    items: [
      { name: 'Clean Architecture', level: 80 },
      { name: 'SOLID Principles', level: 78 },
      { name: 'JWT Authentication', level: 85 },
      { name: 'API Integrations', level: 82 },
    ],
  },
];

export const experience = [
  {
  period: '2025 — Present',
  role: 'Software Developer',
  company: 'Aliare',
  description:
    'Responsible for implementing complex improvements in production systems, performing bug analysis and diagnostics, and providing advanced technical support. Also acted as interim Tech Lead, guiding the development team, resolving technical challenges, mentoring developers, and driving improvements in financial workflows, third-party integrations, and SQL performance optimization.',
  tech: ['C#', 'SQL', 'REST APIs', 'Webhooks', 'PostgreSQL'],
  current: true,
  },
  {
    period: '2023 — 2025',
    role: 'Junior Software Developer',
    company: 'Aliare',
    description:
      'Worked on the development and maintenance of enterprise software systems, focusing on bug fixing, continuous improvement, and legacy data migration. Specialized in database modeling, advanced SQL querying, and transforming large datasets across multiple database technologies with consistency and accuracy.',
    tech: ['Oracle SQL', 'PostgreSQL', 'MySQL', 'GeneXus', 'Data Migration'],
    current: false,
  },
  {
    period: '2023',
    role: 'Software Development Technician',
    company: 'Aliare',
    description:
      'Developed software applications using GeneXus IDE, working with relational databases in PostgreSQL and MySQL environments. Contributed to internal systems maintenance, feature implementation, and technical database operations.',
    tech: ['GeneXus', 'PostgreSQL', 'MySQL', 'SQL'],
    current: false,
  },
  {
    period: '2022 — 2023',
    role: 'Administrative Clerk',
    company: 'Aliare',
    description:
      'Supported operational and management processes by organizing development workflows, documenting internal procedures, monitoring team activities, and assisting with project coordination, building a strong foundation in software delivery processes.',
    tech: ['Microsoft Excel', 'Process Management', 'Documentation'],
    current: false,
  },
];

export const projects = [
  {
  type: 'Frontend / AI Tool',
  name: 'Remove Background Web App',
  description:
    'Modern React-based web application for AI-powered background removal. Features intuitive image upload, real-time preview, responsive UI, and seamless integration with a custom backend API for image processing.',
  tech: ['React', 'JavaScript', 'CSS', 'REST API'],
  github: 'https://github.com/DanielSDewes/Remove-Fundo-Front',
  demo: null,
  accent: '#00C2FF',
  icon: 'Image',
  },
  {
    type: 'Backend / API',
    name: 'Background Removal API',
    description:
      'REST API built for automated image background removal, designed for scalable processing and easy third-party integration. Focused on clean architecture, performance, and backend reliability.',
    tech: ['Python', 'FastAPI', 'REST API', 'Docker'],
    github: 'https://github.com/DanielSDewes/API-remove-background',
    demo: null,
    accent: '#7C3AED',
    icon: 'Server',
  },
  {
    type: 'Full Stack / Productivity',
    name: 'Controla Estudos',
    description:
      'Study management platform focused on productivity and organization. Built to help students track progress, manage schedules, and organize learning routines through an intuitive interface.',
    tech: ['React', 'JavaScript', 'Node.js', 'SQL'],
    github: 'https://github.com/DanielSDewes/ControlaEstudos',
    demo: null,
    accent: '#00FFC8',
    icon: 'BookOpen',
  },
  {
    type: 'Realtime / Web Application',
    name: 'Chat Online',
    description:
      'Real-time chat application built for instant communication, featuring interactive messaging, responsive UI, and modern web architecture focused on user experience and scalability.',
    tech: ['React', 'JavaScript', 'WebSocket', 'Node.js'],
    github: 'https://github.com/DanielSDewes/ChatOnline',
    demo: null,
    accent: '#00C2FF',
    icon: 'MessageCircle',
  },
  {
    type: 'Web App / Information Platform',
    name: 'News & Weather',
    description:
      'Interactive web application combining real-time weather forecasting and news updates through external API integrations, delivering useful information in a clean and responsive UI.',
    tech: ['JavaScript', 'REST APIs', 'HTML', 'CSS'],
    github: 'https://github.com/DanielSDewes/NoticiasEClima',
    demo: null,
    accent: '#7C3AED',
    icon: 'CloudRain',
  },
  {
    type: 'Business / Landing Page',
    name: 'MM Bier Website',
    description:
      'Responsive business website developed with a strong focus on branding, user experience, and digital presence, showcasing products and improving customer engagement.',
    tech: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
    github: 'https://github.com/DanielSDewes/mmbier',
    demo: null,
    accent: '#F59E0B',
    icon: 'Beer',
  },
  {
    type: 'Frontend / UI Project',
    name: 'Adapter Presentation',
    description:
      'Presentation-focused web interface built with modern frontend practices, emphasizing visual communication, smooth interactions, and clean component-based architecture.',
    tech: ['React', 'JavaScript', 'CSS'],
    github: 'https://github.com/DanielSDewes/Adapter-apresentacao',
    demo: null,
    accent: '#00FFC8',
    icon: 'Monitor',
  },
  {
    type: 'Institutional / Web Platform',
    name: 'Student Journey URI',
    description:
      'Web platform project designed to support student engagement and academic guidance, featuring accessible navigation, responsive design, and structured information architecture.',
    tech: ['React', 'JavaScript', 'CSS', 'UI/UX'],
    github: 'https://github.com/DanielSDewes/jornada-estudante-uri',
    demo: null,
    accent: '#7C3AED',
    icon: 'GraduationCap',
  },
];

export const githubStats = [
  { num: '30+', label: 'Repositories' },
  { num: '200+', label: 'Commits' },
  { num: '7+', label: 'Stars' },
  { num: '10+', label: 'Pull Requests' },
];

export const languages = [
  { name: 'Python', pct: 72, color: 'from-blue-500 to-cyan-400' },
  { name: 'JavaScript', pct: 15, color: 'from-yellow-400 to-amber-500' },
  { name: 'HTML/CSS', pct: 8, color: 'from-orange-500 to-purple-600' },
  { name: 'SQL', pct: 5, color: 'from-blue-700 to-teal-400' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Game', href: '#game' },
];
