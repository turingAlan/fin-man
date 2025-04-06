"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { FileManagerLayout } from "@/components/file-manager-layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FolderIcon, Building, BuildingIcon } from "lucide-react";
import type { ProjectDetails } from "@/types";
import { CompanySearch } from "@/components/company-search";
import { FileUpload } from "@/components/file-upload";
import { ProjectAnalysis } from "@/components/project-analysis";
import { ProjectManagerLayout } from "@/components/project-manager-layout";
import {
  useProjectDetails,
  useUploadProjectDocuments,
} from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateProjection } from "@/hooks/use-projections";
export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsData = use(params);

  const router = useRouter();

  const { data: projectData, isLoading: isLoading } = useProjectDetails(
    paramsData.id
  );

  const {
    mutate: handleUploadProjectFiles,
    isPending: isUploadingProjectFiles,
    data: uploadProjectFilesData,
  } = useUploadProjectDocuments();

  const { mutate: createProject, isPending } = useCreateProjection();

  const [project, setProject] = useState<ProjectDetails | undefined>(undefined);
  const [companyType, setCompanyType] = useState<"listed" | "unlisted" | null>(
    null
  );
  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    "unlisted"
  );

  const [fileAnalysisData, setFileAnalysisData] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [showRightPanel, setShowRightPanel] = useState(false);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

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

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
  };

  const handleFileUpload = (file: File[]) => {
    setUploadedFiles(file);
    handleUploadProjectFiles({
      ukid: paramsData.id || "",
      documents: file,
    });
  };

  const handleCreateProjection = (data: {
    assumption: string;
    years: number;
    loanAmount: number;
    tenure: number;
    interest: number;
  }) => {
    createProject({
      assumptions: data.assumption,
      ukid: paramsData.id || "",
      years: data.years,
      financial_statements: [
        {
          item_type: "document",
        },
      ],
      loan_amount: data.loanAmount,
      interest_rate: data.interest,
      tenure: data.tenure,
    });
  };

  const resetSelection = () => {
    setCompanyType(null);
    // setSelectedCompany(null);
    setUploadedFiles(null);
    setShowRightPanel(false);
  };

  if (!project) {
    return (
      <FileManagerLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </FileManagerLayout>
    );
  }

  const colorClass = getColorClass(
    ["blue", "green", "purple", "orange", "pink", "cyan"][
      Math.floor(Math.random() * 6)
    ]
  );

  useEffect(() => {
    if (uploadProjectFilesData) {
      setFileAnalysisData(uploadProjectFilesData);
      setShowRightPanel(true);
    }
  }, [uploadProjectFilesData]);

  return (
    <ProjectManagerLayout>
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
          <h1 className="text-xl font-semibold">{paramsData.id}</h1>
        </div>
        {/* ask for the back to include the project details along with the project files in the api */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FolderIcon size={20} className={colorClass} />
            <span className="text-sm font-medium">{paramsData.id}</span>
          </div>
          <div className="text-sm text-gray-500">
            Created on {new Date().toLocaleDateString()}
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
            ) : companyType === "unlisted" ? (
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
                      : uploadedFiles
                      ? `Uploaded: files`
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
              <ProjectAnalysis
                company={selectedCompany}
                files={uploadedFiles}
              />
            </div>
          )}
        </div>
      </div>
    </ProjectManagerLayout>
  );
}
