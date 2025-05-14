import React from "react";

const Main_FooterLink = ({ href, text }) => {
  return (
    <li>
      <a
        href={href}
        className="relative inline-block text-text_color transition-colors duration-200 hover:text-primary focus:outline-none focus:text-primary group"
      >
        <span className="relative z-10">{text}</span>
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
      </a>
    </li>
  );
};

export default Main_FooterLink;
