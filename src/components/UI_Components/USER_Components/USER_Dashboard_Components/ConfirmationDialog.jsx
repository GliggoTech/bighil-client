"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, XCircle, Loader } from "lucide-react";

function ConfirmationDialog({
  open = false,
  onOpenChange,
  onConfirm,
  loading = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl bg-white dark:bg-background">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 dark:text-amber-400" />
            <DialogTitle className="text-left text-foreground dark:text-foreground">
              Security Reminder
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogDescription
          className="space-y-4 text-left text-muted-foreground dark:text-muted-foreground"
          asChild
        >
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red dark:text-red flex-shrink-0" />
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
              <CheckCircle2 className="w-5 h-5 text-green dark:text-green flex-shrink-0" />
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
            className="border-red/20 bg-red dark:border-red/50 text-white dark:text-gray-300 hover:bg-red/80 dark:hover:bg-gray-800 font-light"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-primary font-light hover:bg-green/90 dark:bg-green/60 dark:hover:bg-green/70 text-white"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin text-white" />
                Submitting...
              </span>
            ) : (
              "Confirm Submission"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
