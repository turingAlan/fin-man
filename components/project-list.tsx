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

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export function ProjectList({ projects, onDelete }: ProjectListProps) {
  const router = useRouter();

  const handleProjectClick = (id: string) => {
    router.push(`/project/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-4 text-xs font-medium text-gray-500">
              Name
            </th>

            <th className="text-left py-2 px-4 text-xs font-medium text-gray-500">
              Created
            </th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <td className="py-2 px-4">
                <div className="flex items-center gap-2">
                  <FolderIcon
                    size={16}
                    className={`text-${project.color}-500`}
                  />
                  <span className="text-sm">{project.name}</span>
                </div>
              </td>
              <td className="py-2 px-4 text-sm text-gray-600">
                {project.createdAt.toLocaleDateString()}
              </td>
              <td className="py-2 px-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
