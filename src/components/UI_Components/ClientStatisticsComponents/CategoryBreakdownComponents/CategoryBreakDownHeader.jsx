import React from "react";

const CategoryBreakDownHeader = ({ data }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalComplaints =
    typeof data?.totalComplaints === "number" ? data.totalComplaints : 0;
  const tags = Array.isArray(data?.tags) ? data.tags : [];
  const topCategoryPercentage =
    typeof tags[0]?.percentage === "number"
      ? `${tags[0].percentage.toFixed(1)}%`
      : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-text_color mb-2">
            Complaint Category Breakdown
          </h1>
          <p className="text-text_color">
            Analysis of complaint categories as of {currentDate}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-blue/5 rounded-lg p-4 text-center">
            <div className="text-2xl lg:text-3xl font-bold text-blue/90">
              {totalComplaints}
            </div>
            <div className="text-sm text-blue/80 font-medium">
              Total Complaints
            </div>
          </div>

          <div className="bg-red/5 rounded-lg p-4 text-center">
            <div className="text-2xl lg:text-3xl font-bold text-red/90">
              {tags.length}
            </div>
            <div className="text-sm text-red/80 font-medium">Categories</div>
          </div>

          <div className="bg-green/5 rounded-lg p-4 text-center">
            <div className="text-2xl lg:text-3xl font-bold text-green/90">
              {topCategoryPercentage}
            </div>
            <div className="text-sm text-green/80 font-medium">
              Top Category
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakDownHeader;
