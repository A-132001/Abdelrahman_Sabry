import type {
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
} from "./types";

export const personalInfo: PersonalInfo = {
  name: "Abdelrhman Tawfek",
  title: "Full-Stack Developer",
  tagline:
    "I craft modern web experiences with clean code and thoughtful design.",
  bio: "I'm a passionate full-stack developer with a love for building elegant, performant web applications. I specialize in React, Next.js, and Node.js, turning complex problems into simple, beautiful solutions. When I'm not coding, I'm exploring new technologies and contributing to open-source projects.",
  avatarUrl: "/avatar.jpg",
  resumeUrl: "/resume.pdf",
  email: "hello@example.com",
  location: "Cairo, Egypt",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com",
      icon: "twitter",
    },
  ],
};

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Tech Company",
    role: "Full-Stack Developer",
    startDate: "2023-01",
    endDate: null,
    description:
      "Leading development of scalable web applications using Next.js and Node.js. Collaborating with cross-functional teams to deliver high-quality software solutions.",
    highlights: [
      "Architected and built a microservices platform serving 100K+ users",
      "Reduced page load time by 40% through performance optimization",
      "Mentored junior developers and conducted code reviews",
    ],
  },
  {
    id: "2",
    company: "Digital Agency",
    role: "Frontend Developer",
    startDate: "2021-06",
    endDate: "2022-12",
    description:
      "Developed responsive web applications and interactive UI components for diverse clients across multiple industries.",
    highlights: [
      "Built 15+ client websites with React and TypeScript",
      "Implemented design systems improving development speed by 30%",
      "Collaborated closely with designers to deliver pixel-perfect UIs",
    ],
  },
  {
    id: "3",
    company: "Startup Inc",
    role: "Junior Developer",
    startDate: "2020-01",
    endDate: "2021-05",
    description:
      "Contributed to the development of a SaaS platform, working on both frontend and backend features.",
    highlights: [
      "Developed RESTful APIs with Node.js and Express",
      "Built reusable React component library",
      "Participated in agile sprints and daily standups",
    ],
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    startYear: 2016,
    endYear: 2020,
  },
];

export const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "HTML/CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Prisma", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Git", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Figma", category: "Tools" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description:
      "A full-stack e-commerce platform with real-time inventory, payments, and an admin dashboard.",
    longDescription:
      "Built a comprehensive e-commerce solution from the ground up. The platform features a modern storefront with server-side rendering for SEO, real-time inventory tracking, Stripe payment integration, and a full admin dashboard for managing products, orders, and customers. The architecture uses Next.js for the frontend, Node.js microservices for the backend, and PostgreSQL for data persistence.",
    imageUrl: "/projects/ecommerce.jpg",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Task Management App",
    slug: "task-management-app",
    description:
      "A collaborative task management tool with real-time updates, drag-and-drop boards, and team workspaces.",
    longDescription:
      "Designed and developed a Trello-inspired task management application. Features include drag-and-drop Kanban boards, real-time collaboration via WebSockets, team workspaces with role-based access, file attachments, activity logs, and email notifications. The app supports both light and dark themes and is fully responsive.",
    imageUrl: "/projects/taskmanager.jpg",
    tags: ["React", "TypeScript", "Socket.io", "MongoDB", "Express"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "AI Chat Interface",
    slug: "ai-chat-interface",
    description:
      "A sleek conversational AI interface with streaming responses, markdown rendering, and chat history.",
    longDescription:
      "Created a modern chat interface for interacting with large language models. The app features streaming response rendering, full markdown and code syntax highlighting, persistent chat history with search, conversation branching, and customizable system prompts. Built with a focus on performance and accessibility.",
    imageUrl: "/projects/aichat.jpg",
    tags: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Prisma"],
    liveUrl: "https://example.com",
    featured: true,
    createdAt: "2023-11-20",
  },
  {
    id: "4",
    title: "Portfolio Website",
    slug: "portfolio-website",
    description:
      "A personal portfolio website with a CMS dashboard, built with Next.js and a modern design system.",
    longDescription:
      "This very portfolio you're looking at! A fully custom-built portfolio website featuring a public-facing homepage with sections for experience, skills, and projects, plus a private admin dashboard for content management. The design uses a custom token-based theme system with automatic dark mode support.",
    imageUrl: "/projects/portfolio.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com",
    featured: false,
    createdAt: "2024-06-01",
  },
  {
    id: "5",
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    description:
      "A weather dashboard with location search, 7-day forecasts, interactive maps, and severe weather alerts.",
    longDescription:
      "Built a feature-rich weather application that provides current conditions, hourly and 7-day forecasts, interactive radar maps, and severe weather alerts. Users can save favorite locations, view historical weather data, and receive push notifications for weather warnings. The app fetches data from multiple weather APIs and aggregates results for accuracy.",
    imageUrl: "/projects/weather.jpg",
    tags: ["React", "TypeScript", "Weather API", "Chart.js", "Leaflet"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    createdAt: "2023-08-05",
  },
  {
    id: "6",
    title: "Blog Platform",
    slug: "blog-platform",
    description:
      "A minimal blog platform with a rich text editor, tag system, and server-side rendering for SEO.",
    longDescription:
      "Developed a clean, fast blogging platform with a focus on writing experience. Features include a rich text editor with markdown support, image uploads, a tagging and category system, RSS feeds, SEO-optimized server-rendered pages, and reading time estimates. The admin panel allows managing posts, drafts, and scheduled publishing.",
    imageUrl: "/projects/blog.jpg",
    tags: ["Next.js", "MDX", "PostgreSQL", "Prisma", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    createdAt: "2023-05-12",
  },
];
