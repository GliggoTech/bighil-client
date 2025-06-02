import { AlertCircle, Info, XCircle, CheckCircle } from "lucide-react";
import React from "react";

const RejectionReasonDisplay = ({ reasons, resolutionData }) => {

 

  // Handle empty or invalid data
  if (!resolutionData || resolutionData.length === 0) {
    return null;
  }

  const reasonsArray =
    reasons && Array.isArray(reasons) ? reasons : reasons ? [reasons] : [];

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <XCircle className="w-5 h-5 text-red" />
        <h3 className="text-lg font-semibold text-text_color">
          Submission History & Rejections
        </h3>
      </div>

      {/* Paired Resolution and Rejection Data */}
      <div className="space-y-3">
        {resolutionData.map((item, idx) => {
          const correspondingReason = reasonsArray[idx] || null;

          return (
            <div
              key={item._id || idx}
              className="bg-white border border-gray/20 rounded-lg p-4 shadow-sm"
            >
              {/* Resolution Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green" />
                  <span className="text-sm font-semibold text-text_color">
                    Submission #{resolutionData.length - idx}
                  </span>
                </div>
                <span className="text-xs text-text_color bg-primary/10 px-2 py-1 rounded">
                  {item.acknowledgements || "N/A"}
                </span>
              </div>

              {/* Resolution Note */}
              {item.resolutionNote && (
                <div className="mb-3 p-2 bg-green/10 rounded border-l-4 border-green/40">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Resolution: </span>
                    {item.resolutionNote}
                  </p>
                </div>
              )}

              {/* Corresponding Rejection Reason */}
              {correspondingReason ? (
                <div className="p-2 bg-red/5 rounded border-l-4 border-red/40">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800 mb-1">
                        Rejection Reason:
                      </p>
                      <p className="text-sm text-red-700">
                        {correspondingReason}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2 bg-blue/5 rounded border-l-4 border-blue-400">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue" />
                    <p className="text-sm text-blue-700">
                      No rejection reason provided for this submission.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional unpaired rejection reasons (if any) */}
      {reasonsArray.length > resolutionData.length && (
        <div className="bg-red-50 border border-red/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-red" />
            <h4 className="text-sm font-semibold text-red/80">
              Additional Rejection Reasons
            </h4>
          </div>
          <div className="space-y-2">
            {reasonsArray.slice(resolutionData.length).map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red/50 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-red/70">"{reason}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Required Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Action Required
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Please review all feedback above and resubmit with necessary
              changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionReasonDisplay;
