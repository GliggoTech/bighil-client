"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Star } from "lucide-react";
import { DELETE_REASONS } from "@/utils/deletReasons";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { useRouter } from "next/navigation";
import { getBackendUrl } from "@/lib/getBackendUrl";

export default function DeleteMyAccountForm() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [additionalComments, setAdditionalComments] = useState("");
  const [errors, setErrors] = useState({});
  const { loading, fetchData, error, success } = useFetch();
  const { token } = useAccessToken();
  const router = useRouter();

  const handleReasonChange = (reasonId, checked) => {
    if (checked) {
      setSelectedReasons((prev) => [...prev, reasonId]);
    } else {
      setSelectedReasons((prev) => prev.filter((id) => id !== reasonId));
    }
    // Clear error when user selects at least one reason
    if (errors.reasons && (checked || selectedReasons.length > 1)) {
      setErrors((prev) => ({ ...prev, reasons: null }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (selectedReasons.length === 0) {
      newErrors.reasons = "Please select at least one reason";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowDialog(true);
  };

  const handleConfirmDelete = async () => {
    // Here you would typically make an API call to delete the account
    console.log("Account deletion confirmed:", {
      reasons: selectedReasons,
      comments: additionalComments,
    });
    const res = await fetchData(
      `${getBackendUrl()}/api/delete-account/user-delete-my-account`,
      "DELETE",
      {
        reasons: selectedReasons,
        comments: additionalComments,
      },
      token,
      false
    );
    if (res.success) {
      setShowDialog(false);
      // Reset form
      setSelectedReasons([]);
      setAdditionalComments("");
      router.push("/");
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleKeepAccount = () => {
    // Reset form
    setSelectedReasons([]);
    setAdditionalComments("");
    setErrors({});
  };

  return (
    <div className=" mx-auto p-6 bg-white">
      <Card className="border-red/20 max-w-2xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red" />
            <CardTitle className="text-2xl text-red">
              Delete My Account
            </CardTitle>
          </div>
          <CardDescription className="">
            We're sorry to see you go. Please help us understand why you're
            leaving by selecting your reasons below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Label className=" font-semibold">Reason for leaving</Label>
              {/* <Star className="h-4 w-4 fill-red text-red" /> */}
            </div>

            <div className="space-y-1">
              {DELETE_REASONS.map((reason) => (
                <div
                  key={reason.id}
                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-2 hover:bg-gray/5 transition-colors"
                >
                  <Checkbox
                    id={reason.id}
                    checked={selectedReasons.includes(reason.id)}
                    onCheckedChange={(checked) =>
                      handleReasonChange(reason.id, checked)
                    }
                    className="border border-red shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-red data-[state=checked]:text-white"
                  />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor={reason.id}
                      className="font-medium cursor-pointer"
                    >
                      {reason.label}
                    </Label>
                    <p className="text-sm text-gray">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {errors.reasons && (
              <p className="text-sm text-red mt-2">{errors.reasons}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">
              Additional Comments (Optional)
            </Label>
            <Textarea
              placeholder="Please share any additional feedback that might help us improve our service..."
              className="min-h-[100px] "
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
            />
            <p className="text-sm ">
              Your feedback is valuable to us and helps improve our service for
              other users.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-red hover:bg-red/90 text-white"
              size="lg"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Delete My Account
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-primary text-white"
              size="lg"
              onClick={handleKeepAccount}
            >
              Keep My Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red" />
              </div>
              <div>
                <DialogTitle className="text-xl text-red">
                  Confirm Account Deletion
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <DialogDescription className="text-base">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogDescription>

          <div className="space-y-2 text-base mt-4">
            <div className="bg-red/5 p-4 rounded-lg border border-red/20">
              <p className="font-semibold text-red mb-2">
                ⚠️ This action is irreversible!
              </p>
              <p className="text-sm">
                Once you delete your account, there's no going back. Please be
                certain.
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <strong>What will happen:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>
                  Your profile and account data will be permanently deleted
                </li>
                <li>
                  All your content, settings, and preferences will be lost
                </li>
                <li>Your subscription will be cancelled immediately</li>
                <li>You won't be able to recover any of your data</li>
              </ul>
            </div>

            {selectedReasons.length > 0 && (
              <div className="px-4 pt-2 rounded-lg">
                <p className="font-medium mb-2 text-red">Selected reasons:</p>
                <ul className="text-sm space-y-1">
                  {selectedReasons.map((reasonId) => {
                    const reason = DELETE_REASONS.find(
                      (r) => r.id === reasonId
                    );
                    return (
                      <li key={reasonId} className="text-muted-foreground">
                        • {reason?.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {additionalComments && (
              <div className="px-4 pt-2 rounded-lg">
                <p className="font-medium mb-2 text-red">
                  Additional comments:
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {additionalComments}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 bg-primary  text-white"
            >
              Cancel
            </Button>
            <Button
              variant="red"
              onClick={handleConfirmDelete}
              disabled={loading}
              className="flex-1 bg-red hover:bg-red/90 text-white"
            >
              {loading ? "Deleting..." : "Yes, Delete My Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
