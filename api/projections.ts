import { availableColors } from "@/constants/projects";
import apiClient from "@/lib/axios-interceptor";
import { ApiProjectData, Project, ProjectDetails } from "@/types";

const API_BASE_URL = `/api/v0/financial`;

export type ProjectApiBody = {
  assumptions: string;
  ukid: string;
  years: number;
  financial_statements: any[];
  loan_amount: number;
  interest_rate: number;
  tenure: number;
};

export const createProjection = async (data: ProjectApiBody): Promise<any> => {
  const response = await apiClient.post<any>(`${API_BASE_URL}/`, data);
  return response.data;
};
