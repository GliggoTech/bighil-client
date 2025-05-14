"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import { formSchema } from "@/lib/complaintSchema";

// Component Imports
import { CompanySelector } from "./form-components/CompanySelector";
import { ComplaintFields } from "./form-components/ComplaintFields";
import { TagSelector } from "./form-components/TagSelector";
import { FileUploader } from "./form-components/FileUploader";
import ConfirmationDialog from "./ConfirmationDialog";

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

  const [localFiles, setLocalFiles] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = useAccessToken();
  const { loading, fetchData } = useFetch();

  const fetchCompanies = useCallback(
    async (query = "") => {
      try {
        const url = getBackendUrl();
        const res = await fetchData(
          `${url}/api/companies?search=${encodeURIComponent(query)}`,
          "GET",
          {},
          token,
          false
        );

        if (res.success) {
          setCompanies(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      }
    },
    [fetchData, token]
  );

  useEffect(() => {
    if (token) {
      const debounceTimer = setTimeout(() => {
        fetchCompanies(searchQuery);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchQuery, token, fetchCompanies]);

  useEffect(() => {
    if (token) {
      fetchCompanies();
    }
  }, [token, fetchCompanies]);

  const removeFile = (index) => {
    const newFiles = localFiles.filter((_, i) => i !== index);
    setLocalFiles(newFiles);
    form.setValue("files", newFiles);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setLocalFiles((prev) => [...prev, ...files]);
    form.setValue("files", [...(form.getValues("files") || []), ...files]);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append("companyName", values.companyName);
    formData.append("complaintAgainst", values.complaintAgainst);
    formData.append("complaintMessage", values.complaintMessage);
    formData.append("tags", values.tags);

    values.files?.forEach((file) => {
      formData.append("files", file, file.name.replace(/[^a-z0-9_.-]/gi, "_"));
    });

    const url = getBackendUrl();
    const res = await fetchData(
      `${url}/api/user-complaints/user-add-complaint`,
      "POST",
      formData,
      token,
      true
    );

    if (res.success) {
      form.reset();
      setLocalFiles([]);
    }
  };

  const handleConfirmationSubmit = async () => {
    await form.handleSubmit(onSubmit)();
    setShowConfirmation(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-3 sm:p-5 bg-white text-black rounded-lg sm:rounded-3xl shadow-lg sm:shadow-2xl overflow-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-primary to-success bg-clip-text text-transparent mb-4">
        File a Complaint
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Component 1: Company Selector */}
          <CompanySelector
            form={form}
            companies={companies}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fetchCompanies={fetchCompanies}
          />

          {/* Component 2: Basic Complaint Fields */}
          <ComplaintFields form={form} />

          {/* Component 3: Tag Selector */}
          <TagSelector form={form} />

          {/* Component 4: File Uploader */}
          <FileUploader
            handleFileUpload={handleFileUpload}
            localFiles={localFiles}
            removeFile={removeFile}
          />

          <ConfirmationDialog
            open={showConfirmation}
            onOpenChange={setShowConfirmation}
            onConfirm={handleConfirmationSubmit}
            loading={loading}
          />

          <Button
            type="button"
            className="w-full bg-primary hover:bg-primary/90 py-2.5 sm:py-3 text-white"
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
