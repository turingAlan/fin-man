"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building } from "lucide-react";
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

interface CompanySearchProps {
  onSelect: (company: string) => void;
}

const COMPANIES = [
  { name: "Apple Inc.", ticker: "AAPL", sector: "Technology" },
  { name: "Microsoft Corporation", ticker: "MSFT", sector: "Technology" },
  { name: "Amazon.com Inc.", ticker: "AMZN", sector: "Consumer Cyclical" },
  { name: "Alphabet Inc.", ticker: "GOOGL", sector: "Communication Services" },
  {
    name: "Meta Platforms Inc.",
    ticker: "META",
    sector: "Communication Services",
  },
  { name: "Tesla Inc.", ticker: "TSLA", sector: "Automotive" },
  { name: "NVIDIA Corporation", ticker: "NVDA", sector: "Technology" },
  { name: "JPMorgan Chase & Co.", ticker: "JPM", sector: "Financial Services" },
  { name: "Johnson & Johnson", ticker: "JNJ", sector: "Healthcare" },
  { name: "Visa Inc.", ticker: "V", sector: "Financial Services" },
];

export function CompanySearch({ onSelect }: CompanySearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(COMPANIES);

  useEffect(() => {
    if (search) {
      const filtered = COMPANIES.filter(
        (company) =>
          company.name.toLowerCase().includes(search.toLowerCase()) ||
          company.ticker.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies(COMPANIES);
    }
  }, [search]);

  const handleSelect = (company: string) => {
    onSelect(company);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Search for a publicly listed company by name or ticker symbol.
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <Input
              placeholder="Search for a company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-gray-200 focus-visible:ring-blue-600"
              onClick={() => setOpen(true)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[400px]" align="start">
          <Command>
            <CommandInput
              placeholder="Search companies..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No companies found.</CommandEmpty>
              <CommandGroup>
                {filteredCompanies.map((company) => (
                  <CommandItem
                    key={company.ticker}
                    onSelect={() => handleSelect(company.name)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Building size={16} className="text-gray-500" />
                    <div className="flex flex-col">
                      <span>{company.name}</span>
                      <span className="text-xs text-gray-500">
                        {company.ticker} • {company.sector}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex justify-end">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!search}
          onClick={() => {
            if (filteredCompanies.length > 0) {
              handleSelect(filteredCompanies[0].name);
            }
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
