"use client";
import { FiDownload, FiFile, FiImage, FiDownloadCloud } from "react-icons/fi";
import dateFormat from "dateformat";

const NoteCard = ({ note }) => {


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

  const handleDownloadAll = async () => {
    if (note.noteEvidence && note.noteEvidence.length > 0) {
      for (let i = 0; i < note.noteEvidence.length; i++) {
        const evidence = note.noteEvidence[i];
        const fileName = evidence.publicId
          ? evidence.publicId.split("/").pop()
          : `attachment_${i + 1}`;

        // Add delay between downloads to prevent browser blocking
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        await handleDownload(evidence.path, fileName);
      }
    }
  };

  const getFileExtension = (path) => {
    return path.split(".").pop()?.toLowerCase();
  };

  const isImage = (path) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    return imageExtensions.includes(getFileExtension(path));
  };

  const hasMultipleEvidence = note.noteEvidence && note.noteEvidence.length > 1;

  return (
    <div
      className="relative p-3 bg-white/10 dark:bg-surface-dark
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

        {/* Evidence Display */}
        {note.noteEvidence && note.noteEvidence.length > 0 && (
          <div className="pl-0 mt-3">
            {/* Download Controls */}
            <div className="flex items-center gap-2 mb-3">
              {hasMultipleEvidence ? (
                <>
                  {/* Download All Button */}
                  <button
                    onClick={handleDownloadAll}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 dark:bg-primary-dark/10 
                              text-primary dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary-dark/20 
                              rounded-lg transition-colors text-sm font-medium"
                    title="Download all attachments"
                  >
                    <FiDownloadCloud className="w-4 h-4" />
                    Download All ({note.noteEvidence.length})
                  </button>
                </>
              ) : (
                /* Single Download Button */
                <button
                  onClick={() =>
                    handleDownload(
                      note.noteEvidence[0]?.path,
                      note.noteEvidence[0]?.publicId?.split("/").pop() ||
                        "attachment"
                    )
                  }
                  className="p-2 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-dark/10 
                            rounded-md transition-colors bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  title="Download attachment"
                >
                  <FiDownload className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* <div className="space-y-2">
              {note.noteEvidence.map((evidence, index) => (
                <div
                  key={evidence._id || index}
                  className="flex items-center gap-3"
                >
          
                  {hasMultipleEvidence && (
                    <button
                      onClick={() =>
                        handleDownload(
                          evidence.path,
                          evidence.publicId?.split("/").pop() ||
                            `attachment_${index + 1}`
                        )
                      }
                      className="p-1 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-dark/10 
                                rounded transition-colors"
                      title={`Download ${
                        evidence.publicId?.split("/").pop() ||
                        `attachment ${index + 1}`
                      }`}
                    >
                      <FiDownload className="w-3 h-3" />
                    </button>
                  )}

         
                  {isImage(evidence.path) ? (
                    <div className="flex-1">
                      <img
                        src={evidence.path}
                        alt={
                          evidence.publicId?.split("/").pop() ||
                          `Attachment ${index + 1}`
                        }
                        className="max-w-full max-h-48 rounded-lg shadow-sm cursor-pointer"
                        onClick={() => window.open(evidence.path, "_blank")}
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer flex-1"
                      onClick={() => window.open(evidence.path, "_blank")}
                    >
                      <FiFile className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {evidence.publicId?.split("/").pop() ||
                          `Attachment ${index + 1}`}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div> */}
          </div>
        )}

        {/* Legacy single file support (fallback) */}
        {note.path && !note.noteEvidence && (
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
