"use client";

import type React from "react";

import { WindowControls } from "@/components/window-controls";

export function FileManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Window header */}
      <div className="h-10 bg-gray-200 border-b border-gray-300 flex items-center px-3">
        <WindowControls />
        <div className="flex-1 text-center text-sm font-medium">Projects</div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
