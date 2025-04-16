"use client";

import React, { useState } from "react";
import useAccessToken from "@/custom hooks/useAccessToken";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const Delete_Client = ({ client, clients, setCurrentClients }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, fetchData } = useFetch();
  const token = useAccessToken();

  const handleDelete = async () => {
    const url = getBackendUrl();

    const res = await fetchData(
      `${url}/api/bighil-clients/delete-client/${client._id}`,
      "DELETE",
      {},
      token,
      false
    );

    if (res.success) {
      const newClients = clients.filter(
        (existingClient) => existingClient._id !== client._id
      );
      setCurrentClients(newClients);
      setDialogOpen(false); // close the dialog
    }
  };

  return (
    <>
      <Button
        className="px-4 py-1 bg-red-500 text-white hover:bg-red-600"
        onClick={() => setDialogOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              This action is <span className="font-semibold">irreversible</span>
              . Deleting this client will permanently remove them from the
              system. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Delete_Client;
