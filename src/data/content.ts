export const site = {
  name: 'Muhammad Abdullah',
  firstName: 'Muhammad',
  lastName: 'Abdullah',
  title: 'Full Stack Developer',
  email: 'imabdullah.tdm@gmail.com',
  location: 'Hyderabad, Pakistan',
  accent: '#8C6CFF',
} as const

export const navLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About me', href: '#about-me' },
  { label: 'Contact', href: '#contact' },
] as const

export const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'trust', label: 'Trust' },
  { id: 'services', label: 'Services' },
  { id: 'tech', label: 'Tech' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'about-me', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export const hero = {
  line1: 'Code Beyond Scripts.',
  line2: 'Ship Beyond Limits.',
  sub: "Full-stack apps that don't just run — they scale, test, and deploy.",
  cta: 'Work With Me',
  ctaHref: '#contact',
}

export const trust = {
  label: 'WE GOT YOUR BACK!',
  headline: 'Custom-built. Speed-optimized. AI-ready.',
  subheadline: 'Let your site evolve with your vision.',
  metrics: {
    uptime: { label: 'UPTIME', value: '99.9%' },
    lighthouse: {
      label: 'GOOGLE LIGHTHOUSE',
      scores: [
        { label: 'PERFORMANCE', value: 95 },
        { label: 'ACCESSIBILITY', value: 97 },
        { label: 'SEO', value: 96 },
      ],
    },
    buildTime: { label: 'CI PIPELINE', value: '42s' },
    coverage: { label: 'TEST COVERAGE', value: '50%+' },
  },
}

export const services = {
  label: 'SERVICES',
  title: 'What I Build',
  intro:
    'From concept to clean code — I design and develop future-proof digital experiences.',
  items: [
    {
      icon: 'layers',
      title: 'Full Stack Development',
      description:
        'React + Node/AdonisJS apps from database schema to production deployment.',
    },
    {
      icon: 'server',
      title: 'API & Backend Engineering',
      description:
        'RESTful APIs with PostgreSQL/MongoDB, real-time updates, and clean architecture.',
    },
    {
      icon: 'shield-check',
      title: 'CI/CD & Quality',
      description:
        'GitHub Actions pipelines, Cypress E2E, Jest/Japa — tested code that ships confidently.',
    },
  ],
}

export const techStack = {
  label: 'TECH STACK',
  title: 'Tools I use',
  intro:
    'TypeScript-first full-stack toolkit — from UI polish to production pipelines and test coverage.',
  highlight: {
    repos: 34,
    primary: 'TypeScript',
    focus: 'Full Stack Development',
  },
  categories: [
    {
      id: 'frontend',
      title: 'Frontend',
      description: 'Interfaces that feel fast, responsive, and alive.',
      colSpan: 'md:col-span-2',
      skills: [
        { name: 'React', icon: 'react' as const },
        { name: 'Next.js', icon: 'nextjs' as const },
        { name: 'TypeScript', icon: 'typescript' as const },
        { name: 'Inertia.js' },
        { name: 'Tailwind CSS', icon: 'tailwind' as const },
        { name: 'Framer Motion', icon: 'framer' as const },
        { name: 'HTML / CSS' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend',
      description: 'APIs, auth, real-time, and clean architecture.',
      skills: [
        { name: 'Node.js', icon: 'nodejs' as const },
        { name: 'Express.js', icon: 'express' as const },
        { name: 'AdonisJS', icon: 'adonisjs' as const },
        { name: 'REST APIs' },
        { name: 'Pusher' },
        { name: 'Google Gemini' },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      description: 'Relational and document stores in production.',
      skills: [
        { name: 'PostgreSQL', icon: 'postgresql' as const },
        { name: 'MongoDB', icon: 'mongodb' as const },
        { name: 'MySQL', icon: 'mysql' as const },
        { name: 'SQLite', icon: 'sqlite' as const },
      ],
    },
    {
      id: 'devops',
      title: 'DevOps & Cloud',
      description: 'Ship, deploy, and keep systems running.',
      skills: [
        { name: 'Docker', icon: 'docker' as const },
        { name: 'GitHub Actions', icon: 'githubactions' as const },
        { name: 'Vercel', icon: 'vercel' as const },
        { name: 'Railway' },
        { name: 'Linux', icon: 'linux' as const },
      ],
    },
    {
      id: 'testing',
      title: 'Testing & QA',
      description: 'Confidence before every merge and deploy.',
      skills: [
        { name: 'Cypress', icon: 'cypress' as const },
        { name: 'Jest', icon: 'jest' as const },
        { name: 'Japa' },
        { name: 'Postman' },
        { name: 'Swagger' },
        { name: 'Sentry' },
      ],
    },
    {
      id: 'languages',
      title: 'Languages',
      description: 'Core languages across the stack.',
      skills: [
        { name: 'TypeScript', icon: 'typescript' as const },
        { name: 'JavaScript' },
        { name: 'Python', icon: 'python' as const },
        { name: 'Bash' },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Design',
      description: 'Version control, design, and collaboration.',
      colSpan: 'md:col-span-2 lg:col-span-3',
      skills: [
        { name: 'Git', icon: 'git' as const },
        { name: 'GitHub', icon: 'github' as const },
        { name: 'Figma', icon: 'figma' as const },
        { name: 'Vite' },
      ],
    },
  ],
}

export const projects = {
  label: 'PROJECTS',
  title: 'Selected Work',
  intro:
    'Craft meets conversion. Here are a few recent projects that pushed boundaries.',
  items: [
    {
      title: 'GradAccelerate',
      description:
        'Full-stack AI productivity platform — notes, projects, bookmarks, todos, and reminders with real-time Pusher updates. Production-deployed with 50% test coverage enforced in CI.',
      tools: ['AdonisJS', 'React', 'TypeScript', 'Inertia.js', 'Gemini', 'Railway'],
      liveUrl: '#',
      detailUrl: '#',
      initials: 'GA',
      gradient: 'from-violet-600/40 to-indigo-900/60',
    },
    {
      title: 'AdmissionTimes',
      description:
        'Admissions media and content platform helping students navigate applications with curated guides, timelines, and resources.',
      tools: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      liveUrl: '#',
      detailUrl: '#',
      initials: 'AT',
      gradient: 'from-purple-600/40 to-blue-900/60',
    },
    {
      title: 'Sustainbite',
      description:
        'Sustainability-focused food-tech product connecting conscious consumers with local eco-friendly meal options and impact tracking.',
      tools: ['React', 'PostgreSQL', 'Docker', 'Node.js'],
      liveUrl: '#',
      detailUrl: '#',
      initials: 'SB',
      gradient: 'from-emerald-600/40 to-teal-900/60',
    },
  ],
}

export const testimonials = {
  label: 'TESTIMONIAL',
  title: 'What People Say',
  items: [
    {
      quote:
        'Abdullah delivered a production-ready full-stack platform with real-time features and comprehensive test coverage. His CI/CD setup saved us weeks of manual QA.',
      name: 'Sarah Mitchell',
      role: 'Product Lead — TechVentures',
      initials: 'SM',
    },
    {
      quote:
        'He built reliable REST APIs that reduced our integration issues significantly. Proactive communication and clean, maintainable code throughout.',
      name: 'James Okonkwo',
      role: 'CTO — Remote Startup',
      initials: 'JO',
    },
    {
      quote:
        'Amazing to work with — detailed-oriented, always able to make excellent recommendations. Our next project is already in line.',
      name: 'David Chen',
      role: 'Founder — GrowthLab',
      initials: 'DC',
    },
  ],
}

export const about = {
  label: 'MY BIO',
  title: 'About Me',
  greeting: "Hey, I'm Muhammad.",
  bio: "I'm a Full Stack Developer obsessed with blending design, code, and intelligence. Whether you're building a brand or reinventing a platform, I help you craft digital experiences that work hard — and look alive.",
  summary:
    'Full Stack Developer with 2+ years of experience building production-grade web applications using JavaScript and TypeScript. Shipped a complete AI-powered productivity platform with real-time updates, Google OAuth, CI/CD pipelines, and E2E test coverage.',
}

export const contact = {
  title: "Let's Bring Your Vision to Life",
  sub: "Have a project, an idea, or just curious if we're a good fit? Let's build something smart, beautiful, and future-ready.",
  cta: "Let's connect",
  ctaHref: 'mailto:imabdullah.tdm@gmail.com',
  nudges: [
    'Yes Human! that button, press it NOW. thank you 😉',
    "Smash that 'Let's connect' button human! 😏",
    'What are you waiting for?',
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/abdullah-dev5', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-abdullah45', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:imabdullah.tdm@gmail.com', icon: 'email' },
  ],
  copyright: 'Muhammad Abdullah / © All rights reserved',
}

export const chatFaq = {
  greeting:
    "Hey human 👋 I'm your AI assistant. Ask me anything about Muhammad's work, projects, or skills!",
  disclaimer: "Muhammad's Portfolio AI assistant • Responses may vary",
  quickQuestions: [
    'Tell me about your projects',
    'What are your skills?',
    'How can I contact you?',
  ],
  responses: {
    projects:
      'Muhammad built GradAccelerate — a full-stack AI productivity platform with real-time Pusher updates, Google OAuth, and 50% test coverage in CI. He also works on AdmissionTimes and Sustainbite.',
    skills:
      'Muhammad specializes in React, TypeScript, Node.js, AdonisJS, Next.js, PostgreSQL, MongoDB, Docker, GitHub Actions, Cypress, Jest, and Vercel.',
    contact:
      'You can reach Muhammad at imabdullah.tdm@gmail.com or connect via LinkedIn. Use the contact section below!',
    default:
      "Great question! Muhammad is a Full Stack Developer based in Hyderabad, Pakistan. Try asking about his projects, skills, or how to contact him.",
  },
}
