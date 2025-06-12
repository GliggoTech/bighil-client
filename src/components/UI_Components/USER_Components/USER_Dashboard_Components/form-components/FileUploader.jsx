"use client";
import { FormLabel } from "@/components/ui/form";
import { UploadCloud, FileText, X } from "lucide-react";

export function FileUploader({ handleFileUpload, localFiles, removeFile }) {
  return (
    <div>
      <FormLabel className="text-text_color">
        Upload Evidence{" "}
        <span className="text-gray-600 text-xs">(Accepted formats: PDF, JPG, PNG. Max size: 5MB)</span>
      </FormLabel>
      <input
        type="file"
        multiple
        className="hidden"
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label
        htmlFor="file-upload"
        className="block w-full border-2 mt-2 border-primary/5 rounded-lg p-1 sm:p-1 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <UploadCloud className="mx-auto text-primary h-5 w-5 sm:h-6 sm:w-6 mb-1" />
        <p className="text-sm sm:text-base text-gray-600">
          Click files to upload
        </p>
      </label>

      {localFiles.length > 0 && (
        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
          {localFiles.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-md text-sm"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <FileText className="text-blue-500 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
              >
                <X className="h-4 w-4 text-red" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
