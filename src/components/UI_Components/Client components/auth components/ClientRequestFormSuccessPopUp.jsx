"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
// If using Next.js routing
import { useRouter } from "next/navigation";

const ClientRequestFormSuccessPopUp = ({ showPopUp, onClose }) => {
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (showPopUp) {
      setCountdown(10); // Reset countdown when popup opens

      const redirectMessageTimer = setTimeout(() => {
        setShowRedirectMessage(true);
      }, 1000); // show message after 1 seconds

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            onClose();
            router.push("/"); // redirect to homepage
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // update every second

      return () => {
        clearTimeout(redirectMessageTimer);
        clearInterval(countdownInterval);
      };
    }
  }, [showPopUp, onClose, router]);

  return (
    <Dialog
      open={showPopUp}
      onOpenChange={(open) => {
        if (!open) onClose(); // close manually
      }}
    >
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

        {showRedirectMessage && (
          <p className="mt-2 text-xs text-text_color ">
            Redirecting to homepage in {countdown} seconds...
          </p>
        )}

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
