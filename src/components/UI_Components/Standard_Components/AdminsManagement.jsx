"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminsTable from "./AdminsTable";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { toast } from "@/hooks/use-toast";
import useNotificationStore from "@/store/notificationStore";

const AdminsManagement = () => {
  const { token } = useAccessToken();
  const { loading: isFetching, fetchData } = useFetch();
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const { userRole } = useNotificationStore();

  const [ownRole, setOwnRole] = useState([]);
  const [otherRoles, setOtherRoles] = useState([]);

  // Fetch admins data
  useEffect(() => {
    if (!token) return; // Don't fetch until token is ready

    async function fetchAdmins() {
      setLoadingAdmins(true);
      try {
        const adminsListData = await fetchData(
          `${getBackendUrl()}/api/client-setting/get-all-admins`,
          "GET",
          {},
          token,
          false
        );

        if (adminsListData.success) {
          setOwnRole(
            adminsListData.data.filter((admin) => admin.role === userRole)
          );
          setOtherRoles(
            adminsListData.data.filter((admin) => admin.role !== userRole)
          );
          setAdmins(adminsListData.data || adminsListData);
        } else {
          console.error("Failed to fetch admins:", adminsListData.message);
          toast({
            title: "Error",
            description: "Failed to fetch admins list.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to fetch admins:", error);
        toast({
          title: "Error",
          description: "An error occurred while fetching admins.",
          variant: "destructive",
        });
      } finally {
        setLoadingAdmins(false);
      }
    }

    fetchAdmins();
  }, [token, fetchData, userRole]);

  // Handle edit admin
  const handleEditAdmin = async (adminId, updatedData) => {
    try {

      const response = await fetchData(
        `${getBackendUrl()}/api/client-setting/update-admin/${adminId}`,
        "PATCH",
        updatedData,
        token,
        false
      );

      if (response.success) {
        // Update the admin in the state
        setOtherRoles((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === adminId ? { ...admin, ...updatedData } : admin
          )
        );
       
      } else {
        throw new Error(response.message || "Failed to update admin");
      }
    } catch (error) {
      throw error; // Re-throw to be handled by the edit dialog
    }
  };

  // Handle delete admin
  const handleDeleteAdmin = async (adminId) => {
    try {
      const response = await fetchData(
        `${getBackendUrl()}/api/client-setting/delete-admin/${adminId}`,
        "DELETE",
        {},
        token,
        false
      );

      if (response.success) {
        // Remove the deleted admin from the state
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin._id !== adminId)
        );
        return;
      } else {
        throw new Error(response.message || "Failed to delete admin");
      }
    } catch (error) {
      console.error("Failed to delete admin:", error);
      throw error; // Re-throw to be handled by the table component
    }
  };

  // Handle add new admin
  const handleAddAdmin = () => {

    toast({
      title: "Info",
      description: "Add admin functionality will be implemented soon.",
      variant: "default",
    });
  };
  const handleDisableAdmin = async (adminId, sendtoBackend) => {
    try {
      const response = await fetchData(
        `${getBackendUrl()}/api/client-setting/disable-admin/${adminId}`,
        "PATCH",
        {
          isDisable: sendtoBackend,
        },
        token,
        false
      );

      if (response.success) {
        setOtherRoles((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === adminId
              ? { ...admin, disableStatus: sendtoBackend }
              : admin
          )
        );
      } else {
        throw new Error(response.message || "Failed to disable admin");
      }
    } catch (error) {
      console.error("Failed to disable admin:", error);
      throw error; // Re-throw to be handled by the table component
    }
  };
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-none shadow-lg border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-text_color dark:text-white">
              Your Access
            </CardTitle>
            <CardDescription className="text-gray-900 dark:text-gray-400">
              Manage admin users and their permissions.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AdminsTable
          admins={ownRole}
          onEdit={handleEditAdmin}
          onDelete={handleDeleteAdmin}
          loading={loadingAdmins}
          hideAction={true}
        />
      </CardContent>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-text_color dark:text-white">
              Admin Management
            </CardTitle>
            <CardDescription className="text-gray-900 dark:text-gray-400">
              Manage admin users and their permissions.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AdminsTable
          admins={otherRoles}
          onEdit={handleEditAdmin}
          onDelete={handleDeleteAdmin}
          loading={loadingAdmins}
          userRole={userRole}
          handleDisable={handleDisableAdmin}
        />
      </CardContent>
    </Card>
  );
};

export default AdminsManagement;
