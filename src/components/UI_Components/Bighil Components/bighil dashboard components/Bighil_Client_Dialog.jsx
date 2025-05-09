"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CompanyRegistrationForm from "./CompanyRegistrationForm";

// Dialog component that will contain our multi-step form
const Bighil_Client_Dialog = ({
  currentClients,
  setOpen,
  open,
  selectedClient,
  setCurrentClients,
  setSelectedClient,
  viewMode = false,
  setViewMode,
}) => {
  const handleDialogClose = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedClient(null);
      setViewMode(false);
    }
  };

  return (
    <div className="relative">
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          {!viewMode && (
            <Button
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/80 text-white font-light shadow-lg hover:shadow-primary/30 transition-all"
              size="lg"
            >
              {selectedClient ? "Edit Client" : "Add New Client"}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="max-w-4xl p-0 rounded-lg overflow-hidden border-0 shadow-xl"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">Add New Client</DialogTitle>
          <DialogDescription className="sr-only">
            Add a new client to your Bighil account.
          </DialogDescription>
          <div className="max-h-[90vh] overflow-auto">
            <CompanyRegistrationForm
              setOpen={setOpen}
              selectedClient={selectedClient}
              currentClients={currentClients}
              setCurrentClients={setCurrentClients}
              setSelectedClient={setSelectedClient}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bighil_Client_Dialog;
