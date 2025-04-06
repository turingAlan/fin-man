"use client";

import { useState, useEffect } from "react";
import { truncateText } from "@/lib/utils";
import SheetVisualizer from "./sheet-visualizer";

interface ProjectAnalysisProps {
  company: string | null;
  files: File[] | null;
}

export function ProjectAnalysis({
  company,
  files: files,
}: ProjectAnalysisProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mb-4"></div>
        <p className="text-gray-600">Analyzing data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full flex-1 space-y-6">
      <div>
        <h2 className="text-lg font-medium">Financial Analysis</h2>
        <p className="text-sm text-gray-600">
          {company
            ? `Analysis for ${company}`
            : files
            ? `Analysis based on uploaded document: ${
                (files.map((file) => truncateText(file.name, 5)).join(", "), 20)
              }`
            : "Analysis Results"}
        </p>
      </div>
      <div className="w-full flex h-full flex-1 ">
        <SheetVisualizer />
      </div>
    </div>
  );
}
