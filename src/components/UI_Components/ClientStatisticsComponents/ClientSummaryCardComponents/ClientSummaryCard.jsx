import React from "react";

const ClientSummaryCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  iconColor,
  description,
}) => {
  return (
    <div
      className={`${bgColor} rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105`}
    >
      {/* Header with icon */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-gray/10 shadow-sm`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${color}`}></div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-text_color mb-2">{title}</h3>

      {/* Value */}
      <div className="mb-3">
        <p className="text-2xl font-bold text-gray-800 break-words">
          {value === "N/A" ? (
            <span className="text-gray-400 text-lg">Not Available</span>
          ) : (
            value
          )}
        </p>
      </div>

      {/* Description */}
      <p className="text-xs  text-text_color leading-relaxed">{description}</p>

      {/* Gradient accent line */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${color} rounded-full mt-4 opacity-100`}
      ></div>
    </div>
  );
};

export default ClientSummaryCard;
