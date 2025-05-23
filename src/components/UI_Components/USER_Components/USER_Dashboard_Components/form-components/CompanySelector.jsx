"use client";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export function CompanySelector({
  form,
  companies,
  loading,
  searchQuery,
  setSearchQuery,
  fetchCompanies,
  showLable=true,
  formFieldname="companyName",
}) {
  const [openCompany, setOpenCompany] = useState(false);

  return (
    <FormField
      control={form.control}
      name={formFieldname}
      render={({ field }) => (
        <FormItem className="space-y-2 sm:space-y-3">
          {showLable && (
            <FormLabel className="text-sm font-medium text-text_color hover:text-white">
              Select Company
            </FormLabel>
          )}
          <Popover open={openCompany} onOpenChange={setOpenCompany}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                aria-expanded={openCompany}
                className="w-full justify-between px-3 sm:px-4 py-2 sm:py-3 h-auto text-sm sm:text-base font-light hover:bg-primary/50  border-primary/5 transition-colors"
              >
                <span className="text-text_color truncate">
                  {field.value || "Select company..."}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-primary/80 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0  border-primary/10 border shadow-xl rounded-lg bg-gray-200 w-[calc(100vw-5.5rem)] sm:w-auto max-w-[730px]"
              align="start"
              side="bottom"
            >
              <Command shouldFilter={false} className="w-full">
                <CommandInput
                  placeholder="Search companies..."
                  value={searchQuery}
                  onValueChange={(value) => {
                    setSearchQuery(value);
                    if (!value) fetchCompanies();
                  }}
                  className="w-screen px-3 text-sm sm:text-base rounded-none h-8 text-text_color placeholder:text-sm bg-white focus:outline-none focus:ring-0 focus:border-0 border-0 focus:shadow-none"
                  style={{ outline: "none", boxShadow: "none" }}
                />
                <CommandList className="w-full max-h-[40vh] sm:max-h-[400px] overflow-y-auto">
                  <CommandEmpty className="py-4 sm:py-6 text-center text-text_color w-full">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader className="animate-spin h-4 w-4" />
                        Searching...
                      </span>
                    ) : (
                      `No companies found "\${searchQuery}"`
                    )}
                  </CommandEmpty>

                  <CommandGroup className="bg-white text-text_color divide-y divide-primary w-full">
                    {companies.map((company) => (
                      <CommandItem
                        key={company._id}
                        value={company.companyName}
                        onSelect={() => {
                          field.onChange(company.companyName);
                          setOpenCompany(false);
                          setSearchQuery("");
                        }}
                        className="text-sm font-light px-3 sm:px-4 py-2 sm:py-3 hover:bg-primary/10 text-text_color cursor-pointer flex items-center focus:outline-none w-full"
                        aria-selected={field.value === company.companyName}
                      >
                        <Check
                          className={cn(
                            "mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-primary transition-opacity",
                            field.value === company.companyName
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex-1">
                          <span className="block text-xs sm:text-sm font-medium">
                            {company.companyName}
                          </span>
                          {company.industry && (
                            <span className="block text-xs text-text_color/60 mt-0.5 sm:mt-1">
                              {company.industry}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage className="text-xs text-red" />
        </FormItem>
      )}
    />
  );
  ``;
}
