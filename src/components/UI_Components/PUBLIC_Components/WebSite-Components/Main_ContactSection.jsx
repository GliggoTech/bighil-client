"use client";
import React from "react";
import Main_ContactInfoItem from "./Main_ContactInfoItem";
import { Mail, MapPin, Phone } from "lucide-react";
import SocialIcon from "./SocialIcon";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import ContactFormCard from "./ContactFormCard";

const Main_ContactSection = () => {
  return (
    <section id="contact" className="py-8 md:py-12 bg-default_bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 mb-4 md:mb-0"
          >
            <h2 className="text-2xl md:text-2xl font-medium mb-3">
              Get in Touch
            </h2>
            <p className="text-text_color mb-8">
              Have questions about BigHil? Our team is here to help you get
              started and make the most of our platform.
            </p>

            <div className="mb-8">
              <Main_ContactInfoItem
                icon={<MapPin size={16} />}
                text="123 Business Avenue, Tech Park, CA 94107"
              />
              <Main_ContactInfoItem
                icon={<Phone size={16} />}
                text="+1 (555) 123-4567"
              />
              <Main_ContactInfoItem
                icon={<Mail size={16} />}
                text="support@bighil.com"
              />
            </div>

            {/* <div className="flex space-x-4">
              <SocialIcon icon={<FaFacebook size={16} />} />
              <SocialIcon icon={<FaTwitter size={16} />} />
              <SocialIcon icon={<FaLinkedin size={16} />} />
              <SocialIcon icon={<FaInstagram size={16} />} />
            </div> */}
          </motion.div>

          <ContactFormCard />
        </div>
      </div>
    </section>
  );
};

export default Main_ContactSection;
