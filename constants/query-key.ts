export const queryKeys = {
  getProjects: "getProjects",
  getProjectDetails: (projectId: string) => ["getProjectDetails", projectId],
};

export const mutationKeys = {
  createProject: "createProject",
  updateProject: (projectId: string) => ["updateProject", projectId],
  deleteProject: (projectId: string) => ["deleteProject", projectId],
};
