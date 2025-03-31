"use client";

import { FolderIcon, MoreHorizontal, Trash2 } from "lucide-react";
import type { Project } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface ProjectGridProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export function ProjectGrid({ projects, onDelete }: ProjectGridProps) {
  const router = useRouter();

  const handleProjectClick = (id: string) => {
    router.push(`/project/${id}`);
  };

  console.log(projects);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {projects.map((project) => {
        return (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group cursor-pointer"
          >
            <div
              className={`h-24 flex items-center justify-center bg-${project.color}-100`}
              onClick={() => handleProjectClick(project.id)}
            >
              <FolderIcon size={48} className={`text-${project.color}-500`} />
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div onClick={() => handleProjectClick(project.id)}>
                  <h3 className="font-medium text-sm truncate">
                    {project.name}
                  </h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(project.id);
                      }}
                    >
                      <Trash2 size={14} className="mr-2 text-red-500" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {project.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
