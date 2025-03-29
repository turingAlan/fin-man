"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectType } from "@/types";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, type: ProjectType) => void;
  projectTypes: ProjectType[];
}

export function NewProjectModal({
  isOpen,
  onClose,
  onConfirm,
  projectTypes,
}: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState(projectTypes[0].name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const selectedType = projectTypes.find((t) => t.name === type);
      if (!selectedType) {
        setType(projectTypes[0].name || "Other");
        console.error("Selected project type not found");
        return;
      }

      onConfirm(name, selectedType);
      setName("");
      setType(projectTypes[0].name || "Other");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Project Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.length > 0 ? (
                    projectTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="Other">Other</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
