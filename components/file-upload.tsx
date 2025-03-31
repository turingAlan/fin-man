"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { truncateText } from "@/lib/utils";

interface FileUploadProps {
  onUpload: (file: File) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or Excel file");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return false;
    }

    setError(null);
    return true;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        if (validateFile(file)) {
          setSelectedFile(file);
        }
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Upload financial documents for your unlisted company.
      </p>

      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragActive
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 bg-gray-50"
          } transition-colors duration-200`}
        >
          <input
            {...getInputProps()}
            ref={inputRef}
            className="hidden"
            onChange={handleChange}
          />

          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Upload size={24} className="text-blue-600" />
            </div>
            <p className="font-medium">Drag and drop your file here</p>
            <p className="text-sm text-gray-500">or</p>
            <Button
              variant="outline"
              onClick={handleButtonClick}
              className="border-gray-200 hover:bg-gray-100"
            >
              Browse Files
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Supports PDF and Excel files (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <File size={20} className="text-green-500" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {truncateText(selectedFile.name, 20)}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!selectedFile}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
