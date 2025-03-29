"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { FileManagerLayout } from "@/components/file-manager-layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FolderIcon } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const pramasData = use(params);

  const [project, setProject] = useState<Project | null>(null);

  // In a real app, you would fetch the project data from an API or state management
  useEffect(() => {
    // Simulate fetching project data
    // In a real app, this would be a fetch call or state management
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      const projects: Project[] = JSON.parse(storedProjects);
      const foundProject = projects.find((p) => p.id === pramasData.id);
      if (foundProject) {
        // Convert string date back to Date object
        foundProject.createdAt = new Date(foundProject.createdAt);
        setProject(foundProject);
      }
    }
  }, [pramasData.id]);

  if (!project) {
    return (
      <FileManagerLayout>
        <div className="flex-1 flex items-center justify-center">
          <p>Loading project...</p>
        </div>
      </FileManagerLayout>
    );
  }

  return (
    <FileManagerLayout>
      {/* Project header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.push("/")}
          >
            <ChevronLeft size={16} />
          </Button>
          <h1 className="text-xl font-semibold">{project.name}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FolderIcon
              size={20}
              className={`text-${project.type.color}-500`}
            />
            <span className="text-sm font-medium">{project.type.name}</span>
          </div>
          <div className="text-sm text-gray-500">
            Created on {project.createdAt.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Project content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Project Details</h2>
          <p className="text-gray-600 mb-6">
            This is the detail page for your project. You can add content,
            files, and other information here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Files</h3>
              <p className="text-sm text-gray-500">
                No files yet. Add files to your project.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Notes</h3>
              <p className="text-sm text-gray-500">
                No notes yet. Add notes to your project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FileManagerLayout>
  );
}
