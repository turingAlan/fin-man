"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface ProjectionFormProps {
  companyName: string | null;
  fileName: string | undefined;
  handleSubmitProjections: (args: {
    assumption: string;
    years: number;
    loanAmount: number;
    tenure: number;
    interest: number;
  }) => void;
}

export function ProjectionForm({
  companyName,
  fileName,
  handleSubmitProjections,
}: ProjectionFormProps) {
  const [assumption, setAssumption] = useState("");
  const [years, setYears] = useState([3]);
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interest, setInterest] = useState("");

  // Validate integer input
  const handleIntegerInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitProjections({
      assumption,
      years: years[0],
      loanAmount: parseInt(loanAmount),
      tenure: parseInt(tenure),
      interest: parseInt(interest),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 mb-6">
        <p className="text-gray-600">
          {companyName
            ? `Create financial projections for ${companyName}`
            : fileName
            ? `Create financial projections based on ${fileName}`
            : "Create financial projections"}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="assumption">Assumptions</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon size={16} className="text-gray-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Describe any assumptions you're making for your financial
                    projections, such as market conditions, growth rates, or
                    business changes.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="assumption"
            placeholder="Enter your assumptions for the financial projections..."
            value={assumption}
            onChange={(e) => setAssumption(e.target.value)}
            className="min-h-[100px] border-gray-300 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label>Projection Years: {years[0]}</Label>
          <Slider
            defaultValue={[3]}
            max={5}
            min={1}
            step={1}
            value={years}
            onValueChange={setYears}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 Year</span>
            <span>5 Years</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loan-amount">Loan Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <Input
              id="loan-amount"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => handleIntegerInput(e, setLoanAmount)}
              className="pl-8 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenure">Tenure (months)</Label>
          <Input
            id="tenure"
            placeholder="Enter loan tenure in months"
            value={tenure}
            onChange={(e) => handleIntegerInput(e, setTenure)}
            className="border-gray-300 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest">Interest Rate (%)</Label>
          <div className="relative">
            <Input
              id="interest"
              placeholder="Enter interest rate"
              value={interest}
              onChange={(e) => handleIntegerInput(e, setInterest)}
              className="border-gray-300 focus-visible:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-300 flex justify-end">
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600"
          disabled={!assumption || !loanAmount || !tenure || !interest}
        >
          Generate Projections
        </Button>
      </div>
    </form>
  );
}
