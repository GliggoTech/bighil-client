"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import {
  X,
  UploadCloud,
  Tag,
  Check,
  ChevronsUpDown,
  FileText,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";

import priorityMapping from "@/lib/tags";
import { ConfirmationDialog } from "./ConfirmationDialog";

import useAccessToken from "@/custom hooks/useAccessToken";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

const formSchema = z.object({
  companyName: z.string().min(1, "Company selection required"),
  complaintAgainst: z.string().min(1, "Complaint title is required"),
  complaintMessage: z
    .string()
    .min(2, "Description must be at least 20 characters"),
  tags: z.array(z.string()).optional(),
  files: z.array(z.instanceof(File)).optional(),
});

export function ComplaintForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      complaintAgainst: "",
      complaintMessage: "",
      tags: [],
      files: [],
    },
  });
  const [openCompany, setOpenCompany] = useState(false);
  const [openTags, setOpenTags] = useState(false);
  const [localFiles, setLocalFiles] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // 1. Add state for companies
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = useAccessToken();

  const { loading, error, fetchData } = useFetch();

  const fetchCompanies = useCallback(
    async (query = "") => {
      try {
        const response = await fetchServerSideData(
          `/api/companies?search=${encodeURIComponent(query)}`,
          {
            method: "GET",
            cache: "no-cache",
          }
        );

        setCompanies(response);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
        // Consider adding error state feedback
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCompanies(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    fetchCompanies(); // Load initial companies on mount
  }, []);

  const removeFile = (index) => {
    const newFiles = localFiles.filter((_, i) => i !== index);
    setLocalFiles(newFiles);
    form.setValue("files", newFiles);
  };

  //   Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setLocalFiles((prev) => [...prev, ...files]);
    form.setValue("files", [...(form.getValues("files") || []), ...files]);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();

    // Append text fields
    formData.append("companyName", values.companyName);
    formData.append("complaintAgainst", values.complaintAgainst);
    formData.append("complaintMessage", values.complaintMessage); // Fallback for empty

    // Append tags as JSON array
    formData.append("tags", values.tags);

    // Append files with proper field name
    values.files?.forEach((file) => {
      formData.append("files", file, file.name.replace(/[^a-z0-9_.-]/gi, "_")); // Sanitize filename
    });

    const url = getBackendUrl();

    const res = await fetchData(
      `${url}/api/user-complaints/user-add-complaint`,
      "POST",
      formData, // Send FormData directly
      token,
      true // media flag for multipart/form-data
    );
    if (res.success) {
      form.reset();
      setLocalFiles([]);

      return;
    }
  };
  const handleConfirmationSubmit = async () => {
    await form.handleSubmit(onSubmit)();
    setShowConfirmation(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white text-black rounded-3xl shadow-2xl mt-6 overflow-auto">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-12">
        Submit a Complaint
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Company Selection */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium text-black">
                  Select Company
                </FormLabel>
                <Popover open={openCompany} onOpenChange={setOpenCompany}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCompany}
                      className="w-full justify-between px-4 py-3 h-auto text-base hover:bg-gray-200/50 border-2 border-primary/30 hover:border-primary/50 transition-colors"
                    >
                      <span className="text-black truncate">
                        {field.value || "Select company..."}
                      </span>
                      <ChevronsUpDown className="ml-2 h-5 w-5 text-primary/80 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0 border-2 border-primary/20 shadow-xl rounded-lg bg-gray-200"
                    align="start"
                    side="bottom"
                  >
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder="Search companies..."
                        value={searchQuery}
                        onValueChange={(value) => {
                          setSearchQuery(value);
                          if (!value) fetchCompanies(); // Load initial list when clearing
                        }}
                        className="text-base h-12 text-black placeholder:text-black/60 focus:ring-0"
                      />
                      <CommandList className="max-h-[300px] overflow-y-auto">
                        <CommandEmpty className="py-6 text-center text-black/70">
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader className="animate-spin h-4 w-4" />
                              Searching...
                            </span>
                          ) : (
                            `No companies found "${searchQuery}"`
                          )}
                        </CommandEmpty>

                        <CommandGroup
                          heading={`${companies.length} COMPANIES FOUND`}
                          className="bg-gray-100 text-black divide-y divide-gray-300"
                        >
                          {companies.map((company) => (
                            <CommandItem
                              key={company._id}
                              value={company.companyName}
                              onSelect={() => {
                                field.onChange(company.companyName);
                                setOpenCompany(false);
                                setSearchQuery(""); // Reset search on selection
                              }}
                              className="text-base px-4 py-3 hover:bg-gray-300/50 aria-selected:bg-gray-300 text-black cursor-pointer flex items-center"
                              aria-selected={
                                field.value === company.companyName
                              }
                            >
                              <Check
                                className={cn(
                                  "mr-3 h-5 w-5 text-primary transition-opacity",
                                  field.value === company.companyName
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <div className="flex-1">
                                <span className="block text-sm font-medium">
                                  {company.companyName}
                                </span>
                                {company.industry && (
                                  <span className="block text-xs text-black/60 mt-1">
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
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Complaint Title */}
          <FormField
            control={form.control}
            name="complaintAgainst"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Complaint Against</FormLabel>
                <Input
                  {...field}
                  placeholder="Enter complaint title..."
                  className="h-12 border-primary"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Complaint Details */}
          <FormField
            control={form.control}
            name="complaintMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Description</FormLabel>
                <Textarea
                  {...field}
                  placeholder="Describe your complaint in detail..."
                  className="min-h-[200px] border-primary"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags Selection */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Complaint Tags</FormLabel>
                <div className="flex flex-wrap gap-3 relative">
                  {field.value?.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-blue-500 text-white font-normal"
                    >
                      {priorityMapping.find((t) => t.name == tag).name}
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(field.value.filter((t) => t !== tag))
                        }
                      >
                        <X className="ml-2 " />
                      </button>
                    </Badge>
                  ))}
                  <Popover open={openTags} onOpenChange={setOpenTags}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">+ Add Tag</Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 w-full border-2 border-primary/20 shadow-xl rounded-lg bg-gray-200"
                      align="start"
                    >
                      <Command className="">
                        <CommandInput
                          placeholder="Search tags..."
                          className="text-base h-8 w-full     text-black placeholder:text-black focus:ring-0 focus:border-primary/50"
                        />
                        <CommandList className="max-h-[400px]  bg-gray-400 absolute top-10">
                          <CommandGroup
                            heading="TAGS"
                            className="bg-gray-100 w-64 text-black divide-y divide-gray-800"
                          >
                            {priorityMapping
                              .filter((tag) => !field.value?.includes(tag.name))
                              .map((tag) => (
                                <CommandItem
                                  className="hover:bg-gray-300 text-nowrap text-black cursor-pointer"
                                  key={tag.name}
                                  value={tag.name}
                                  onSelect={() => {
                                    const currentTags = field.value || [];

                                    field.onChange([...currentTags, tag.name]);

                                    setOpenTags(false);
                                  }}
                                >
                                  {tag.name}
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
          <div>
            <FormLabel>Upload Evidence</FormLabel>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="block w-full border border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500"
            >
              <UploadCloud className="mx-auto text-blue-500" />
              <p>Click or drag files to upload</p>
            </label>

            {localFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {localFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="text-blue-500" />
                      <span>{file.name}</span>
                    </div>
                    <button onClick={() => removeFile(index)}>
                      <X className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ConfirmationDialog
            open={showConfirmation}
            onOpenChange={setShowConfirmation}
            onConfirm={handleConfirmationSubmit}
            loading={loading}
          />
          <Button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() =>
              form.trigger().then((valid) => valid && setShowConfirmation(true))
            }
          >
            Submit Complaint
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ComplaintForm;
