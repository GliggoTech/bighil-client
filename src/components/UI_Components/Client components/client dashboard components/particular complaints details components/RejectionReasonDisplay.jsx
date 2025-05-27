import { AlertCircle, Info, XCircle } from "lucide-react";
import React from "react";

const RejectionReasonDisplay = ({ reasons }) => {
  if (!reasons || (Array.isArray(reasons) && reasons.length === 0)) {
    return null;
  }

  const reasonsArray = Array.isArray(reasons) ? reasons : [reasons];
  return (
    <div className="mt-6 relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red/5 via-pink/5 to-red/5 rounded-xl opacity-80"></div>

      {/* Main content */}
      <div className="relative bg-white/60 backdrop-blur-sm border-2 border-red/60 rounded-xl p-3 shadow-lg">
        {/* Header with icon and title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red/50 to-red/60 rounded-full shadow-md">
            <XCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-red/80 flex items-center gap-2">
              Authorization Rejected
              <div className="w-2 h-2 bg-red/50 rounded-full animate-pulse"></div>
            </h4>
            <p className="text-sm ">
              Your submission has been rejected by the administrator
            </p>
          </div>
        </div>

        {/* Rejection reasons */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-red/60" />
            <span className="text-sm font-medium text-red/80">
              {reasonsArray.length > 1
                ? "Rejection Reasons:"
                : "Rejection Reason:"}
            </span>
          </div>

          {reasonsArray.map((reason, idx) => (
            <div
              key={idx}
              className="relative pl-4 pr-4 py-3 bg-gradient-to-r from-white to-white/90 rounded-lg border-l-4 border-red/40 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {/* Bullet point or number */}
              <div className="absolute left-2 top-5 w-2 h-2 bg-red/40 rounded-full"></div>

              {/* Reason text */}
              <p className="text-sm text-red-800 leading-relaxed font-medium pl-4">
                {reason}
              </p>

              {/* Subtle bottom border for multiple reasons */}
              {reasonsArray.length > 1 && idx < reasonsArray.length - 1 && (
                <div className="absolute bottom-0 left-8 right-4 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Action required notice */}
        <div className="mt-4 p-3 bg-white border border-none rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Action Required
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Please review the feedback above and resubmit your action with
                the necessary changes.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements
        <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-red/30 to-pink/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-br from-red/20 to-red/20 rounded-full blur-lg"></div> */}
      </div>
    </div>
  );
};

export default RejectionReasonDisplay;
