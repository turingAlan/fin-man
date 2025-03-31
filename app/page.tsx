import { useSearchParams, useRouter } from "next/navigation";
import { FileManagerLayout } from "@/components/file-manager-layout";
import { ProjectGrid } from "@/components/project-grid";
import { ProjectList } from "@/components/project-list";
import { Toolbar } from "@/components/toolbar";
import { ViewOptions } from "@/components/view-options";
import { NewProjectModal } from "@/components/new-project-modal";
import type { Project } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/use-projects";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: fetchedProjects, isLoading } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);
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

  useEffect(() => {
    if (fetchedProjects) {
      setProjects(fetchedProjects);
    }
  }, [fetchedProjects]);

  const openNewProjectModal = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleCreateProject = (name: string) => {
    setIsNewProjectModalOpen(false);
  };

  const deleteProject = (id: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
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
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-24 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : view === "grid" ? (
          <ProjectGrid projects={filteredProjects} onDelete={deleteProject} />
        ) : (
          <ProjectList projects={filteredProjects} onDelete={deleteProject} />
        )}
      </div>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onConfirm={handleCreateProject}
      />
    </FileManagerLayout>
  );
}
