import type {
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Course,
} from "./types";

export const personalInfo: PersonalInfo = {
  name: "AbdEl-Rahman Sabry",
  title: "Software Engineer",
  tagline:
    "Building scalable and secure web applications with clean architecture and efficient back-end integration.",
  bio: "Software Engineer skilled in Django, DRF, React, Next.js, and PostgreSQL. I specialize in building scalable and secure web applications with a strong focus on RESTful APIs, clean architecture, and efficient back-end integration. Passionate about back-end development, API design, and improving front-end functionality and user experience.",
  avatarUrl: "/AbdoSabryImage.png",
  resumeUrl: "/AbdelRahman-Sabry-Saber.pdf",
  email: "abdelrahmansabry53@gmail.com",
  location: "Cairo, El Maadi",
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
      platform: "Kaggle",
      url: "https://kaggle.com",
      icon: "kaggle",
    },
  ],
};

export const experiences: Experience[] = [
  {
    id: "1",
    company: "WE DATA — Telecom Egypt",
    role: "Software Engineer",
    startDate: "2025-09",
    endDate: null,
    description:
      "Working as a Web Developer on internal tools for the company, mainly using React and Django. Collaborating with the Network and Administration teams to publish and maintain applications.",
    highlights: [
      "Building internal tools with React and Django",
      "Collaborating with Network and Administration teams",
      "Developing and maintaining web applications for company operations",
    ],
  },
  {
    id: "2",
    company: "AMIT",
    role: "Full Stack Python Instructor",
    startDate: "2025-05",
    endDate: "2025-09",
    description:
      "Delivered hands-on training in full-stack Python development, covering Django, REST APIs, front-end basics, and deployment best practices.",
    highlights: [
      "Trained students in Django, DRF, and REST API development",
      "Covered front-end basics and deployment workflows",
      "Provided mentorship and code reviews",
    ],
  },
  {
    id: "3",
    company: "Samsung Innovation Campus",
    role: "Team Leader & Instructor",
    startDate: "2022-08",
    endDate: "2023-03",
    description:
      "Managed a team of Instructors and Facilitators consisting of 20 people. Supported with instructing skills for Python, C, and Problem Solving topics.",
    highlights: [
      "Led a team of 20 instructors and facilitators",
      "Taught Python, C, and Problem Solving",
      "Coordinated curriculum delivery and team operations",
    ],
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "Sohag University",
    degree: "Bachelor's Degree",
    field: "Computers and Artificial Intelligence",
    startYear: 2019,
    endYear: 2023,
    description:
      "BSc in Computer Science — GPA: 3.3 | Project Grade: A. Focus on software engineering, web development, and AI.",
  },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "ITI Track — Full Stack Using Python",
    provider: "ITI (Information Technology Institute)",
    completedDate: "2025-06",
    description:
      "Back-End: Python, Django, DRF, Flask, PostgreSQL, Linux, Bash, Git, GitHub, Docker. Front-End: React, Next.js, JavaScript, HTML5, CSS.",
  },
  {
    id: "2",
    title: "Artificial Intelligence Courses",
    provider: "Samsung Innovation Campus",
    completedDate: "2022-03",
    description:
      "Math, Python, Data Visualization, Data Analysis, Machine Learning, Deep Learning. Graduation Project: COVID-19 detection using deep learning.",
  },
  {
    id: "3",
    title: "Coding & Programming",
    provider: "Samsung Innovation Campus",
    completedDate: "2020-03",
    description:
      "Coding, Problem Solving, Python, C, Data Structures & Algorithms. Graduation Project: Smart Home with IoT.",
  },
];

export const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "Radix UI", category: "Frontend" },
  { name: "Shadcn", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "Django REST Framework", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "RESTful APIs", category: "Backend" },
  { name: "AI Integration", category: "Backend" },
  { name: "SQL", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  { name: "Bash", category: "DevOps" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Postman", category: "Tools" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "ERP Payroll Management System",
    slug: "erp-payroll-management-system",
    description:
      "A payroll management system for a sweets factory enabling employees to track salaries and generate reports.",
    longDescription:
      "Built an ERP Payroll Management System for a sweets factory enabling employees to track monthly salaries and generate reports. Developed HR tools for managing salaries, editing records, sending notifications, and creating reports. Implemented an admin dashboard with full control over users, salaries, loans, and system settings. Provided RESTful APIs for a Flutter mobile application used by employees.",
    imageUrl: "/projects/erp-payroll.jpg",
    tags: ["Django", "DRF", "PostgreSQL", "Bootstrap", "Git"],
    githubUrl: "https://github.com/AbdElRahmanSabry",
    featured: true,
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    title: "Multi-Vendor E-Commerce Platform",
    slug: "multi-vendor-ecommerce",
    description:
      "A full-featured multi-vendor e-commerce platform supporting vendor management, product listings, orders, and payments.",
    longDescription:
      "Developed a full-featured multi-vendor e-commerce platform supporting vendor management, product listings, orders, payments, and user operations. Implemented vendor dashboards to manage products, inventory, pricing, media, and order status. Built user features including authentication, cart management, checkout, and secure payments. Developed core modules for products, categories, media handling, and system configurations using a scalable architecture. Designed an admin panel to manage vendors, users, products, orders, and platform settings.",
    imageUrl: "/projects/ecommerce.jpg",
    tags: ["Django", "DRF", "PostgreSQL", "Bootstrap", "Git"],
    githubUrl: "https://github.com/AbdElRahmanSabry",
    featured: true,
    createdAt: "2025-03-01",
  },
  {
    id: "3",
    title: "Donation Platform",
    slug: "donation-platform",
    description:
      "A platform connecting donors with verified causes, allowing users to browse campaigns, donate securely, and track impact.",
    longDescription:
      "Built a donation platform to connect donors with verified causes, allowing users to browse campaigns, donate securely, and track impact. Utilized Django MVT architecture to manage user roles (donor/admin), campaign listings, and transaction history efficiently. Designed a modern, responsive frontend using Tailwind CSS for a clean and user-friendly experience. Included admin dashboard for campaign approvals, donation monitoring, and user management.",
    imageUrl: "/projects/donation.jpg",
    tags: ["Django", "Tailwind CSS", "PostgreSQL", "JavaScript", "Git"],
    githubUrl: "https://github.com/AbdElRahmanSabry",
    featured: true,
    createdAt: "2025-02-01",
  },
  {
    id: "4",
    title: "E-Commerce Website (Frontend)",
    slug: "ecommerce-frontend",
    description:
      "A fully responsive static e-commerce site with dynamic product filtering, animated sliders, and smooth scrolling.",
    longDescription:
      "Designed and developed a fully responsive static e-commerce site showcasing products, categories, and promotional banners. Implemented interactive features such as dynamic product filtering, animated sliders, and smooth scrolling using vanilla JavaScript and ES6. Structured with semantic HTML5 and styled using modern CSS3 techniques for a clean and accessible layout.",
    imageUrl: "/projects/ecommerce-frontend.jpg",
    tags: ["JavaScript", "HTML5", "CSS3", "ES6"],
    githubUrl: "https://github.com/AbdElRahmanSabry",
    featured: false,
    createdAt: "2025-01-15",
  },
  {
    id: "5",
    title: "College ERP System & Face Recognition",
    slug: "college-erp-face-recognition",
    description:
      "A comprehensive College ERP system with face recognition-based attendance using OpenCV.",
    longDescription:
      "Developed a comprehensive College ERP system integrating student, staff, and course management to streamline academic operations. Implemented face recognition-based attendance using OpenCV, enhancing security and reducing manual input. Features include user authentication, student profiles, timetable management, attendance tracking, and administrative dashboards. Employed modular design and clean architecture principles for maintainability and scalability.",
    imageUrl: "/projects/college-erp.jpg",
    tags: ["Django", "PostgreSQL", "OpenCV", "Python", "Bootstrap"],
    githubUrl: "https://github.com/AbdElRahmanSabry",
    featured: true,
    createdAt: "2023-06-01",
  },
  {
    id: "6",
    title: "Coffee Shop Website",
    slug: "coffee-shop-website",
    description:
      "A full-stack e-commerce website for a coffee shop with product browsing, authentication, and order checkout.",
    longDescription:
      "Developed a full-stack e-commerce website for a coffee shop with features like product browsing, user authentication, and order checkout. Backend built using Django (MVT) and Django REST Framework (DRF), enabling both web-based and API-based interactions. Implemented features such as sign-up/sign-in, user profiles, product search, pagination, and cart/order management. Admin panel supports product, category, and order management with responsive UI using Bootstrap.",
    imageUrl: "/projects/coffee-shop.jpg",
    tags: ["Django", "DRF", "PostgreSQL", "Bootstrap", "JavaScript"],
    githubUrl: "https://github.com/AbdElRahmanSabry",
    featured: false,
    createdAt: "2024-01-01",
  },
];
