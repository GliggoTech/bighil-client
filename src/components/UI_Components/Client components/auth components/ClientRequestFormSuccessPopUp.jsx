"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const ClientRequestFormSuccessPopUp = ({ showPopUp, onClose }) => {
  return (
    <Dialog open={showPopUp} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center bg-white">
        <DialogHeader>
          <CheckCircle2 className="mx-auto h-12 w-12 text-green" />
          <DialogTitle className="mt-4 text-lg font-semibold text-green">
            Request Submitted Successfully
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-text_color">
          Thank you! Our support team will contact you shortly.
        </p>
        <DialogFooter className="mt-6">
          <Button variant="default" className="w-full" onClick={onClose}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientRequestFormSuccessPopUp;
