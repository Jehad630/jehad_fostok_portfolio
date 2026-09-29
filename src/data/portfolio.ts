/**
 * Single source of truth for all personal content on the site.
 * Source: ./cv.pdf. Components must read from this file only.
 * Anything marked `TODO: confirm` still needs verification by Jehad.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type LinkKind = 'email' | 'github' | 'linkedin' | 'website' | 'playstore';

export interface Link {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  positioning: string;
  summary: string;
  bio: string[];
  email: string;
  city: string;
  cvUrl: string;
  siteUrl: string;
}

export interface Stat {
  value: string;
  label: string;
  note?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  /** Dart-flavoured identifier used by the code-editor skills panel. */
  widget: string;
  items: string[];
}

export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';

export interface Experience {
  company: string;
  role: string;
  mode: WorkMode;
  start: string;
  end: string;
  current: boolean;
  location: string;
  highlights: string[];
}

export type StatusTone = 'live' | 'progress' | 'neutral';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  team: 'Solo' | 'Team';
  status: { label: string; tone: StatusTone };
  links: Link[];
  /** Portrait phone screenshots; missing files fall back to generated placeholder screens. */
  screens: string[];
  /** Placeholder-screen flavour used until real screenshots exist. */
  placeholder: 'tracker' | 'classifieds' | 'dashboard';
  rtl?: boolean;
}

export interface Education {
  degree: string;
  school: string;
  city: string;
  country: string;
  start: string;
  end: string;
}

export interface Certification {
  name: string;
  detail?: string;
  year: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Expected screenshot paths: public/screens/<project>/1.png … n.png */
const screenPaths = (project: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/screens/${project}/${i + 1}.png`);

// ─── Profile ────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: 'Jehad Fostok',
  firstName: 'Jehad',
  lastName: 'Fostok',
  title: 'Flutter Developer',
  positioning:
    'I build production-grade Flutter apps — from Supabase schema design to Play Store release.',
  summary:
    'Flutter Developer with hands-on experience building production-grade mobile applications using Clean Architecture and BLoC/Cubit state management. Experienced across the full app lifecycle — from Supabase backend design to Play Store deployment — with additional work in blockchain integration (Solidity, web3dart) and agentic software engineering workflows. SCE-certified engineer.',
  bio: [
    'I’m a Flutter developer who builds production-grade mobile apps on Clean Architecture and BLoC/Cubit — code that stays readable long after the first release.',
    'I work across the whole lifecycle: designing the Supabase backend, shipping the Flutter UI, and taking the app all the way to Google Play. Along the way I’ve integrated blockchain (Solidity, web3dart) and adopted agentic software engineering with Claude Code and MCP.',
    'I’m an SCE-certified engineer with a Bachelor’s in Computer Engineering.',
  ],
  email: 'devjehad630@gmail.com',
  city: 'Riyadh',
  cvUrl: '/cv.pdf',
  siteUrl: 'https://jehad-fostok-portfolio.vercel.app/',
};

// ─── Links ──────────────────────────────────────────────────────────────────

export const links: Link[] = [
  { kind: 'email', label: 'Email', href: `mailto:${profile.email}` },
  { kind: 'github', label: 'GitHub', href: 'https://github.com/Jehad630' },
  { kind: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/jehad-fostok' },
];

// ─── Key facts (derived only from CV dates / entries) ──────────────────────

export const stats: Stat[] = [
  {
    value: '2',
    label: 'Years building with Flutter',
    note: 'Since 07/2024',
  },
  { value: '4', label: 'Companies', note: 'On-site · Remote · Hybrid' },
  { value: '3', label: 'Featured apps', note: '1 live on Google Play' },
  { value: 'SCE', label: 'Certified engineer', note: '2026' },
];

// ─── Skills (7 categories, exactly as in the CV) ───────────────────────────

export const skills: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages & Frameworks',
    widget: 'LanguagesAndFrameworks',
    items: ['Dart', 'Flutter', 'Java', 'C#'],
  },
  {
    id: 'architecture',
    name: 'Architecture & State Management',
    widget: 'ArchitectureAndState',
    items: [
      'Clean Architecture',
      'MVVM',
      'MVC',
      'BLoC/Cubit',
      'Provider',
      'Dependency Injection (get_it)',
      'Structured Error Handling (Either/Result pattern, custom Exception classes)',
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Database',
    widget: 'BackendAndDatabase',
    items: [
      'Supabase',
      'PostgreSQL',
      'Firebase (Auth, Notifications)',
      'Row-Level Security (RLS)',
      'Local Caching (Hive, SharedPreferences, SQLite)',
      'File/Image Upload (Supabase Storage)',
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Platforms',
    widget: 'ToolsAndPlatforms',
    items: ['Git', 'Google Play Console', 'Postman', 'Jira', 'Bitbucket'],
  },
  {
    id: 'ai',
    name: 'AI-Assisted Development',
    widget: 'AiAssistedDevelopment',
    items: [
      'Claude Code',
      'MCP (Model Context Protocol)',
      'Prompt Engineering',
      'Agentic Software Engineering',
    ],
  },
  {
    id: 'methodologies',
    name: 'Methodologies',
    widget: 'Methodologies',
    items: ['Agile/Scrum'],
  },
  {
    id: 'other',
    name: 'Other',
    widget: 'Other',
    items: [
      'web3dart',
      'Blockchain Integration',
      'REST APIs',
      'WebSockets',
      'Real-time Data',
      'Localization',
      'OTP Authentication',
      'Role-Based Access Control',
      'Responsive Design',
      'Performance Optimization',
      'Push Notification Routing',
      'Custom Animations',
      'Pagination',
      'Advanced Form Validation',
    ],
  },
];

// ─── Experience (newest first) ──────────────────────────────────────────────

export const experience: Experience[] = [
  {
    company: 'Provio Phantom Code',
    role: 'Front-End Flutter Developer',
    mode: 'On-site',
    start: '07/2026',
    end: 'Present',
    current: true,
    location: 'Aleppo, Syria',
    highlights: [
      'Own the front-end (Flutter) role in a cross-functional team building mobile applications.',
      'Work in Agile/Scrum with daily stand-ups, Jira for task tracking and Bitbucket for version control.',
      'Shape UI/UX improvements in team discussions and translate ideas into polished, user-facing screens.',
      'Build clean, maintainable Flutter screens integrated with a Spring Boot backend.',
    ],
  },
  {
    company: 'Borooa',
    role: 'Computer Engineer',
    mode: 'Remote',
    start: '03/2026',
    end: '07/2026',
    current: false,
    location: 'Remote',
    highlights: [
      'Developed the dashboard for Borooa, a marketplace platform for artisans and craftsmen, while overseeing the website and directing bug fixes and ongoing improvements.',
      'Built the full dashboard end-to-end, including testing and continuous improvements.',
      'Trained a trainer in website development, extending technical knowledge within the team.',
    ],
  },
  {
    company: 'Subh',
    role: 'Computer Engineer',
    mode: 'Hybrid',
    start: '11/2025',
    end: '01/2026',
    current: false,
    location: 'Makkah',
    highlights: [
      'Enhanced platform features and resolved bugs across the website, improving stability and user experience.',
      'Integrated AI-driven debugging tools, improving code review efficiency.',
      'Contributed to digital marketing strategies to help promote the platform.',
    ],
  },
  {
    company: 'SCRAMBLEBIT',
    role: 'Front-End (Flutter Developer) Intern',
    mode: 'Remote',
    start: '07/2024',
    end: '08/2025',
    current: false,
    location: 'Istanbul, Turkey',
    highlights: [
      'Developed and designed 5 mobile app interfaces with Flutter, enhancing user engagement.',
      'Contributed to core functionality with Dart and state management, ensuring robust performance.',
      'Collaborated with engineers to improve UI/UX and optimize app performance with a user-centric approach.',
    ],
  },
];

// ─── Projects (exactly 3) ──────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'treko',
    title: 'TreKo',
    tagline: 'Subscription & expense tracker',
    description:
      'A subscription and expense tracker built solo, end-to-end, with an agentic software engineering workflow — Flutter UI (Claude Design) on a Supabase backend (Claude Code + MCP).',
    highlights: [
      'Designed the Supabase schema before writing any code, treating planning as the most critical phase.',
      'Currency conversion through an external exchange-rate API.',
      'Pagination, custom animations and multi-step form validation.',
      'Published on Google Play Store.',
    ],
    stack: ['Flutter', 'Supabase', 'Claude Code', 'MCP', 'REST API'],
    team: 'Solo',
    status: { label: 'Live on Google Play', tone: 'live' },
    links: [
      // TODO: confirm — add the Google Play URL, e.g. { kind: 'playstore', label: 'Google Play', href: '…' }
    ],
    screens: screenPaths('treko', 5),
    placeholder: 'tracker',
  },
  {
    id: 'wakeelek',
    title: 'Wakeelek',
    tagline: 'Classifieds app for selling personal items',
    description:
      'A classifieds app where people list and sell their personal items. I built the Flutter frontend as part of a team, connected to a Java Spring Boot backend.',
    highlights: [
      'OTP verification and role-based access control for secure account management.',
      'Real-time buyer–seller chat, image upload and maps.',
      'Paginated listings feed.',
      'Feature-rich app nearing public release.',
    ],
    stack: ['Flutter', 'Java Spring Boot', 'OTP Auth', 'RBAC', 'Real-time Chat', 'Maps'],
    team: 'Team',
    status: { label: 'Nearing release', tone: 'progress' },
    links: [],
    screens: screenPaths('wakeelek', 5),
    placeholder: 'classifieds',
  },
  {
    id: 'borooa',
    title: 'Borooa dashboard',
    tagline: 'Dashboard for a Saudi artisan marketplace',
    description:
      'The Flutter dashboard for Borooa, a Saudi marketplace for artisans — with OTP, notifications and OTO API shipping integration, fully bilingual in Arabic and English.',
    highlights: [
      'Cleaned up disorganized backend data with zero disruption to the live store.',
      'Image upload, pagination, real-time features and custom-animated form validation.',
      'OTP, notifications and OTO API integration for shipping.',
      'Full Arabic/English bilingual support with RTL support.',
    ],
    stack: ['Flutter', 'OTO API', 'OTP Auth', 'Notifications', 'Arabic/English · RTL'],
    team: 'Solo',
    status: { label: 'Status TBC', tone: 'neutral' }, // TODO: confirm status badge
    links: [],
    screens: screenPaths('borooa', 5),
    placeholder: 'dashboard',
    rtl: true,
  },
];

// ─── Education & certifications ────────────────────────────────────────────

export const education: Education[] = [
  {
    degree: 'Bachelor of Computer Engineering',
    school: 'Gaziosmanpasa University',
    city: 'Tokat',
    country: 'Turkey',
    start: '09/2021',
    end: '06/2025',
  },
];

export const certifications: Certification[] = [
  { name: 'SCE Certification', year: '2026' },
  { name: 'Claude Code 101', year: '2026' },
  { name: 'Flutter App Development', detail: 'Courses in Flutter', year: '2024–2025' },
  { name: 'Git & GitHub Course', year: '2025' },
];

// ─── Site chrome ────────────────────────────────────────────────────────────

export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export const builtWith = [
  'React',
  'TypeScript',
  'Three.js',
  'React Three Fiber',
  'GSAP',
  'Framer Motion',
  'Lenis',
  'Tailwind CSS',
];

export const portfolio = {
  profile,
  links,
  stats,
  skills,
  experience,
  projects,
  education,
  certifications,
  navigation,
  builtWith,
};

export default portfolio;
