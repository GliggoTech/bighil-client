// components/complaints/EvidenceSection.js

import { FiPaperclip } from "react-icons/fi";
import Image from "next/image";

const EvidenceSection = ({ evidence }) => {
  const isImage = (fileName) => /\.(jpg|jpeg|png|gif)$/i.test(fileName);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FiPaperclip className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Evidence & Attachments</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {evidence?.map((file, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
          >
            {isImage(file.fileName) ? (
              <Image
                src={file.path}
                alt={file.fileName}
                width={200}
                height={150}
                className="rounded-md object-cover w-full h-32"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-32">
                <FiPaperclip className="w-8 h-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 truncate">
                  {file.fileName}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceSection;
