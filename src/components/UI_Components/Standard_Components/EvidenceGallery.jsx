"use client";
import {
  FileText,
  FileImage,
  Download,
  XCircle,
  File,
  Video,
  FileSpreadsheet,
  DownloadCloud,
} from "lucide-react";
import { IoIosAttach } from "react-icons/io";
const handleDownload = async (attachmentUrl, fileName) => {
  try {
    // Fetch the file as blob
    const response = await fetch(attachmentUrl);
    const blob = await response.blob();

    // Create blob URL
    const blobUrl = window.URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback to opening in new tab
    window.open(attachmentUrl, "_blank");
  }
};

const FilePreview = ({ file }) => {
  const getFileIcon = (fileName, resourceType) => {
    const ext = fileName?.split(".").pop()?.toLowerCase();

    // If it's an image resource type, return image icon
    if (resourceType === "image") {
      return <FileImage className="w-8 h-8 text-blue" />;
    }

    // If it's a video resource type, return video icon
    if (resourceType === "video") {
      return <Video className="w-8 h-8 text-purple/10" />;
    }

    // For raw files, determine icon based on extension
    switch (ext) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red" />;
      case "doc":
      case "docx":
        return <FileText className="w-8 h-8 text-blue" />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="w-8 h-8 text-green" />;
      case "txt":
        return <FileText className="w-8 h-8 text-gray-600" />;
      default:
        return <File className="w-8 h-8 text-gray-600" />;
    }
  };

  const getFileTypeColor = (fileName, resourceType) => {
    const ext = fileName?.split(".").pop()?.toLowerCase();

    if (resourceType === "image") return "bg-blue/5 dark:bg-blue/80";
    if (resourceType === "video") return "bg-purple/5 dark:bg-purple/80";

    switch (ext) {
      case "pdf":
        return "bg-red dark:bg-red/80";
      case "doc":
      case "docx":
        return "bg-blue dark:bg-blue/80";
      case "xls":
      case "xlsx":
        return "bg-green dark:bg-green/80";
      case "txt":
        return "bg-gray-100 dark:bg-gray/80";
      default:
        return "bg-gray-100 dark:bg-gray/80";
    }
  };

  const isImage = (resourceType) => {
    return resourceType === "image";
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div
      className="relative w-20 h-20 group
                    border-2 border-light dark:border-dark 
                    rounded-xl overflow-hidden 
                    transition-all duration-300 ease-in-out
                    hover:border-dialog_inside_border_color dark:hover:border-light
                    hover:shadow-md"
    >
      <div
        className={`absolute inset-0 flex items-center justify-center 
                    ${getFileTypeColor(file.fileName, file.resourceType)}`}
      >
        {isImage(file.resourceType) && file.path ? (
          <img
            src={file.path}
            alt={file.fileName}
            className="object-cover w-full h-full 
                       transition-all duration-300
                       group-hover:scale-105 group-hover:opacity-90"
            onError={(e) => {
              // Fallback to file icon if image fails to load
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* File icon display for non-images or image fallback */}
        <div
          className={`flex flex-col items-center justify-center p-2 w-full h-full
                      ${isImage(file.resourceType) ? "hidden" : "flex"}`}
        >
          {getFileIcon(file.fileName, file.resourceType)}
          <span
            className="text-xs text-text-secondary dark:text-text-muted 
                       mt-2 text-center line-clamp-2 font-medium"
          >
            {file.fileName}
          </span>
          {file.bytes && (
            <span className="text-xs text-text-muted mt-1">
              {formatFileSize(file.bytes)}
            </span>
          )}
        </div>
      </div>

      {/* File type badge */}
      <div
        className="absolute top-2 left-2 
                     px-2 py-1 rounded-md text-xs font-medium
                     bg-black/50 text-white
                     opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300"
      >
        {file.resourceType === "raw"
          ? file.resourceType?.split(".").pop()?.toUpperCase()
          : file.resourceType?.toUpperCase()}
      </div>

      {/* Download Button */}
      <div
        onClick={() =>
          handleDownload(
            file.path,
            file.publicId
              ? file.publicId.split("/").pop()
              : `attachment_${i + 1}`
          )
        }
        className="absolute bottom-2 right-2 
                   p-2 rounded-lg shadow-lg
                   bg-primary dark:bg-dark 
                   opacity-0 group-hover:opacity-100 
                   transform translate-y-2 group-hover:translate-y-0
                   transition-all duration-300 ease-in-out
                   hover:bg-primary-dark dark:hover:bg-primary-dark"
        title={`Download ${file.fileName}`}
      >
        <Download className="w-4 h-4 text-white dark:text-primary-light" />
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div
    className="w-full bg-surface-light dark:bg-surface-dark 
                  rounded-xl p-3 shadow-sm"
  >
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 rounded-full bg-background-secondary dark:bg-background-dark">
        <XCircle className="w-8 h-8 text-red dark:text-text-muted" />
      </div>
      <p className=" text-sm text-red dark:text-text-muted font-medium">
        No evidence available for this case
      </p>
      <p className="mt-1 text-xs text-red">
        Files attached to this complaint will appear here
      </p>
    </div>
  </div>
);

export default function EvidenceGallery({ evidence }) {
  console.log(evidence);

  const downloadAllFiles = async () => {
    if (evidence && evidence.length > 0) {
      for (let i = 0; i < evidence.length; i++) {
        const currentEvidence = evidence[i];
        console.log(currentEvidence);
        const fileName = currentEvidence.publicId
          ? currentEvidence.publicId.split("/").pop()
          : `attachment_${i + 1}`;

        // Add delay between downloads to prevent browser blocking
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        await handleDownload(currentEvidence.path, fileName);
      }
    }
  };

  if (!evidence?.length) {
    return <EmptyState />;
  }

  // Group files by type for better organization
  const groupedFiles = evidence.reduce((acc, file) => {
    const type = file.resourceType || "raw";
    if (!acc[type]) acc[type] = [];
    acc[type].push(file);
    return acc;
  }, {});

  const getTypeLabel = (type) => {
    switch (type) {
      case "image":
        return "Images";
      case "video":
        return "Videos";
      case "raw":
        return "Documents";
      case "pdf":
        return "PDFs";
      default:
        return "Files";
    }
  };

  return (
    <div className="dark:bg-surface-dark rounded-xl p-4 shadow-sm">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary-dark/10">
              <IoIosAttach className="w-5 h-5 text-primary dark:text-primary-light" />
            </div>
            <h2 className="text-xl font-semibold text-text_color dark:text-text-light">
              Evidence Gallery
            </h2>
          </div>

          {/* Download All Button */}
          <button
            onClick={downloadAllFiles}
            className="flex items-center gap-2 px-4 py-2 
                       bg-primary dark:bg-primary-dark 
                       text-white dark:text-primary-light
                       rounded-lg shadow-sm
                       hover:bg-primary-dark dark:hover:bg-primary
                       transition-colors duration-200
                       text-sm font-medium"
            title="Download all files"
          >
            <DownloadCloud className="w-4 h-4" />
            Download All
          </button>
        </div>

        <div className="flex flex-col items-start md:flex-row gap-4 text-sm text-text_color dark:text-text-muted">
          <span>
            {evidence.length} file{evidence.length !== 1 ? "s" : ""} attached
          </span>
          {Object.keys(groupedFiles).length > 1 && (
            <span className="text-text-muted">
              •{" "}
              {Object.entries(groupedFiles)
                .map(
                  ([type, files]) =>
                    `${files.length} ${getTypeLabel(type).toLowerCase()}`
                )
                .join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className=" flex md:flex-row flex-col ">
        {Object.entries(groupedFiles).map(([type, files]) => (
          <div key={type}>
            {Object.keys(groupedFiles).length > 1 && (
              <h3 className="text-sm font-medium text-text_color dark:text-text-light mb-3">
                {getTypeLabel(type)} ({files.length})
              </h3>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {files.map((file, index) => (
                <FilePreview key={`${type}-${index}`} file={file} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
