import { Project, Experience, Skill } from './types';
import { Github, Linkedin, Mail, MapPin, Smartphone, Database, Globe } from 'lucide-react';
import React from 'react';
import myPhoto from './assets/MY_photo.png';


// Using local profile image. Please ensure 'profile.png' is placed in the project root/public folder.
export const IMAGES = {
  profile: myPhoto,
  treko: "https://placehold.co/600x400/10101c/5b6af0?text=Treko+App", // Dark blue/purple theme from screenshot
  easyBook: "https://placehold.co/600x400/181828/22d3ee?text=EasyBook+App", // Colorful abstract theme from screenshot
};

export const PERSONAL_INFO = {
  name: "Jehad Fostok",
  title: "Computer Engineer",
  email: "devjehad630@gmail.com",
  phone: "+966565079353",
  location: "Jeddah, Saudi Arabia",
  bio: "Motivated Computer Engineer with a passion for building commercial-grade mobile interfaces. Proficient in a wide technology stack including Flutter, Java, Python, and Unity. Strong problem-solving abilities demonstrated through the development of secure E-voting systems and AI-driven solutions.",
  socials: [
    { platform: "GitHub", url: "https://github.com/Jehad630", icon: <Github size={20} /> },
    { platform: "LinkedIn", url: "https://linkedin.com/in/jehad-fostok", icon: <Linkedin size={20} /> },
    { platform: "Email", url: "mailto:devjehad630@gmail.com", icon: <Mail size={20} /> },
  ]
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Subh",
    role: "Computer Engineer",
    period: "Nov 2024 - Present",
    location: "Makkah",
    description: [
      "Building new features for the platform.",
      "Collaborated effectively with the team to resolve website issues and perform debugging.",
      "Integrated AI-driven debugging tools into the development workflow, increasing code review efficiency by 20%.",
      "Digital marketing initiatives."
    ]
  },
  {
    company: "Scramblebit",
    role: "Computer Engineering Intern",
    period: "Jul 2024 - Aug 2024",
    location: "Istanbul",
    description: [
      "Developed and designed mobile app interfaces using Flutter within a professional environment.",
      "Contributed to building core functionalities using Dart and state management.",
      "Collaborated with engineers to improve UI/UX and optimize app performance.",
      "Successfully delivered 5+ cross-platform mobile applications, consistently meeting project deadlines."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Treko",
    description: "A cross-platform Flutter app to manage and track digital subscriptions, search, and authentication. Uses Bloc for state management and Supabase for backend.",
    tags: ["Flutter", "Supabase", "Bloc/Cubit", "CRUD"],
    image: IMAGES.treko,
    bgColor: "bg-indigo-900/20",
    github: "https://github.com/Jehad630/Treko_App.git"
  },
  {
    title: "EasyBook App",
    description: "Fast, elegant book-browsing app with advanced category search and detailed book info using Google Books API. Features efficient image caching and optimized API integration.",
    tags: ["Flutter", "Google Books API", "Dio", "GetIt"],
    image: IMAGES.easyBook,
    bgColor: "bg-teal-900/20",
    github: "https://github.com/Jehad630/easy_book.git"
  },
  {
    title: "Chatbot Assistant App",
    description: "An NLP-based chatbot with automated text responses and clean, responsive UI using Flutter and Dialogflow.",
    tags: ["Flutter", "Dialogflow", "NLP"],
    bgColor: "bg-blue-900/20"
  },
  {
    title: "Blockchain E-Voting System",
    description: "Architected a decentralized voting system using Solidity for smart contracts and Web3Dart for blockchain interaction, ensuring 100% tamper-proof record keeping.",
    tags: ["Flutter", "Solidity", "Web3Dart", "Blockchain"],
    bgColor: "bg-purple-900/20"
  },
  {
    title: "Travel Recommendation System",
    description: "Developed an ML-based system using 20,000+ destinations to recommend trips based on budget, season, and category.",
    tags: ["Python", "Scikit-learn", "Machine Learning"],
    bgColor: "bg-green-900/20"
  },
  {
    title: "OCR Attendance System",
    description: "Built an OCR-based attendance system that reads student cards, stores records in a database, and flags excessive absences.",
    tags: ["Python", "OCR", "Database"],
    bgColor: "bg-red-900/20"
  }
];

export const SKILLS: Record<string, Skill[]> = {
  languages: [
    { name: "Dart", iconClass: "devicon-dart-plain colored" },
    { name: "Python", iconClass: "devicon-python-plain colored" },
    { name: "Java", iconClass: "devicon-java-plain colored" },
    { name: "C#", iconClass: "devicon-csharp-plain colored" },
    { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
    { name: "PHP", iconClass: "devicon-php-plain colored" },
  ],
  frameworks: [
    { name: "Flutter", iconClass: "devicon-flutter-plain colored" },
    { name: "Unity", iconClass: "devicon-unity-original colored" },
    // { name: "React", iconClass: "devicon-react-original colored" },
    { name: "TensorFlow", iconClass: "devicon-tensorflow-original colored" },
  ],
  tools: [
    { name: "Git", iconClass: "devicon-git-plain colored" },
    { name: "Firebase", iconClass: "devicon-firebase-plain colored" },
    { name: "Supabase", iconClass: "devicon-supabase-plain colored" },
    { name: "Postman", iconClass: "devicon-postman-plain colored" },
    { name: "MySQL", iconClass: "devicon-mysql-plain colored" },
  ]
};