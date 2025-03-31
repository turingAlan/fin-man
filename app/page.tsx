"use client";

import { useState, useEffect, useReducer } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileManagerLayout } from "@/components/file-manager-layout";
import { ProjectGrid } from "@/components/project-grid";
import { ProjectList } from "@/components/project-list";
import { Toolbar } from "@/components/toolbar";
import { ViewOptions } from "@/components/view-options";
import { NewProjectModal } from "@/components/new-project-modal";
import type { Project } from "@/types";
import { availableColors, defaultProjects } from "@/constants/projects";
import {
  initialState,
  projectsReducer,
} from "@/store/reducers/projectsReducer";

export default function Home() {
  const [projects, dispatch] = useReducer(projectsReducer, initialState);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("searchQuery") || "";
  const sortBy = searchParams.get("sortBy") || "name";

  const setSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams("searchQuery", debouncedSearchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [debouncedSearchQuery]);

  // Load projects from localStorage on initial render
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      parsedProjects.forEach((project: any) => {
        project.createdAt = new Date(project.createdAt);
      });
      dispatch({ type: "SET_PROJECTS", payload: parsedProjects });
    } else {
      dispatch({ type: "SET_PROJECTS", payload: defaultProjects });
      localStorage.setItem("projects", JSON.stringify(defaultProjects));
    }
  }, []);

  const openNewProjectModal = () => {
    setIsNewProjectModalOpen(true);
  };

  const createProject = (name: string) => {
    const newProject: Project = {
      id: Math.random().toString(36).substring(7),
      name,
      color:
        availableColors[Math.floor(Math.random() * availableColors.length)],
      createdAt: new Date(),
    };
    dispatch({ type: "ADD_PROJECT", payload: newProject });
    setIsNewProjectModalOpen(false);
  };

  const deleteProject = (id: string) => {
    dispatch({ type: "DELETE_PROJECT", payload: id });
  };

  const filteredProjects = projects
    .filter((project) => {
      if (
        searchQuery &&
        !project.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  return (
    <FileManagerLayout>
      <Toolbar
        searchQuery={debouncedSearchQuery}
        onSearchChange={setDebouncedSearchQuery}
        onCreateProject={openNewProjectModal}
        sortBy={sortBy}
        onSortChange={(value) => setSearchParams("sortBy", value)}
        onFilterChange={(value) => setSearchParams("filterType", value)}
      />

      <ViewOptions view={view} onViewChange={setView} />

      <div className="flex-1 overflow-auto p-4">
        {view === "grid" ? (
          <ProjectGrid projects={filteredProjects} onDelete={deleteProject} />
        ) : (
          <ProjectList projects={filteredProjects} onDelete={deleteProject} />
        )}
      </div>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onConfirm={createProject}
      />
    </FileManagerLayout>
  );
}
