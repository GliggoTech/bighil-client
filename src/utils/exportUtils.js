import { getBackendUrl } from "@/lib/getBackendUrl";
import { getToken } from "@/lib/getToken";

export const handleServerExport = async (
  token,
  filters,
  bighil,
  format = "csv"
) => {
  const queryParams = new URLSearchParams({
    ...filters,
  });

  const response = await fetch(
    bighil
      ? `${getBackendUrl()}/api/export-complaints/for-bighil?${queryParams}`
      : `${getBackendUrl()}/api/export-complaints/for-client?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Export failed");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `complaints-export.${format}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const pdfDownload = async (complaintId) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${getBackendUrl()}/api/export-complaints/${complaintId}/pdf`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Get your access token
        },
      }
    );

    if (!response.ok) throw new Error("Failed to download PDF");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `complaint-${complaintId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Download error:", error);
    // Add error handling/toast here
  }
};
