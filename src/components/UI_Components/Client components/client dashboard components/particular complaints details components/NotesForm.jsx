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

  // File attachment states
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const[fileError, setFileError] = useState(null);

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
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setFileError(
        "Please select a valid file type (Images, Videos, PDF, Word, Excel, or Text files)"
      );
      return;
    }

    // Validate file size based on type
    const maxSize = getMaxFileSize(file.type);
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      setFileError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview for images and videos
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setFilePreview({ type: "image", url: e.target.result });
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setFilePreview({ type: "video", url: e.target.result });
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
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

  const onSubmit = async (data) => {
    if (!data.note.trim() && !selectedFile) {
      setFileError("Please add a note or attach a file");
      return;
    }

    const url = getBackendUrl();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("note", data.note.trim());

    if (selectedFile) {
      formData.append("attachment", selectedFile);
    }

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
        removeFile();
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
            Attach File
          </Button>
          <span className="text-xs text-gray">
            Max 5MB for docs/images, 20MB for videos
          </span>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt,.doc,.docx,.xls,.xlsx,.mp4,.webm,.ogg,.avi,.mov,.wmv,.flv,.mkv"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* File Preview */}
        {selectedFile && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-start gap-3">
              {/* Media Preview */}
              {filePreview ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                  {filePreview.type === "image" ? (
                    <img
                      src={filePreview.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : filePreview.type === "video" ? (
                    <div className="relative w-full h-full">
                      <video
                        src={filePreview.url}
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
                  {getFileIcon(selectedFile.type)}
                </div>
              )}

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
                <p className="text-xs text-gray dark:text-gray-400">
                  {getFileTypeLabel(selectedFile.type)}
                </p>
                {selectedFile.type.startsWith("video/") && (
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
                onClick={removeFile}
                className="text-red hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <FiX className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        disabled={loading || (!noteValue.trim() && !selectedFile)}
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
