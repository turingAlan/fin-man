import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjects,
  createProject,
  getProjectDetails,
  uploadDocuments,
} from "@/api/projects";
import { queryKeys } from "@/constants/query-key";
import { Project } from "@/types";
import { toast } from "sonner";

export const useProjects = () => {
  return useQuery({
    queryKey: [queryKeys.getProjects],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });
};

export const useCreateProject = (
  handleProjectSuccess: (projectData: Project) => any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: (projectData: Project) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getProjects] });
      if (handleProjectSuccess) {
        handleProjectSuccess(projectData);
      }
    },
  });
};

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: queryKeys.getProjectDetails(projectId),
    queryFn: () => getProjectDetails(projectId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useUploadProjectDocuments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ukid, documents }: { ukid: string; documents: File[] }) =>
      uploadDocuments(ukid, documents),
    onSuccess: (data, bodyData) => {
      toast.success(`Documents uploaded successfully`);
    },
  });
};
