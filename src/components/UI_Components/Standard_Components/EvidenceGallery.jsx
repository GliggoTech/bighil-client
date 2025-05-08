import { FileText, FileImage, Download, XCircle } from "lucide-react";
import { IoIosAttach } from "react-icons/io";
const FilePreview = ({ file }) => {
  const getFileIcon = (fileName) => {
    const ext = fileName?.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "pdf"];

    return imageExtensions.includes(ext) ? (
      <FileImage className="w-6 h-6 text-text-muted dark:text-text-muted" />
    ) : (
      <FileText className="w-6 h-6 text-text-muted dark:text-text-muted" />
    );
  };

  return (
    <div
      className="relative aspect-square group
                    border-2 border-light dark:border-dark 
                    rounded-xl overflow-hidden 
                    transition-all duration-300 ease-in-out
                    hover:border-dialog_inside_border_color dark:hover:border-light
                    hover:shadow-md"
    >
      <div
        className="absolute inset-0 flex items-center justify-center 
                      bg-background-secondary dark:bg-surface-dark"
      >
        {file.path?.startsWith("http") ? (
          <img
            src={file.path}
            alt={file.fileName}
            className="object-cover w-full h-full 
                       transition-all duration-300
                       group-hover:scale-105 group-hover:opacity-90"
          />
        ) : (
          <div className="flex flex-col items-center p-4">
            {getFileIcon(file.fileName)}
            <span
              className="text-xs text-text-secondary dark:text-text-muted 
                           mt-2 text-center line-clamp-2"
            >
              {file.fileName}
            </span>
          </div>
        )}
      </div>

      {/* Download Button */}
      <a
        href={file.path}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 
                   p-2 rounded-lg shadow-lg
                   bg-primary dark:bg-dark 
                   opacity-0 group-hover:opacity-100 
                   transform translate-y-2 group-hover:translate-y-0
                   transition-all duration-300 ease-in-out
                   hover:bg-primary dark:hover:bg-primary-dark group"
      >
        <Download className="w-4 h-4 text-white  dark:text-primary-light" />
      </a>
    </div>
  );
};

const EmptyState = () => (
  <div
    className="w-full bg-surface-light dark:bg-surface-dark 
                  rounded-xl p-3 shadow-sm
                  "
  >
    <div className="flex flex-col items-center justify-center">
      <div className="p-3 rounded-full bg-background-secondary dark:bg-background-dark">
        <XCircle className="w-8 h-8 text-text_color dark:text-text-muted" />
      </div>
      <p className="mt-2 text-sm text-text_color dark:text-text-muted">
        No evidence available for this case
      </p>
    </div>
  </div>
);

export default function EvidenceGallery({ evidence }) {
  if (!evidence?.length) {
    return <EmptyState />;
  }

  return (
    <div
      className=" dark:bg-surface-dark 
                    rounded-xl p-3 shadow-sm
                    "
    >
      {/* Optional: Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3  mb-2">
          <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary-dark/10">
            <IoIosAttach className="w-5 h-5 text-primary dark:text-primary-light" />
          </div>
          <h2 className="text-xl font-semibold text-text_color dark:text-text-light">
            Evidence Gallery
          </h2>
        </div>

        <p className="text-sm text-text_color dark:text-text-muted">
          {evidence.length} file{evidence.length !== 1 ? "s" : ""} attached
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {evidence.map((file, index) => (
          <FilePreview key={index} file={file} />
        ))}
      </div>
    </div>
  );
}
