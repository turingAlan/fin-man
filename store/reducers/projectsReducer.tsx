import { Project } from "@/types";

type ProjectsState = Project[];

type Action =
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "EDIT_PROJECT"; payload: Project }
  | { type: "SET_PROJECTS"; payload: Project[] };

export const initialState: ProjectsState = [];

export const projectsReducer = (
  state: ProjectsState,
  action: Action
): ProjectsState => {
  let newState: ProjectsState;

  switch (action.type) {
    case "SET_PROJECTS":
      newState = action.payload;
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case "ADD_PROJECT":
      newState = [...state, action.payload];
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case "DELETE_PROJECT":
      newState = state.filter((project) => project.id !== action.payload);
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case "EDIT_PROJECT":
      newState = state.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};
