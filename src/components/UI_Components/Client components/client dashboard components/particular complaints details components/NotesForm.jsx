"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import { useState, useRef } from "react";
import { FiPaperclip, FiX, FiFile, FiPlay } from "react-icons/fi";

const NotesForm = ({ complaintId, currentNotes, addNewNote }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { note: "" },
  });

  const { loading, error, fetchData } = useFetch();
  const { token } = useAccessToken();
  const noteValue = watch("note");

  // File attachment states - Changed to arrays for multiple files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState(null);

  // Allowed file types and size limit (20MB for videos)
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    // Videos
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
    "video/mkv",
    // Documents
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  // Different size limits for different file types
  const getMaxFileSize = (fileType) => {
    if (fileType.startsWith("video/")) {
      return 20 * 1024 * 1024; // 20MB for videos
    }
    return 5 * 1024 * 1024; // 5MB for other files
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const validFiles = [];
    const newPreviews = [];
    let errorMessage = null;

    for (const file of files) {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        errorMessage =
          "Some files have invalid types. Please select valid file types (Images, Videos, PDF, Word, Excel, or Text files)";
        continue;
      }

      // Validate file size based on type
      const maxSize = getMaxFileSize(file.type);
      if (file.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / (1024 * 1024));
        errorMessage = `Some files exceed the size limit of ${maxSizeMB}MB`;
        continue;
      }

      validFiles.push(file);

      // Create preview for images and videos
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews((prev) => [
            ...prev,
            {
              id: file.name + file.size,
              type: "image",
              url: e.target.result,
            },
          ]);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews((prev) => [
            ...prev,
            {
              id: file.name + file.size,
              type: "video",
              url: e.target.result,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    }

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setFileError(null);
    }

    if (errorMessage) {
      setFileError(errorMessage);
    }

    // Clear the input so the same files can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setFilePreviews((prev) => {
      const fileToRemove = selectedFiles[indexToRemove];
      const previewId = fileToRemove.name + fileToRemove.size;
      return prev.filter((preview) => preview.id !== previewId);
    });
  };

  const removeAllFiles = () => {
    setSelectedFiles([]);
    setFilePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return "🖼️";
    if (fileType.startsWith("video/")) return "🎥";
    if (fileType === "application/pdf") return "📄";
    if (fileType.includes("word")) return "📝";
    if (fileType.includes("excel") || fileType.includes("sheet")) return "📊";
    return "📎";
  };

  const getFileTypeLabel = (fileType) => {
    if (fileType.startsWith("image/")) return "Image";
    if (fileType.startsWith("video/")) return "Video";
    if (fileType === "application/pdf") return "PDF";
    if (fileType.includes("word")) return "Word Document";
    if (fileType.includes("excel") || fileType.includes("sheet"))
      return "Excel";
    if (fileType === "text/plain") return "Text File";
    return fileType.split("/")[1]?.toUpperCase() || "File";
  };

  const getPreviewForFile = (file) => {
    const previewId = file.name + file.size;
    return filePreviews.find((preview) => preview.id === previewId);
  };

  const onSubmit = async (data) => {
    if (!data.note.trim() && selectedFiles.length === 0) {
      setFileError("Please add a note or attach a file");
      return;
    }

    const url = getBackendUrl();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("note", data.note.trim());

    // Append all selected files
    selectedFiles.forEach((file, index) => {
      formData.append(`attachment`, file); // Use 'attachments' for multiple files
    });

    try {
      // Use fetch directly for FormData (don't set Content-Type header)
      const response = await fetchData(
        `${url}/api/client/add-note/${complaintId}`,
        "POST",
        formData,
        token,
        true
      );

      if (response.success) {
        addNewNote(response.data);
        reset();
        removeAllFiles();
      } else {
        throw new Error(response.message || "Failed to add note");
      }
    } catch (err) {
      console.error("Error adding note:", err);
      setFileError("Failed to add note. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Textarea */}
      <Textarea
        {...register("note")}
        placeholder="Add a new note..."
        className="min-h-[80px] focus-within:ring-0 ring-white border-black/10"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      />

      {/* File Attachment Section */}
      <div className="space-y-3">
        {/* File Input Button */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <FiPaperclip className="w-4 h-4" />
            Attach Files
          </Button>
          <span className="text-xs text-gray">
            Max 5MB for docs/images, 20MB for videos
          </span>
          {selectedFiles.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeAllFiles}
              className="text-red hover:text-red-700 text-xs"
            >
              Remove All ({selectedFiles.length})
            </Button>
          )}
        </div>

        {/* Hidden File Input - Added multiple attribute */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt,.doc,.docx,.xls,.xlsx,.mp4,.webm,.ogg,.avi,.mov,.wmv,.flv,.mkv"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* File Previews - Updated to handle multiple files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            {selectedFiles.map((file, index) => {
              const preview = getPreviewForFile(file);
              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-start gap-3">
                    {/* Media Preview */}
                    {preview ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                        {preview.type === "image" ? (
                          <img
                            src={preview.url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : preview.type === "video" ? (
                          <div className="relative w-full h-full">
                            <video
                              src={preview.url}
                              className="w-full h-full object-cover"
                              muted
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <FiPlay className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                        {getFileIcon(file.type)}
                      </div>
                    )}

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                      <p className="text-xs text-gray dark:text-gray-400">
                        {getFileTypeLabel(file.type)}
                      </p>
                      {file.type.startsWith("video/") && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Video file - larger size limit applies
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FiX className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Error Display */}
      {fileError && <div className="text-red text-sm">{fileError}</div>}

      {/* Submit Button */}
      <Button
        disabled={loading || (!noteValue.trim() && selectedFiles.length === 0)}
        type="submit"
        className="bg-primary text-white hover:bg-primary hover:text-text-light"
      >
        {loading ? "Adding..." : "Add Note"}
      </Button>

      {error && <div className="text-red text-sm">{error.message}</div>}
    </form>
  );
};

export default NotesForm;
