export type HonestyLevel = 
  | "strong-experience" 
  | "hands-on" 
  | "working-knowledge" 
  | "familiar-with";

export interface SkillItem {
  name: string;
  category: "backend" | "frontend" | "database" | "devops" | "other";
  level: HonestyLevel;
  levelLabel: string;
  proficiencyScore: number;
  highlight?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  isCurrent: boolean;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  isFlagship?: boolean;
  category: "Enterprise ERP" | "ERP Module" | "Web Application" | "Mobile/Web App" | "Desktop Application" | "Web Portal & Microservices";
  summary: string;
  description: string;
  technologies: string[];
  keyModules?: string[];
  keyTables?: string[];
  architecture?: string;
  highlights: string[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  problem: string;
  approach: string;
  technologies: string[];
  implementation: string;
  result: string;
}

export interface ArchitectureLayer {
  id: string;
  stepNumber: number;
  name: string;
  category: "Frontend" | "API Layer" | "Core Logic" | "Data Access" | "ORM / Mapping" | "Database Engine";
  description: string;
  keyResponsibilities: string[];
  technologies: string[];
  hardikRoleNote: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  location: string;
  resumeUrl: string;
}

export interface EducationItem {
  degree: string;
  year: string;
  details: string;
  status: string;
}
