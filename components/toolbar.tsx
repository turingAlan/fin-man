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

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateProject: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  filterType: string | null;
  onFilterChange: (type: string | null) => void;
  projectTypes: string[];
}

export function Toolbar({
  searchQuery,
  onSearchChange,
  onCreateProject,
  sortBy,
  onSortChange,
  filterType,
  onFilterChange,
  projectTypes,
}: ToolbarProps) {
  return (
    <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between">
      <div className="relative flex-1">
        <Search
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
        <Input
          className="pl-8 h-8 text-sm bg-gray-100 border-gray-200"
          placeholder="Search projects..."
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              Filter: {filterType || "All"}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onFilterChange(null)}>
              All
            </DropdownMenuItem>
            {projectTypes.map((type) => (
              <DropdownMenuItem key={type} onClick={() => onFilterChange(type)}>
                {type}
              </DropdownMenuItem>
            ))}
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
