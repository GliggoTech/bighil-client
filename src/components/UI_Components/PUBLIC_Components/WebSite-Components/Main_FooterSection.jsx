import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Main_FooterLink from "./Main_FooterLink";

const Main_FooterSection = () => {
  return (
    <footer className="bg-default_bg text-gray-300 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 mb-6 gap-10">
          {/* Brand and description */}
          <div>
            <div className="flex items-center mb-4">
              {/* <span className="bg-white text-primary px-3 py-1 font-bold text-xl rounded-full mr-2">
                BH
              </span> */}
              <span className="text-text_color text-2xl font-semibold">
                BigHil
              </span>
            </div>
            <p className="text-text_color mb-6 max-w-md leading-relaxed">
              Simplifying business management and customer service for
              enterprises of all sizes.
            </p>

            {/* <div className="flex space-x-4 mt-4">
              {[
                { icon: <FaFacebook />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaLinkedin />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
              ].map(({ icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="text-text_color hover:text-white transition"
                >
                  {icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick links */}
          <div className="flex flex-col justify-start items-start md:justify-center md:items-center">
            <h4 className="text-text_color text-xl font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <Main_FooterLink href="#home" text="Home" />
              <Main_FooterLink href="#features" text="Features" />
              <Main_FooterLink href="#complaint" text="File Complaint" />
              <Main_FooterLink href="#portals" text="Client Portals" />
              <Main_FooterLink href="#contact" text="Contact Us" />
            </ul>
          </div>
        </div>

        <div className="border-t border-primary mt-12 pt-6 text-center text-sm text-primary">
          &copy; {new Date().getFullYear()} BigHil. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Main_FooterSection;
