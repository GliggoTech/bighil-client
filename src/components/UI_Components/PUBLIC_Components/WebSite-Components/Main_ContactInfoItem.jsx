import React from "react";

const Main_ContactInfoItem = ({ icon, text }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center mr-4 text-white">
        {icon}
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Main_ContactInfoItem;
