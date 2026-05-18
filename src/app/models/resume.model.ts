export interface Education {
  years: string;
  degree: string;
  college: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Reference {
  name: string;
  title: string;
  phone: string;
}

export interface ResumeData {
  name: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
  address: string;
  about: string;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  references: Reference[];
}