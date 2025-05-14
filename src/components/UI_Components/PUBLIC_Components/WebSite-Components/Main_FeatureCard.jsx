"use client";
import { motion } from "framer-motion";
import React from "react";

const Main_FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.1, delay }}
      whileHover={{ scale: 1.03, boxShadow: "0px 12px 30px rgba(0,0,0,0.1)" }}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-primary transition-all duration-300"
    >
      <div className="w-14 h-14 mb-4 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-text_color/80 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default Main_FeatureCard;
