"use client";

import { useState } from "react";
import CompanyRegistrationForm from "@/components/UI_Components/Bighil Components/bighil dashboard components/CompanyRegistrationForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Bighil_Client_Dialog = ({
  currentClients,
  setOpen,
  open,
  selectedClient,
  setCurrentClients,
  setSelectedClient,
}) => {
  // Function to handle dialog close and reset selectedClient
  const handleDialogClose = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedClient(null); // Reset selected client when closing the dialog
    }
  };

  return (
    <div>
      {/* Header with Button */}
      <div className="flex justify-end items-end mb-4 h-full">
        <Dialog
          open={open}
          onOpenChange={handleDialogClose}
          className="max-w-3xl"
        >
          <DialogTrigger asChild>
            <Button className="absolute top-4 right-10">Add Client</Button>
          </DialogTrigger>
          <DialogContent
            className="bg-white w-full h-screen max-w-4xl"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>
                {selectedClient ? "Edit Client" : "Register New Client"}
              </DialogTitle>
            </DialogHeader>
            <CompanyRegistrationForm
              setOpen={setOpen}
              selectedClient={selectedClient}
              currentClients={currentClients}
              setCurrentClients={setCurrentClients}
              setSelectedClient={setSelectedClient}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Bighil_Client_Dialog;
