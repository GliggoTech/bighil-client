"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import CompanyInformationStep from "./CompanyInformationStep";
import AdminAccountsStep from "./AdminAccountsStep";
import { clientAdminSchema } from "@/utils/adminsConstants";
import ReviewStep from "./ReviewStep";
import { MdOutlineCancel } from "react-icons/md";
export default function CompanyRegistrationForm({
  setOpen,
  selectedClient,
  currentClients,
  setCurrentClients,
  setSelectedClient,
  viewMode,
  setViewMode,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [assignedRoles, setAssignedRoles] = useState({
    "SUPER ADMIN": false,
    ADMIN: false,
    "SUB ADMIN": false,
  });

  const form = useForm({
    resolver: zodResolver(clientAdminSchema),
    defaultValues: selectedClient || {
      companyName: "",
      contactNumber: "+",
      admins: [{ name: "", email: "", role: "SUPER ADMIN" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "admins",
  });

  const { token } = useAccessToken();
  const { loading, error, fetchData } = useFetch();

  const admins = form.watch("admins");

  useEffect(() => {
    const roles = {
      "SUPER ADMIN": false,
      ADMIN: false,
      "SUB ADMIN": false,
    };

    admins.forEach((admin) => {
      if (admin.role) {
        roles[admin.role] = true;
      }
    });

    setAssignedRoles(roles);
  }, [JSON.stringify(admins)]);

  const goToNextStep = async () => {
    let canProceed = true;

    if (currentStep === 1) {
      canProceed = await form.trigger(["companyName", "contactNumber"], {
        shouldFocus: true,
      });
    } else if (currentStep === 2) {
      canProceed = await form.trigger("admins", { shouldFocus: true });
    }

    if (canProceed && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  async function onSubmit(values) {
    const url = getBackendUrl();
    let res;
    if (selectedClient && viewMode == true) {
      setViewMode(false);
      setCurrentStep(1);
      return;
    }

    if (selectedClient && viewMode == false) {
      res = await fetchData(
        `${url}/api/bighil-clients/edit-client/${selectedClient._id}`,
        "PATCH",
        values,
        token,
        false
      );
    } else {
      res = await fetchData(
        `${url}/api/bighil-clients/add-new-client`,
        "POST",
        values,
        token,
        false
      );
    }

    if (res.success) {
      toast({
        variant: "success",

        description: selectedClient
          ? "The company details have been updated successfully."
          : "Your company has been registered successfully.",
        duration: 5000,
      });

      setOpen(false);

      if (selectedClient) {
        const updatedClients = currentClients.map((client) =>
          client._id === selectedClient._id ? res.data : client
        );
        setCurrentClients(updatedClients);
        setSelectedClient(null);
      } else {
        setCurrentClients([...currentClients, res.data]);
        setSelectedClient(null);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description:
          res.message || "An error occurred while processing the request.",
        duration: 5000,
      });
    }
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center w-full max-w-xs">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex-1 relative">
            <div
              className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full transition-all duration-200 ${
                currentStep === step
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : currentStep > step
                  ? "bg-primary/20 text-primary"
                  : "bg-gray-200 text-gray-500 dark:bg-texttext-text_color"
              }`}
            >
              {currentStep > step ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            <div className="text-xs mt-2 text-center font-medium">
              {step === 1 ? "Company" : step === 2 ? "Admins" : "Review"}
            </div>

            {step < 3 && (
              <div
                className={`absolute top-5 left-full w-full h-0.5 -translate-y-1/2 ${
                  currentStep > step
                    ? "bg-primary"
                    : "bg-gray-200 dark:bg-text_color"
                }`}
                style={{ width: "calc(100% - 4.5rem)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Card className="border-0 shadow-none">
        <CardContent className="p-8 pt-6 bg-white dark:bg-gray-900">
          <StepIndicator />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="">
                {currentStep === 1 && (
                  <CompanyInformationStep
                    form={form}
                    key="company"
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                )}
                {currentStep === 2 && (
                  <AdminAccountsStep
                    form={form}
                    assignedRoles={assignedRoles}
                    fields={fields}
                    append={append}
                    remove={remove}
                    key="admins"
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                )}
                {currentStep === 3 && (
                  <ReviewStep
                    formValues={form.watch()}
                    setCurrentStep={setCurrentStep}
                    key="review"
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                )}
              </div>

              {error && (
                <div className="mt-2 mb-2">
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red rounded-lg p-4 text-center border border-red-200 dark:border-red-800">
                    {error}
                  </div>
                </div>
              )}

              <CardFooter className="flex justify-between items-center  pt-2 pb-2 px-0  mt-4">
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="border-dialog_inside_border_color text-text_color bg-back_bg/50 hover:bg-back_bg dark:border-gray-600 dark:text-gray-300 dark:hover:bg-texttext-text_color"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      <span className="hidden sm:block">Back</span>
                    </Button>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedClient(null);
                      setOpen(false);
                      setViewMode(false);
                    }}
                    className="border-dialog_inside_border_color text-white bg-red hover:bg-red/80 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-texttext-text_color"
                  >
                    <MdOutlineCancel className="mr-2 h-4 w-4 text-white" />
                    <span className="hidden sm:block">Cancel</span>
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={goToNextStep}
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-md hover:shadow-primary/30 transition-all"
                    >
                      <span className="hidden sm:block">Next</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      disabled={loading}
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      className="bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-white shadow-md hover:shadow-primary/30 transition-all relative overflow-hidden"
                    >
                      {loading && (
                        <span className="absolute inset-0 bg-primary/20" />
                      )}
                      <span className="relative z-10 flex items-center">
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {selectedClient ? "Updating..." : "Registering..."}
                          </>
                        ) : selectedClient && viewMode ? (
                          "Edit"
                        ) : selectedClient && !viewMode ? (
                          "Update Company"
                        ) : (
                          "Register Company"
                        )}
                      </span>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
