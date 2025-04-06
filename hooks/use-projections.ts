import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys } from "@/constants/query-key";
import { toast } from "sonner";
import { createProjection, ProjectApiBody } from "@/api/projections";

export const useCreateProjection = (
  onSuccess?: (data: ProjectApiBody) => any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProjection,
    mutationKey: [mutationKeys.createProjection],
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      toast.error(
        `Error creating projection: ${error.message || "Something went wrong"}`
      );
    },
  });
};
