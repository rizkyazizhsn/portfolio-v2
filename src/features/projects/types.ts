export type CaseStudyNote = { title: string; description: string };

export type ProjectCaseStudy = {
  role: string;
  duration: string;
  technologies: string[];
  overview: string;
  challenge: string;
  approach: CaseStudyNote[];
  results: CaseStudyNote[];
  reflection: string;
  websiteUrl?: string;
  repositoryUrl?: string;
};

export type Project = {
  name: string;
  slug: string;
  client: string;
  description: string;
  src: string;
  year: number;
  caseStudy?: ProjectCaseStudy;
};
