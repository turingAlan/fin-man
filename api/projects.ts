import { availableColors } from "@/constants/projects";
import apiClient from "@/lib/axios-interceptor";
import { ApiProjectData, ApiProjectResponse, Project } from "@/types";

const API_BASE_URL = `/api/v0/project`;

export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<ApiProjectResponse>(`${API_BASE_URL}/`);
  const projects: Project[] = response.data.map((project) => ({
    ...project,
    createdAt: new Date(project.created_at ?? Date.now()),
    color: availableColors[Math.floor(Math.random() * availableColors.length)],
  }));
  return projects;
};

export const createProject = async (project: {
  name: string;
}): Promise<Project> => {
  const response = await apiClient.post<ApiProjectData>(
    `${API_BASE_URL}/`,
    project
  );

  const newProject: Project = {
    ...response.data,
    createdAt: new Date(response.data.created_at ?? Date.now()),
    color: availableColors[Math.floor(Math.random() * availableColors.length)],
  };
  return newProject;
};

export const getProjectDetails = async (projectId: string) => {
  const response = await apiClient.get(`${API_BASE_URL}/${projectId}`);
  return response.data;
};
