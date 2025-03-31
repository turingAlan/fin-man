import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject, getProjectDetails } from "@/api/projects";
import { queryKeys } from "@/constants/query-key";

export const useProjects = () => {
  return useQuery({
    queryKey: [queryKeys.getProjects],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getProjects] });
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
