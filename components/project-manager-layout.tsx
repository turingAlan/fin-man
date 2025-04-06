"use client";

import type React from "react";

import { WindowControls } from "@/components/window-controls";
import { useParams } from "next/navigation";
import ClickToCopy from "./ui/click-to-copy";
import { useState } from "react";
import { Sidebar } from "./sidebar";

export function ProjectManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Window header */}
      <div className="h-10 bg-gray-200 border-b border-gray-300 flex items-center px-3">
        <WindowControls />
        <div className="flex-1 flex justify-center items-center text-sm font-medium">
          {params.id ? (
            <ClickToCopy
              textToCopy={Array.isArray(params.id) ? params.id[0] : params.id}
            >
              Project #{params.id}
            </ClickToCopy>
          ) : (
            "Projects"
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <Sidebar
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            isLoading={false}
            projectFiles={[]}
          />
        )}
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
