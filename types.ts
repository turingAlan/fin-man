export interface Project extends ApiProjectData {
  createdAt: Date;
  color: string;
}

export interface ApiProjectData {
  updated_at: string | null;
  created_at: string | null;
  deleted_at: string | null;
  name: string;
  id: string;
  description: string | null;
}

export type ApiProjectResponse = ApiProjectData[];
