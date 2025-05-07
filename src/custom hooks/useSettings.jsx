"use client";
import { useToast } from "@/hooks/use-toast";
import useAccessToken from "./useAccessToken";
import useFetch from "./useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";

export const useSettings = () => {
  const { loading, error, success, fetchData } = useFetch();
  const token = useAccessToken();
  const { toast } = useToast();

  const handlePasswordUpdate = async (values) => {
    try {
      const url = getBackendUrl();
      const res = await fetchData(
        `${url}/api/setting/update-setting`,
        "PATCH",
        values,
        token,
        false
      );

      if (res?.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Password updated successfully",
        });
        return true;
      }
      throw new Error(res?.error || "Failed to update password");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      return false;
    }
  };

  return {
    handlePasswordUpdate,
    loading,
    error,
  };
};
