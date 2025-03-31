"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, Building, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";

interface Company {
  name: string;
  ticker: string;
  sector: string;
}

interface CompanySearchProps {
  onSelect: (company: string) => void;
}

export function CompanySearch({ onSelect }: CompanySearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isKeyboardNavActive, setIsKeyboardNavActive] = useState(false);

  useEffect(() => {
    fetch("/company-list.json")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        setFilteredCompanies(data);
      })
      .catch((error) => console.error("Error fetching company list:", error));
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredCompanies(
        companies.filter(
          (company) =>
            company.name.toLowerCase().includes(search.toLowerCase()) ||
            company.ticker.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredCompanies(companies);
    }
  }, [search, companies]);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useVirtualizer({
    count: filteredCompanies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // Approximate row height
    overscan: 100,
  });

  const virtualRows = virtualizer
    .getVirtualItems()
    .filter((virtualRow) => virtualRow.index < filteredCompanies.length);

  const scrollToIndex = (index: number) => {
    virtualizer.scrollToIndex(index, { align: "center" });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex = Math.min(prev + 1, filteredCompanies.length - 1);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      case "ArrowUp":
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex = Math.max(prev - 1, 0);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      case "Enter":
        event.preventDefault();
        if (filteredCompanies[focusedIndex]) {
          onSelect(filteredCompanies[focusedIndex].name);
          setOpen(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Search for a publicly listed company by name or ticker symbol.
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {search || "Search for a company..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[400px]" align="start">
          <Command shouldFilter={false} onKeyDown={handleKeyDown}>
            <CommandInput
              placeholder="Search companies..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList
              ref={parentRef}
              style={{ height: "400px", overflow: "auto" }}
              onMouseDown={() => setIsKeyboardNavActive(false)}
              onMouseMove={() => setIsKeyboardNavActive(false)}
            >
              <CommandEmpty>No companies found.</CommandEmpty>
              <CommandGroup>
                <div
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    position: "relative",
                  }}
                >
                  {virtualRows.map((virtualRow) => {
                    const company = filteredCompanies[virtualRow.index];
                    return (
                      <CommandItem
                        key={company.ticker}
                        disabled={isKeyboardNavActive}
                        className={cn(
                          "absolute left-0 top-0 w-full",
                          focusedIndex === virtualRow.index &&
                            "bg-accent text-accent-foreground",
                          isKeyboardNavActive &&
                            focusedIndex !== virtualRow.index &&
                            "aria-selected:bg-transparent aria-selected:text-primary"
                        )}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                        onSelect={() => {
                          onSelect(company.name);
                          setOpen(false);
                        }}
                        onMouseEnter={() =>
                          !isKeyboardNavActive &&
                          setFocusedIndex(virtualRow.index)
                        }
                        onMouseLeave={() =>
                          !isKeyboardNavActive && setFocusedIndex(-1)
                        }
                      >
                        <Building size={16} className="text-gray-500" />
                        <div className="flex flex-col">
                          <span>{company.name}</span>
                          <span className="text-xs text-gray-500">
                            {company.ticker} • {company.sector}
                          </span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
