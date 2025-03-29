"use client"

import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewOptionsProps {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function ViewOptions({ view, onViewChange }: ViewOptionsProps) {
  return (
    <div className="h-10 border-b border-gray-200 flex items-center px-4 justify-end gap-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => onViewChange("grid")}
      >
        <Grid size={16} />
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => onViewChange("list")}
      >
        <List size={16} />
      </Button>
    </div>
  )
}

