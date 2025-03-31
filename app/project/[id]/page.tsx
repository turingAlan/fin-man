"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { FileManagerLayout } from "@/components/file-manager-layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FolderIcon, Building, BuildingIcon } from "lucide-react";
import type { Project } from "@/types";
import { CompanySearch } from "@/components/company-search";
import { FileUpload } from "@/components/file-upload";
import { ProjectAnalysis } from "@/components/project-analysis";
import { truncateText } from "@/lib/utils";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsData = use(params);

  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [companyType, setCompanyType] = useState<"listed" | "unlisted" | null>(
    null
  );
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showRightPanel, setShowRightPanel] = useState(false);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      const projects: Project[] = JSON.parse(storedProjects);
      const foundProject = projects.find((p) => p.id === paramsData.id);
      if (foundProject) {
        foundProject.createdAt = new Date(foundProject.createdAt);
        setProject(foundProject);
      }
    }
  }, [paramsData.id]);

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "text-blue-600",
      green: "text-green-500",
      purple: "text-purple-600",
      orange: "text-orange-500",
      pink: "text-pink-500",
      cyan: "text-cyan-500",
    };
    return colorMap[color] || "text-gray-500";
  };

  useEffect(() => {
    if (selectedCompany || uploadedFile) {
      const timer = setTimeout(() => {
        setShowRightPanel(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedCompany, uploadedFile]);

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const resetSelection = () => {
    setCompanyType(null);
    setSelectedCompany(null);
    setUploadedFile(null);
    setShowRightPanel(false);
  };

  if (!project) {
    return (
      <FileManagerLayout>
        <div className="flex-1 flex items-center justify-center">
          <p>Loading project...</p>
        </div>
      </FileManagerLayout>
    );
  }

  const colorClass = getColorClass(project.color);

  return (
    <FileManagerLayout>
      {/* Project header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-gray-100"
            onClick={() => router.push("/")}
          >
            <ChevronLeft size={16} />
          </Button>
          <h1 className="text-xl font-semibold">{project.name}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FolderIcon size={20} className={colorClass} />
            <span className="text-sm font-medium">{project.name}</span>
          </div>
          <div className="text-sm text-gray-500">
            Created on {project.createdAt.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Project content with split view */}
      <div className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Right panel */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            showRightPanel
              ? "w-1/3 translate-x-0 opacity-100"
              : "w-full translate-x-0 opacity-100"
          } p-3 overflow-auto`}
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-full">
            <h2 className="text-lg font-medium mb-6">Company Information</h2>

            {!companyType ? (
              <div className="space-y-6">
                <p className="text-gray-600 mb-6">
                  Please select the type of company you're working with:
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="flex-1 py-8 bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                    variant="outline"
                    onClick={() => setCompanyType("listed")}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Building size={32} className="text-blue-600" />
                      <span className="font-medium">Listed Company</span>
                    </div>
                  </Button>

                  <Button
                    className="flex-1 py-8 bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                    variant="outline"
                    onClick={() => setCompanyType("unlisted")}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <BuildingIcon size={32} className="text-green-500" />
                      <span className="font-medium">Unlisted Company</span>
                    </div>
                  </Button>
                </div>
              </div>
            ) : companyType === "listed" && !selectedCompany ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium">
                    Search for Listed Company
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetSelection}
                    className="text-blue-600 hover:bg-gray-100"
                  >
                    Back
                  </Button>
                </div>

                <CompanySearch onSelect={handleCompanySelect} />
              </div>
            ) : companyType === "unlisted" && !uploadedFile ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium">
                    Upload Financial Documents
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetSelection}
                    className="text-blue-600 hover:bg-gray-100"
                  >
                    Back
                  </Button>
                </div>

                <FileUpload onUpload={handleFileUpload} />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium">
                    {selectedCompany
                      ? `Selected Company: ${selectedCompany}`
                      : uploadedFile
                      ? `Uploaded: ${truncateText(uploadedFile.name, 20)}`
                      : ""}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetSelection}
                    className="text-blue-600 hover:bg-gray-100"
                  >
                    Reset
                  </Button>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <p className="text-gray-600">
                    {selectedCompany
                      ? `Company data for ${selectedCompany} has been loaded.`
                      : `Financial documents have been uploaded and are being processed.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Left panel */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showRightPanel ? "w-2/3" : "w-0 opacity-0"
          } p-3 overflow-auto`}
        >
          {showRightPanel && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-full">
              <ProjectAnalysis company={selectedCompany} file={uploadedFile} />
            </div>
          )}
        </div>
      </div>
    </FileManagerLayout>
  );
}
