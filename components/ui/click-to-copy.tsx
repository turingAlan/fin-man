import React, { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clipboard, ClipboardCheck } from "lucide-react";

interface ClickToCopyProps {
  textToCopy: string;
  showIcon?: boolean;
  children: React.ReactNode;
}

const ClickToCopy: React.FC<ClickToCopyProps> = ({
  textToCopy,
  children,
  showIcon = true,
}) => {
  const [copied, setCopied] = useState(false);

  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  useEffect(() => {
    // Cleanup the timer on component unmount
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={handleCopy}
          className="flex items-center cursor-pointer gap-2 p-2 rounded-md hover:bg-gray-100 flex-shrink  transition-colors"
        >
          {children}
          {showIcon && (
            <span>
              {copied ? (
                <ClipboardCheck color="green" size={12} />
              ) : (
                <Clipboard size={12} />
              )}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <span>{copied ? "Copied!" : "Click to copy"}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default ClickToCopy;
