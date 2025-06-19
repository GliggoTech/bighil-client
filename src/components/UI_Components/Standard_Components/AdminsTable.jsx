"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Shield, ShieldOff, Eye, Ban } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import EditAdminDialog from "./EditAdminDialog";
import { getRoleTitle } from "@/utils/roleTitleHelper";
import { MdOutlineHideSource } from "react-icons/md";

const AdminsTable = ({
  admins,
  onEdit,
  onDelete,
  loading,
  hideAction = false,
  userRole,
  handleDisable,
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const [disableId, setDisableId] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);

  const handleDelete = async (adminId, adminName) => {
    setDeletingId(adminId);
    try {
      await onDelete(adminId);
      toast({
        title: "Success",
        description: `${adminName} has been deleted successfully.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete admin. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setShowEditDialog(true);
  };
  const handleViewOnly = (admin) => {
    setViewOnly(true);
    setEditingAdmin(admin);
    setShowEditDialog(true);
  };

  const handleEditSave = async (adminId, updatedData) => {
    try {
      await onEdit(adminId, updatedData);
      setShowEditDialog(false);
      setEditingAdmin(null);
    } catch (error) {
      throw error; // Re-throw to be handled by EditAdminDialog
    }
  };

  const handleEditClose = () => {
    setShowEditDialog(false);
    setEditingAdmin(null);
  };
  const handleDisableAdmin = async (admin, adminName) => {
    try {
      const sendtoBackend = admin.disableStatus;
      await handleDisable(admin._id, !sendtoBackend);
      toast({
        title: "Success",
        description: `${adminName} has been disabled successfully.`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disable admin. Please try again.",
        variant: "destructive",
      });
    } finally {
      // setAdmins((prevAdmins) =>
      //   prevAdmins.filter((admin) => admin._id !== adminId)
      // );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!admins || admins.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No admins found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                Email
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                Role
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                2FA Status
              </TableHead>
              {!hideAction && (
                <TableHead className="font-semibold text-gray-900 dark:text-gray-100 text-right">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => {
              const roleName = getRoleTitle(admin.role);
              return (
                <TableRow
                  key={admin._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <TableCell className="font-medium text-text_color dark:text-gray-100">
                    {admin.name}
                  </TableCell>
                  <TableCell className="text-text_color dark:text-gray-300">
                    {admin.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-medium text-white bg-blue hover:bg-blue/90 dark:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
                    >
                      {roleName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {admin.isTwoFactorEnabled ? (
                        <>
                          <Shield className="h-4 w-4 text-green" />
                          <span className="text-green font-medium text-sm">
                            Enabled
                          </span>
                        </>
                      ) : (
                        <>
                          <ShieldOff className="h-4 w-4 text-gray" />
                          <span className="text-gray font-medium text-sm">
                            Disabled
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>

                  {!hideAction && (
                    <TableCell className="text-center">
                      {userRole === "ADMIN" && admin.role === "SUPER ADMIN" ? (
                        <div className="">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOnly(admin)}
                            className="h-8 w-8 p-0 hover:bg-blue/50 dark:hover:bg-blue/20 border-none"
                          >
                            <Eye className="h-4 w-4 text-blue dark:text-blue-400" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(admin)}
                            className="h-8 w-8 p-0 hover:bg-blue/50 dark:hover:bg-blue/20 border-none"
                          >
                            <Edit className="h-4 w-4 text-blue dark:text-blue-400" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className={`h-8 w-8 p-0 ${
                                  admin.disableStatus ? "bg-yellow" : "bg-white"
                                } hover:bg-yellow dark:hover:bg-yellow-200 border-none`}
                                disabled={disableId === admin._id}
                              >
                                {disableId === admin._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-600"></div>
                                ) : (
                                  <Ban className="h-4 w-4 text-black dark:text-yellow-400" />
                                )}
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-text_color">
                                  {admin.disableStatus
                                    ? "Re-enable Admin?"
                                    : "Temporarily Disable Admin?"}
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-900">
                                  {admin.disableStatus ? (
                                    <>
                                      You are about to{" "}
                                      <strong>re-enable</strong>{" "}
                                      <strong>{admin.name}</strong> (
                                      {admin.email}). They will regain full
                                      access to the system.
                                    </>
                                  ) : (
                                    <>
                                      You are about to{" "}
                                      <strong>temporarily disable</strong>{" "}
                                      <strong>{admin.name}</strong> (
                                      {admin.email}). This will restrict their
                                      access until re-enabled. You can reverse
                                      this action later.
                                    </>
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDisableAdmin(admin, admin.name)
                                  }
                                  className={`${
                                    admin.disableStatus
                                      ? "bg-green hover:bg-green/70"
                                      : "bg-yellow/90 hover:bg-yellow/70"
                                  } text-white`}
                                >
                                  {admin.disableStatus
                                    ? "Re-enable Admin"
                                    : "Disable Admin"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red/50 dark:hover:bg-red/20 border-none"
                                disabled={deletingId === admin._id}
                              >
                                {deletingId === admin._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red"></div>
                                ) : (
                                  <Trash2 className="h-4 w-4 text-red dark:text-red-400" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete{" "}
                                  <strong>{admin.name}</strong> ({admin.email})
                                  from the system. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDelete(admin._id, admin.name)
                                  }
                                  className="bg-red hover:bg-red/70 text-white"
                                >
                                  Delete Admin
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Edit Admin Dialog */}
      <EditAdminDialog
        open={showEditDialog}
        onClose={handleEditClose}
        admin={editingAdmin}
        onSave={handleEditSave}
        viewOnly={viewOnly}
        setViewOnly={setViewOnly}
      />
    </>
  );
};

export default AdminsTable;
