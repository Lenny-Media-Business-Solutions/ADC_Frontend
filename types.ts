
export interface Program {
  id: string;
  title: string;
  icon: string;
  description: string;
  objectives: string[];
  activities: string[];
  beneficiaries: string;
  outcomes: string[];
  image: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  duration: string;
  partner: string;
  status: 'ongoing' | 'completed';
  description: string;
  outcomes?: string[];
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  category: 'board' | 'management';
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  location: string;
  category: string;
}
