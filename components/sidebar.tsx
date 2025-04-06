"use client";

import { ProjectDetails } from "@/types";
import { ChevronLeftIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateText } from "@/lib/utils";

interface SidebarProps {
  onToggle: () => void;
  isLoading: boolean;
  projectFiles: ProjectDetails | null;
}

export function Sidebar({ onToggle, isLoading, projectFiles }: SidebarProps) {
  const fileColorMap = {
    document: "bg-red-500",
    excel_f1: "bg-green-500",
    excel_f2: "bg-blue-500",
    json: "bg-yellow-500",
  };

  return (
    <div className="w-48 bg-gray-100 border-r border-gray-300 flex flex-col">
      <div className="p-2 flex justify-end">
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
        >
          <ChevronLeftIcon size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mt-4 px-2 py-1 text-xs font-semibold text-gray-500">
          Files
        </div>
        <ul>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-center gap-2 p-2">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </li>
              ))
            : projectFiles?.data?.map((file) => (
                <li
                  key={file.id}
                  className={`flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-200 rounded ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${
                      fileColorMap[file.item_type] || "bg-gray-400"
                    }`}
                  ></div>
                  {truncateText(file.name, 10)}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
