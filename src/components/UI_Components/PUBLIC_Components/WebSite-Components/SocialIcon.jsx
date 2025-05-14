import React from "react";

const SocialIcon = ({ icon }) => {
  return (
    <a
      href="#"
      className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition"
    >
      {icon}
    </a>
  );
};

export default SocialIcon;
