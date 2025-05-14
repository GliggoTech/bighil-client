import { motion } from "framer-motion";
import React from "react";

const Main_StepCard = ({ number, title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.1, delay }}
      whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
      className="relative p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg shadow-xl transition-all duration-300"
    >
      {/* Step number badge */}
      <div className="absolute -top-4 left-4 w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-md">
        {number}
      </div>

      {/* Icon with glow */}
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-primary shadow-inner mb-5">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-text_color mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text_color/80 text-sm  leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default Main_StepCard;
