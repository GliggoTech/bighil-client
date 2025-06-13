"use client";
import { useState } from "react";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { X } from "lucide-react";
import { officeDepartments } from "@/lib/complaintSchema";

export function DepartmentSelector({ form }) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="department"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-text_color">
            Department to Raise Complaint Against{" "}
            <span className="text-red">*</span>
          </FormLabel>
          <div className="flex flex-wrap gap-2 sm:gap-3 relative">
            {field.value?.map((dep) => (
              <Badge
                key={dep}
                className="bg-primary/20 hover:bg-primary/30 text-text_color font-normal text-xs sm:text-sm py-1 px-2"
              >
                {officeDepartments.find((d) => d.value === dep)?.label || dep}
                <button
                  type="button"
                  onClick={() =>
                    field.onChange(field.value.filter((d) => d !== dep))
                  }
                  className="ml-1 sm:ml-2 hover:text-red"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-red rounded-full bg-red/30 p-0.5 sm:p-1" />
                </button>
              </Badge>
            ))}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-primary sm:text-sm h-7 sm:h-8 border-none bg-white"
                >
                  + Add Department
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-[240px] sm:w-[650px] border border-gray-300 shadow-xl rounded-lg bg-gray-200"
                align="start"
              >
                <Command>
                  <CommandInput
                    placeholder="Search departments..."
                    className="text-sm sm:text-base h-8 w-full pl-4 bg-white text-text_color placeholder:text-text_color/60 focus:ring-0 focus:border-primary/5"
                  />
                  <CommandList className="max-h-[200px] sm:max-h-[300px] overflow-y-auto">
                    <CommandGroup
                      heading="Departments"
                      className="bg-gray-100 text-text_color divide-y divide-gray-300"
                    >
                      {officeDepartments
                        .filter((d) => !field.value?.includes(d.value))
                        .map((d) => (
                          <CommandItem
                            key={d.value}
                            value={d.value}
                            onSelect={() => {
                              const selected = field.value || [];
                              field.onChange([...selected, d.value]);
                              setOpen(false);
                            }}
                            className="text-xs sm:text-sm py-2 px-3 hover:bg-gray-300 cursor-pointer"
                          >
                            {d.label}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </FormItem>
      )}
    />
  );
}
