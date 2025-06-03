"use client";
import { FiDownload, FiFile, FiImage } from "react-icons/fi";
import dateFormat from "dateformat";

const NoteCard = ({ note }) => {
  const handleDownload = (attachmentUrl, fileName) => {
    const link = document.createElement("a");
    link.href = attachmentUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="relative p-5 bg-white/10 dark:bg-surface-dark 
                    rounded-xl shadow-lg 
                    transition-all duration-300 hover:shadow-md mt-10 sm:mt-0"
    >
      {/* Timestamp Badge */}
      <span
        className="absolute sm:-top-3 -top-6 right-4 px-3 py-1 text-xs
                      bg-warning/50 dark:bg-warning/20
                      text-text_color font-semibold dark:text-text-muted
                      rounded-full border border-warning/20"
      >
        {note.createdAt
          ? !isNaN(new Date(note.createdAt).getTime())
            ? dateFormat(
                new Date(note.createdAt),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"
              )
            : "Invalid Date"
          : "Date not available"}
      </span>

      {/* Author and Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-info"></div>
          <span className="text-sm font-semibold text-text_color dark:text-text-light">
            {note.addedBy}
          </span>
        </div>

        {/* Note Text */}
        {note.complaintNote && (
          <p
            className="text-text_color dark:text-text-muted leading-relaxed
                        pl-5 border-l-2 border-primary dark:border-border-dark"
          >
            {note.complaintNote}
          </p>
        )}

        {/* Attachment Display */}
        {note.path && (
          <div className="pl-0 mt-3">
            <div className="inline-flex items-center gap-2 p-0 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              {/* Download Button */}
              <button
                onClick={() => handleDownload(note.path, note.fileName)}
                className="p-2 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-dark/10 rounded-md transition-colors"
                title="Download attachment"
              >
                <FiDownload className="w-4 h-4" />
              </button>
            </div>

            {/* Image Preview (if it's an image) */}
            {note.fileName &&
              ["jpg", "jpeg", "png", "gif", "webp"].includes(
                note.fileName.split(".").pop()?.toLowerCase()
              ) && (
                <div className="mt-2">
                  <img
                    src={note.path}
                    alt={note.fileName}
                    className="max-w-full max-h-48 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => window.open(note.path, "_blank")}
                  />
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
