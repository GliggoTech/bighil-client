"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import { formSchema } from "@/lib/complaintSchema";

// Component Imports
import { CompanySelector } from "./form-components/CompanySelector";
import { ComplaintFields } from "./form-components/ComplaintFields";
import { TagSelector } from "./form-components/TagSelector";
import { FileUploader } from "./form-components/FileUploader";
import ConfirmationDialog from "./ConfirmationDialog";
import { toast } from "@/hooks/use-toast";
import ComplaintTypeSelector from "./form-components/ComplaintTypeSelector";
import { useGenericQuery } from "@/provider/useGenericQuery";
import { useGenericMutation } from "@/provider/useGenericMutation";

export function ComplaintForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      submissionType: "",
      complaintMessage: "",
      department: "",
      complaintType: undefined,
      tags: [],
      files: [],
    },
  });

  const [localFiles, setLocalFiles] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useAccessToken();
  const url = getBackendUrl();

  // Companies query
  const searchCompaniesUrl = `${url}/api/companies?search=${encodeURIComponent(
    searchQuery
  )}`;
  const {
    data: companiesData,
    isLoading: companiesLoading,
    error: companiesError,
  } = useGenericQuery("companies", searchCompaniesUrl, token, {
    enabled: !!token,
  });

  // Extract companies from the response
  const companies = companiesData?.data || [];

  // Complaint submission mutation
  const complaintMutation = useGenericMutation("POST", {
    onSuccess: (data, variables) => {
      toast({
        title: "Complaint Submitted",
        variant: "success",
        description: "Your complaint has been submitted successfully.",
      });

      // Clear files and reset form
      setLocalFiles([]);
      form.reset({
        companyName: "",
        submissionType: "",
        complaintMessage: "",
        tags: [],
        department: "",
        complaintType: undefined,
        files: [],
      });

      // Close confirmation dialog
      setShowConfirmation(false);
    },
    onError: (error, variables) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
      setShowConfirmation(false);
    },
   
    invalidateQueries: [["user-complaints"], ["companies"]],
  });

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
    formData.append("submissionType", values.submissionType);
    formData.append("complaintMessage", values.complaintMessage);
    formData.append("tags", values.tags);
    formData.append("department", values.department);
    formData.append("complaintType", values.complaintType);

    values.files?.forEach((file) => {
      formData.append("files", file, file.name.replace(/[^a-z0-9_.-]/gi, "_"));
    });

    // Use the mutation instead of fetchData
    complaintMutation.mutate({
      url: `${url}/api/user-complaints/user-add-complaint`,
      body: formData,
      token: token,
      isMedia: true, // Important for FormData
    });
  };

  const handleConfirmationSubmit = async () => {
    // Validate form before submitting
    const isValid = await form.trigger();
    if (isValid) {
      const values = form.getValues();
      onSubmit(values);
    }
  };

  // Combine loading states
  const isLoading = complaintMutation.isPending || companiesLoading;

  return (
    <div className="max-w-3xl mx-auto p-3 sm:p-5 bg-white text-black rounded-lg sm:rounded-3xl shadow-lg sm:shadow-2xl overflow-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-primary to-success bg-clip-text text-transparent mb-4">
        File a Complaint
      </h1>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.trigger().then((valid) => valid && setShowConfirmation(true));
          }}
          className="space-y-4"
        >
          {/* Component 1: Company Selector */}
          <CompanySelector
            form={form}
            companies={companies}
            loading={companiesLoading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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

          <ComplaintTypeSelector form={form} />

          <ConfirmationDialog
            open={showConfirmation}
            onOpenChange={setShowConfirmation}
            onConfirm={handleConfirmationSubmit}
            loading={isLoading}
          />

          {/* Display form-level errors */}
          <FormMessage className="text-red/50" />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 py-2.5 sm:py-3 text-white disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              "Submit Complaint"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ComplaintForm;
