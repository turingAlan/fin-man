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

export interface ProjectDetailFile {
  id: string;
  parent: string;
  tags: string;
  name: string;
  item_type: "document" | "excel_f2" | "excel_f1" | "json";
  file_path: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type ProjectDetails = { data: ProjectDetailFile[] };
