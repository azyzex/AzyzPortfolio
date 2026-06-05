import {
  Award,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Code2,
  Database,
  FileText,
  Github,
  Globe2,
  GraduationCap,
  HeartPulse,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareQuote,
  Mic2,
  MonitorSmartphone,
  Phone,
  RadioTower,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type LinkItem = {
  label: string;
  href?: string;
  status?: "available" | "coming-soon" | "needs-file";
};

export type Project = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  details: string;
  role: string;
  tech: string[];
  links: LinkItem[];
  featured?: boolean;
  image?: string;
  icon: LucideIcon;
  assetHint: string;
};

export type TimelineItem = {
  title: string;
  organization: string;
  date: string;
  location?: string;
  summary: string;
  points: string[];
  icon: LucideIcon;
};

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  file?: string;
  credentialUrl?: string;
  status: "needs-file" | "verified";
};

export type Recommendation = {
  name: string;
  role: string;
  quote?: string;
  source: string;
  date?: string;
  image?: string;
  profileUrl?: string;
};

export const profile = {
  name: "Mohamed Aziz Guenni",
  shortName: "Aziz",
  title: "Full-Stack Web & Mobile Developer",
  location: "Grombalia, Nabeul, Tunisia",
  email: "azizguenni0@gmail.com",
  phone: "+216 93 901 309",
  intro:
    "I build practical web, mobile, and AI-powered applications with clean interfaces, secure backends, and real-time systems.",
  bio:
    "I am a Computer Engineering graduate and current master's student focused on full-stack web development, mobile applications, and AI-powered software. My work spans queue management platforms, mobile survey apps, AI chat tools, secure file-transfer systems, accessibility software, and connected IoT projects.",
  personalNote:
    "I like turning ideas into working products, and I am comfortable moving between frontend, backend, mobile, AI workflows, and hardware-connected systems when the project needs it.",
  availability:
    "Open to jobs, internships, freelance projects, remote work, collaborations, academic opportunities, and professional networking.",
  photo: "assets/profile/1770583574950.jfif",
};

export const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export const focusAreas = [
  "Web apps",
  "Mobile apps",
  "AI tools",
  "Backend APIs",
  "IoT background",
];

export const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "Responsive web apps, dashboards, APIs, authentication, and database-backed platforms.",
    icon: Code2,
  },
  {
    title: "Mobile App Development",
    description:
      "Android, Flutter, and React Native apps with clean interfaces and secure data flows.",
    icon: Smartphone,
  },
  {
    title: "AI-Powered Applications",
    description:
      "AI chat tools, document assistants, quiz generation, prompt workflows, and TTS utilities.",
    icon: Bot,
  },
  {
    title: "Backend/API Development",
    description:
      "REST APIs, Flask and Express backends, authentication, databases, and real-time sockets.",
    icon: Database,
  },
  {
    title: "UI/UX & Responsive Design",
    description:
      "Clean, practical interfaces that work across desktop and mobile screens.",
    icon: MonitorSmartphone,
  },
  {
    title: "IoT / Embedded Prototyping",
    description:
      "RFID systems, ESP32/ESP8266 projects, LoRa sensors, and hardware-connected dashboards.",
    icon: RadioTower,
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Bootstrap",
      "React Router",
      "React Query",
      "Redux",
      "Material UI",
    ],
  },
  {
    title: "Mobile",
    skills: [
      "Flutter",
      "Dart",
      "React Native",
      "Expo",
      "Android Studio",
      "Java",
      "XML",
      "Cross-platform apps",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Flask",
      "REST APIs",
      "WebSockets",
      "Socket.IO",
      "Firebase Auth",
      "MongoDB Atlas",
      "MySQL",
      "OAuth",
      "JWT",
    ],
  },
  {
    title: "AI",
    skills: [
      "Gemini API",
      "LLM integration",
      "Prompt engineering",
      "Hugging Face testing",
      "gTTS",
      "RAG-style document handling",
      "OpenCV",
      "NumPy",
    ],
  },
  {
    title: "IoT",
    skills: [
      "ESP32",
      "ESP8266",
      "Arduino",
      "Raspberry Pi 4",
      "RFID RC522",
      "DHT11",
      "LoRa",
      "Zigbee",
      "STM32",
      "FPGA Artix7",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Jira",
      "Slack",
      "Postman",
      "Packet Tracer",
      "LabVIEW",
      "Linux Bash",
      "FileZilla Pro",
      "Inno Setup",
    ],
  },
  {
    title: "Languages",
    skills: [
      "Arabic: Fluent",
      "English: C2 Proficient",
      "French: Intermediate",
      "C",
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "Dart",
      "Bash",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "promptprotect",
    title: "PromptProtect",
    date: "2026",
    category: "AI security / browser extension",
    summary:
      "A Chrome extension that helps prevent accidental secret and PII leaks in web-based LLM chat tools.",
    details:
      "PromptProtect watches supported chat composers locally, detects likely secrets before send, and adds a review step with redaction modes, attachment scanning, and local-only analytics.",
    role:
      "Built as a recent TypeScript project focused on safer AI workflows and practical developer security.",
    tech: ["TypeScript", "Chrome Extension", "Local Detection", "AI Safety"],
    links: [
      { label: "GitHub", href: "https://github.com/azyzex/PromptProtect" },
      { label: "Live", status: "coming-soon" },
    ],
    featured: true,
    icon: ShieldCheck,
    assetHint: "public/assets/projects/promptprotect/",
  },
  {
    slug: "qnow",
    title: "Qnow Queue Management System",
    date: "Feb 2025 - Jun 2025",
    category: "Full-stack / mobile / real-time",
    summary:
      "A real-time queue management platform with mobile apps, an admin dashboard, backend APIs, and hardware console integration.",
    details:
      "Qnow helps users and agencies manage waiting lines through remote booking, queue tracking, service management, authentication, maps, multilingual support, themes, and real-time synchronization.",
    role:
      "Worked across web, mobile, backend, real-time communication, authentication, and integration logic during the Digika.Tn internship and graduation project.",
    tech: [
      "React Native",
      "Expo",
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Firebase Auth",
      "Socket.IO",
      "ESP32",
    ],
    links: [
      { label: "Case Study", status: "coming-soon" },
      { label: "GitHub", status: "coming-soon" },
    ],
    featured: true,
    icon: MonitorSmartphone,
    assetHint: "public/assets/projects/qnow/",
  },
  {
    slug: "tuniai",
    title: "TuniAI",
    date: "2025",
    category: "AI / full-stack web app",
    summary:
      "A Darija-first AI chat and document assistant designed to make AI feel more local and accessible for Tunisian users.",
    details:
      "TuniAI supports AI chat, file and image uploads, contextual answers, quiz generation, exports, markdown and math rendering, and responsive desktop/mobile UI.",
    role:
      "Built as a full-stack AI application, handling frontend, AI workflows, uploads, chat behavior, exports, responsive UI, and backend/server logic.",
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Gemini API",
      "Puppeteer",
      "Markdown",
      "Math Rendering",
    ],
    links: [
      { label: "Live", status: "coming-soon" },
      { label: "GitHub", status: "coming-soon" },
    ],
    featured: true,
    icon: Bot,
    assetHint: "public/assets/projects/tuniai/",
  },
  {
    slug: "megatel",
    title: "Mobile Application for MegaTel",
    date: "Sep 2023 - May 2024",
    category: "Mobile / survey app",
    summary:
      "A cross-platform mobile app for call center customer satisfaction surveys, campaign management, multilingual support, and secure login.",
    details:
      "The app gave MegaTel customer service workflows a structured mobile interface for authentication, questionnaire management, campaign workflows, and survey data handling.",
    role:
      "Contributed as a mobile developer and team member, working on app development, UI implementation, authentication flow, and agile collaboration.",
    tech: ["Flutter", "Dart", "Firebase", "OAuth", "JWT", "Jira", "GitHub"],
    links: [
      { label: "Case Study", status: "coming-soon" },
      { label: "Live", status: "coming-soon" },
    ],
    featured: true,
    icon: Smartphone,
    assetHint: "public/assets/projects/megatel/",
  },
  {
    slug: "ttvc",
    title: "TTVC - Text To Voice Chat",
    date: "Oct 2024 - Dec 2024",
    category: "Accessibility / desktop app",
    summary:
      "A Windows text-to-speech tool that converts typed messages into natural voice output for communication apps.",
    details:
      "TTVC supports Google text-to-speech, virtual microphone routing, a simple GUI, and packaged installation so users with speech difficulties can communicate in voice environments.",
    role:
      "Developed the app, GUI, text-to-speech integration, audio routing workflow, dependency bundling, and Windows packaging.",
    tech: ["Python", "Tkinter", "gTTS", "Virtual Audio Cable", "Inno Setup"],
    links: [
      { label: "GitHub", href: "https://github.com/azyzex/TTVC" },
      { label: "Demo", status: "coming-soon" },
    ],
    featured: true,
    icon: Mic2,
    assetHint: "public/assets/projects/ttvc/",
  },
  {
    slug: "secure-file-transfer",
    title: "Secure Web Interface for File Transfer",
    date: "Aug 2024",
    category: "Security / web app",
    summary:
      "A Flask-based web interface for uploading and transferring files through SFTP with SSH authentication.",
    details:
      "Built during the Sagemcom internship to improve secure file transfer workflows with validation, local server management, and frontend-backend integration.",
    role:
      "Developed the interface, validation, local server setup, Flask backend, Bootstrap frontend, and secure SFTP transfer logic.",
    tech: ["Python", "Flask", "Bootstrap", "SFTP", "SSH", "HTML", "CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/azyzex/SFTP-Website" },
      { label: "Live", status: "coming-soon" },
    ],
    featured: true,
    icon: FileText,
    assetHint: "public/assets/projects/secure-file-transfer/",
  },
  {
    slug: "rfid-smart-lock",
    title: "RFID Smart Lock System",
    date: "2024 - Present",
    category: "IoT / access control",
    summary:
      "An RFID access-control system with web-based admin management, access logs, and hardware integration.",
    details:
      "The system combines RFID card reading, microcontrollers, access feedback, logs, user management, and remote administration through a web dashboard.",
    role:
      "Designed and developed the hardware/software integration, RFID authentication logic, dashboard behavior, logs, and admin features.",
    tech: [
      "ESP32",
      "ESP8266",
      "RFID RC522",
      "React",
      "Tailwind CSS",
      "Django",
      "JavaScript",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/azyzex/RFID_Smart_Lock" },
      { label: "Demo", status: "coming-soon" },
    ],
    icon: RadioTower,
    assetHint: "public/assets/projects/rfid-smart-lock/",
  },
  {
    slug: "ai-gatekeeper",
    title: "AI Gatekeeper",
    date: "Nov 2024 - Dec 2024",
    category: "AI / computer vision",
    summary:
      "An AI-assisted access-control and monitoring system using real-time face detection or recognition.",
    details:
      "AI Gatekeeper uses a Raspberry Pi and camera setup to detect or recognize faces, provide feedback, and track access events for edge AI scenarios.",
    role:
      "Developed the computer vision workflow, detection/recognition logic, feedback behavior, and access tracking.",
    tech: ["Python", "OpenCV", "NumPy", "Raspberry Pi 4", "Camera"],
    links: [
      { label: "GitHub", status: "coming-soon" },
      { label: "Demo", status: "coming-soon" },
    ],
    icon: Bot,
    assetHint: "public/assets/projects/ai-gatekeeper/",
  },
  {
    slug: "peakphysique",
    title: "PeakPhysique",
    date: "2025 - Present",
    category: "Android / health calculator",
    summary:
      "An Android health calculator app for BMI, BMR, ideal weight, and related health metrics.",
    details:
      "PeakPhysique includes input handling, validation, calculation logic, and a clean Android interface built with native Android tools.",
    role:
      "Developed the mobile app, UI screens, input handling, health calculations, and Android layout implementation.",
    tech: ["Java", "Android Studio", "XML", "Android UI"],
    links: [
      { label: "GitHub", href: "https://github.com/azyzex/Peak_physique" },
      { label: "Demo", status: "coming-soon" },
    ],
    icon: HeartPulse,
    assetHint: "public/assets/projects/peakphysique/",
  },
  {
    slug: "lora-monitoring",
    title: "IoT Temperature & Humidity Monitoring with LoRa",
    date: "Nov 2024 - Dec 2024",
    category: "IoT / environmental monitoring",
    summary:
      "A low-power IoT system for long-range temperature and humidity monitoring through LoRa communication.",
    details:
      "The project measures temperature and humidity with sensors, sends readings over long range, and targets smart agriculture, environmental monitoring, and remote industrial use cases.",
    role:
      "Built the sensor integration, measurement logic, LoRa communication workflow, and embedded monitoring behavior.",
    tech: ["Arduino", "DHT11", "LoRa", "Embedded C/C++", "Sensors"],
    links: [
      { label: "GitHub", status: "coming-soon" },
      { label: "Demo", status: "coming-soon" },
    ],
    icon: RadioTower,
    assetHint: "public/assets/projects/lora-monitoring/",
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio Website",
    date: "Dec 2024 - Present",
    category: "Frontend / personal website",
    summary:
      "A responsive personal portfolio website showcasing skills, projects, contact information, and social links.",
    details:
      "The previous portfolio includes animated sections, service and project showcases, social links, contact details, and a responsive layout.",
    role:
      "Designed and built the website, including layout, styling, animations, responsiveness, and contact/social integrations.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Typed.js",
      "Animate.css",
      "WOW.js",
    ],
    links: [
      { label: "Website", href: "https://azyzex.github.io/AzyzPortfolio/" },
      { label: "GitHub", href: "https://github.com/azyzex/AzyzPortfolio" },
    ],
    icon: Globe2,
    assetHint: "public/assets/projects/personal-portfolio/",
  },
];

export const experience: TimelineItem[] = [
  {
    title: "Internship Trainee",
    organization: "Digika.Tn",
    date: "Jan 2025 - Jun 2025",
    location: "Hybrid",
    summary:
      "Worked on Qnow, a real-time queue management system involving web, mobile, backend, database, authentication, real-time communication, and hardware integration.",
    points: [
      "Built and contributed across mobile apps, web dashboard, backend services, database, and hardware console.",
      "Worked with authentication, REST APIs, Socket.IO, MongoDB Atlas, Firebase Auth, and Google Maps API.",
      "Collaborated with Agile/Scrum tooling including Jira, GitHub, and Slack.",
    ],
    icon: BriefcaseBusiness,
  },
  {
    title: "Digital Media Coordinator",
    organization: "Elite Council Entourage",
    date: "Sep 2023 - Dec 2024",
    location: "Mahdia, Tunisia",
    summary:
      "Coordinated digital media and online presence for a student/community organization.",
    points: [
      "Supported visual and digital communication.",
      "Helped promote online courses and organization activities.",
      "Built teamwork, communication, content, and digital organization experience.",
    ],
    icon: MessageSquareQuote,
  },
  {
    title: "Internship Trainee",
    organization: "Sagemcom",
    date: "Aug 2024",
    location: "Ben Arous, Tunisia",
    summary:
      "Developed a secure web interface for file transfers using Flask, Bootstrap, SFTP, and SSH authentication.",
    points: [
      "Implemented file upload, validation, and secure SFTP transfer workflows.",
      "Managed local server configuration and frontend-backend integration.",
      "Improved security compared with standard FTP transfer flows.",
    ],
    icon: BriefcaseBusiness,
  },
];

export const education: TimelineItem[] = [
  {
    title: "Professional Master's in Networks Engineering",
    organization: "Higher Institute of Computer Science of Mahdia",
    date: "Sep 2025 - Present",
    summary:
      "Ongoing master's degree with networks/security-related engineering focus.",
    points: [
      "Related specialization: network expertise, computer and information systems security, and information assurance.",
    ],
    icon: GraduationCap,
  },
  {
    title: "Bachelor's Degree in Computer Engineering",
    organization: "Higher Institute of Computer Science of Mahdia",
    date: "Sep 2022 - Jun 2025",
    summary:
      "Specialized in Embedded Systems and Internet of Things, graduating with high honors.",
    points: [
      "Activities included Digital Media Coordinator of ISIMa's Elite Council Entourage Club.",
      "Built practical projects across mobile, web, AI, IoT, and embedded systems.",
    ],
    icon: GraduationCap,
  },
  {
    title: "Baccalaureate in Computer Science",
    organization: "Grombalia High School",
    date: "Sep 2021 - Jun 2022",
    summary:
      "Completed baccalaureate studies in computer science before entering computer engineering.",
    points: ["Publicly included as requested."],
    icon: BookOpen,
  },
];

export const certificates: Certificate[] = [
  {
    title: "EF SET English Certificate",
    issuer: "EF SET",
    date: "Jun 2024 - 73/100, C2 Proficient",
    file: "assets/certificates/EF SET Certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Python Programming Online Diploma",
    issuer: "Alison",
    date: "Certificate",
    file: "assets/certificates/Alison Python Programming Online Diploma Certificate.jpg",
    status: "verified",
  },
  {
    title: "Overview of AI",
    issuer: "Huawei ICT Academy",
    date: "Certificate of Completion",
    file: "assets/certificates/huawei ict certificate of completion overview of ai.png",
    status: "verified",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco",
    date: "Certificate",
    file: "assets/certificates/cisco introduction to modern ai.png",
    status: "verified",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "Certificate",
    file: "assets/certificates/I2C CISCO introduction to cybersecurity Certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Generative AI",
    issuer: "Databricks",
    date: "Certificate",
    file: "assets/certificates/databticks generative ai certificate.png",
    status: "verified",
  },
  {
    title: "Digital Skills: Artificial Intelligence",
    issuer: "FutureLearn",
    date: "Certificate",
    file: "assets/certificates/FutureLearn  DIGITAL SKILLS ARTIFICIAL INTELLIGENCE certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    date: "Certificate",
    file: "assets/certificates/Google Cloud Introduction to Generative AI.png",
    status: "verified",
  },
  {
    title: "Introduction to Machine Learning for Earth Observation",
    issuer: "EO College",
    date: "Certificate",
    file: "assets/certificates/eo college introduction to machine learning for earth observation certificate.png",
    status: "verified",
  },
  {
    title: "Information Security",
    issuer: "OpenLearn",
    date: "Statement of Participation",
    file: "assets/certificates/OpenLearn Information security Statement of Participation Certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Accelerating Deep Learning with GPUs",
    issuer: "IBM",
    date: "Certificate",
    file: "assets/certificates/IBM Accelerating Deep Learning with GPUs Certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "LinkedIn Learning",
    date: "Professional Certificate",
    file: "assets/certificates/linked in learning career essentials in github professional certificate.png",
    status: "verified",
  },
  {
    title: "Figma",
    issuer: "LottieFiles",
    date: "Certificate",
    file: "assets/certificates/lottiefiles figma certificate.png",
    status: "verified",
  },
  {
    title: "Backend Engineering with Node.js",
    issuer: "Manara",
    date: "Certificate",
    file: "assets/certificates/manara backend engineering with nodejs.png",
    status: "verified",
  },
  {
    title: "Flutter Test Participation",
    issuer: "Pentalog",
    date: "Certificate",
    file: "assets/certificates/Pentalog Fluttre Test Participation Certificate.png",
    status: "verified",
  },
  {
    title: "Python Test Participation",
    issuer: "Pertilog",
    date: "Certificate",
    file: "assets/certificates/Pertilog Python test participation certificate.jpg",
    status: "verified",
  },
  {
    title: "Big Data Hadoop Course",
    issuer: "Udemy",
    date: "Certificate",
    file: "assets/certificates/Udemy big data hadoop course.jpg",
    status: "verified",
  },
  {
    title: "Internet of Things Online Course",
    issuer: "Udemy",
    date: "Certificate",
    file: "assets/certificates/Udemy Internet of Things Online Course Certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Python Developer Essentials Immersive Bootcamp for 2024",
    issuer: "Udemy",
    date: "Certificate",
    file: "assets/certificates/Udemy Python developer essentials immersive bootamp for 2024 certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Python Face Recognition",
    issuer: "Udemy",
    date: "Certificate",
    file: "assets/certificates/Udemy python Face Recognition Certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Python Performance Optimisation",
    issuer: "Udemy",
    date: "Certificate",
    file: "assets/certificates/Udemy Python Performance Optimisation Certificate-1.jpg",
    status: "verified",
  },
  {
    title: "Python Programming Masterclass",
    issuer: "Udemy",
    date: "Certificate",
    file: "assets/certificates/Udemy python programming masterclass certificate.jpg",
    status: "verified",
  },
  {
    title: "Unsupervised Learning: Clustering",
    issuer: "upGrad",
    date: "Certificate",
    file: "assets/certificates/upgrad unsupervised learning clustering.png",
    status: "verified",
  },
  {
    title: "Certificate of Appreciation",
    issuer: "Elite",
    date: "Certificate",
    file: "assets/certificates/Guenni Mohammed Aziz Elite certificate of appreciation-1.jpg",
    status: "verified",
  },
  {
    title: "Edraak Certificate",
    issuer: "Edraak",
    date: "Certificate",
    file: "assets/certificates/Edraak.png",
    status: "verified",
  },
];

export const linkedInRecommendationsUrl =
  "https://www.linkedin.com/in/mohamed-aziz-guenni/details/recommendations/?detailScreenTabIndex=0";

export const recommendations: Recommendation[] = [
  {
    name: "Anis Dakhloui",
    role: "Full Stack Engineer | AI Enthusiast | IT Consultant | Multilingual (EN/FR/AR)",
    quote:
      "I had the pleasure of working with Aziz at Nes Academy. He is a driven and dedicated professional who consistently brings positive energy and strong creativity to the team. His ability to generate innovative ideas makes him a valuable asset in any environment. I highly recommend him for any opportunity.",
    source: "LinkedIn",
    date: "Apr 21, 2026",
    image: "assets/recommendations/anis-dakhloui/1768391787955.png",
    profileUrl: linkedInRecommendationsUrl,
  },
  {
    name: "Mohamed Aziz Hadj Hassen",
    role: "Computer science student",
    quote:
      "I had the chance to study and work closely with Aziz during our time in college. We often collaborated on projects and spent hours brainstorming ideas together, and I was always impressed by their drive, creativity, and problem-solving skills. They have a real talent for breaking down complex problems and finding practical solutions, while also encouraging teamwork and open discussion. Working with them pushed me to think differently and aim higher. I have no doubt that they'll bring the same focus, innovation, and collaborative mindset to any role they take on.",
    source: "LinkedIn",
    date: "Oct 1, 2025",
    image: "assets/recommendations/mohamed-aziz-hadj-hassen/1759330354405.png",
    profileUrl: linkedInRecommendationsUrl,
  },
  {
    name: "Youssef BOUZID",
    role: "Cloud & Security Engineering Student at TEK-UP | Graduate ICT technician | Skilled in System and Network",
    quote:
      "I've had the pleasure of knowing Mohamed Aziz Guenni since our college days, and what has always stood out to me is his strong technical expertise combined with genuine dedication to his work. He consistently approaches challenges with persistence and creativity, ensuring not only that solutions are found but that they are reliable and well-executed. His professionalism, commitment, and problem-solving mindset make him someone I deeply admire and highly recommend.",
    source: "LinkedIn",
    date: "Sep 13, 2025",
    image: "assets/recommendations/youssef-bouzid/1775503564910.png",
    profileUrl: linkedInRecommendationsUrl,
  },
  {
    name: "mohamed ali hamroun",
    role: "Software Engineer | Computer Science",
    quote:
      "I've known Mohamed Aziz Guenni since our college days, and what always stood out is his strong technical skills and dedication to his work. He's the kind of person who approaches problems with persistence and creativity, always making sure to deliver solid results. His professionalism and commitment are qualities I truly admire.",
    source: "LinkedIn",
    date: "Aug 30, 2025",
    image: "assets/recommendations/mohamed-ali-hamroun/1750170996007.png",
    profileUrl: linkedInRecommendationsUrl,
  },
  {
    name: "Mohamed Amine Guitouni",
    role: "Student at Higher Institute of Computer Science Mahdia",
    quote:
      "An exceptional project partner passionate, reliable, and highly skilled at problem-solving. They stay composed under pressure, handle stress with professionalism, and consistently bring creative solutions to the table. Truly a pleasure to work with and an asset to any team.",
    source: "LinkedIn",
    date: "Aug 29, 2025",
    image: "assets/recommendations/mohamed-amine-guitouni/1750465418662.png",
    profileUrl: linkedInRecommendationsUrl,
  },
];

export const socialLinks: (LinkItem & { icon: LucideIcon })[] = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-aziz-guenni/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/azyzex",
    icon: Github,
  },
  {
    label: "Hugging Face",
    href: "https://huggingface.co/azyzrex/datasets",
    icon: Bot,
  },
  {
    label: "Location",
    href: "https://www.google.com/maps/search/?api=1&query=Grombalia%2C%20Nabeul%2C%20Tunisia",
    icon: MapPin,
  },
];

export const cvDownloads: LinkItem[] = [
  {
    label: "Download CV - English",
    href: "assets/cv/cv guenni mohamed aziz.pdf",
    status: "available" as const,
  },
  {
    label: "Download CV - French",
    href: "/assets/cv/mohamed-aziz-guenni-cv-fr.pdf",
    status: "needs-file" as const,
  },
];

export const proofStats = [
  { label: "Main focus", value: "Web + Mobile + AI" },
  { label: "Education", value: "Computer Engineering" },
  { label: "Current path", value: "Master's in Networks" },
];

export const manualAssetChecklist = [
  "Add a real profile photo to public/assets/profile/.",
  "Add project screenshots or short demo images to each public/assets/projects/<project>/ folder.",
  "Add actual certificate images or PDFs to public/assets/certificates/.",
  "Add both English and French CV PDFs to public/assets/cv/.",
  "Paste exact recommendation quotes in public/assets/recommendations/put-exact-quotes-here.txt, then copy the approved quotes into src/data/portfolio.ts.",
  "Add your Formspree endpoint as VITE_FORMSPREE_ENDPOINT when it is ready.",
];

export const utilityIcons = {
  Award,
  Wrench,
};
