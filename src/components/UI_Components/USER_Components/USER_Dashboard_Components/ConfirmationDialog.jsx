// components/SubmissionConfirmation.jsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
            <DialogTitle className="text-left">Security Reminder</DialogTitle>
          </div>
        </DialogHeader>

        <DialogDescription className="space-y-4 text-left" asChild>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />

              <div>
                <div>Do NOT include:</div>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Personal identification numbers</li>
                  <li>Credit card details</li>
                  <li>Passwords or security codes</li>
                  <li>Bank account information</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <div>Safe to include:</div>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Order/reference numbers</li>
                  <li>Communication dates</li>
                  <li>General service issues</li>
                  <li>Non-sensitive transaction IDs</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogDescription>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Submitting..." : "Confirm Submission"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
