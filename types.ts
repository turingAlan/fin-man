export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  createdAt: Date;
}

export interface ProjectType {
  id: string;
  name: string;
  color: string;
}
