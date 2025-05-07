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
import { AlertTriangle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

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
      toast({
        variant: "success",
        description: "Client deleted successfully",
        duration: 5000,
      });
    }
  };

  return (
    <div className="p-0 relative">
      <Button
        className=" bg-danger_bg/10 group text-white hover:bg-red/70 font-light"
        onClick={() => setDialogOpen(true)}
      >
        <Trash2 className="h-5 w-5 text-red group-hover:text-white" />
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white text-text_color font-light p-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5 text-red" />
              <span className="text-red font-medium">Confirm Deletion</span>
            </DialogTitle>
            <div className="relative ">
              <Separator className="w-[calc(100%+2rem)] -mx-4 my-2 bg-dialog_inside_border_color h-[1px]" />{" "}
            </div>
            <DialogDescription>
              This action is <span className="font-semibold">irreversible</span>
              . Deleting this client will permanently remove them from the
              system. Are you sure you want to continue?
            </DialogDescription>
            <div className="relative ">
              <Separator className="w-[calc(100%+2rem)] my-2 -mx-4 bg-dialog_inside_border_color h-[1px]" />{" "}
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="bg-indigo text-white font-light hover:bg-indigo/80  shadow-xl"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="bg-red hover:bg-red/80 text-white font-light shadow-xl"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Delete_Client;
