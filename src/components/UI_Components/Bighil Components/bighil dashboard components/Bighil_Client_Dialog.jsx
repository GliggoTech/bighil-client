"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CompanyRegistrationForm from "./CompanyRegistrationForm";

const Bighil_Client_Dialog = ({
  currentClients,
  setOpen,
  open,
  selectedClient,
  setCurrentClients,
  setSelectedClient,
}) => {
  const handleDialogClose = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedClient(null);
    }
  };

  return (
    <div className="relative">
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <Button
            className="absolute  md:-top-60 lg:-top-[255px] -top-[540px] right-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-primary/30 transition-all"
            size="lg"
          >
            {selectedClient ? "Edit Client" : "Add New Client"}
          </Button>
        </DialogTrigger>
        <DialogHeader className="sr-only">
          <DialogTitle className="text-center text-lg font-bold">
            {selectedClient ? "Edit Client" : "Add New Client"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedClient
              ? "Edit client details"
              : "Add new client to your list"}
          </DialogDescription>
        </DialogHeader>
        <DialogContent
          className="max-w-4xl p-0 rounded-lg overflow-hidden border-0 shadow-xl"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="max-h-[90vh] overflow-auto">
            <CompanyRegistrationForm
              setOpen={setOpen}
              selectedClient={selectedClient}
              currentClients={currentClients}
              setCurrentClients={setCurrentClients}
              setSelectedClient={setSelectedClient}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bighil_Client_Dialog;
