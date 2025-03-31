"use client";

import { Search, Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef } from "react";

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateProject: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFilterChange: (type: string | null) => void;
}

export function Toolbar({
  searchQuery,
  onSearchChange,
  onCreateProject,
  sortBy,
  onSortChange,
  onFilterChange,
}: ToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        inputRef.current &&
        inputRef.current === document.activeElement
      ) {
        event.preventDefault();
        onSearchChange(searchQuery);
      } else if (
        event.key === "Escape" &&
        inputRef.current &&
        inputRef.current === document.activeElement
      ) {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      } else if (
        event.key === "/" &&
        inputRef.current &&
        inputRef.current !== document.activeElement
      ) {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between">
      <div className="relative flex-1">
        <Search
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
        <Input
          ref={inputRef}
          className="pl-8 h-8 text-sm bg-gray-100 border-gray-200"
          placeholder="Press / to focus and Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="gap-2 flex items-center ml-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              Sort: {sortBy.slice(0, 1)?.toUpperCase() + sortBy.slice(1)}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSortChange("name")}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("date")}>
              Date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={onCreateProject}
        >
          <Plus size={14} />
          New Project
        </Button>
      </div>
    </div>
  );
}
