export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
  bgColor?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Skill {
  name: string;
  iconClass: string; // devicon class
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}