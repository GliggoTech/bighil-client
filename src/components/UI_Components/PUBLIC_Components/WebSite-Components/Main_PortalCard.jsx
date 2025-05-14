"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Main_PortalCard = ({
  image,
  title,
  description,
  features,
  buttonText,
  delay,
  url,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.01 }}
      className="relative rounded-2xl overflow-hidden shadow-xl group"
    >
      {/* Background Image */}
      <div className="relative w-full h-[400px] md:h-[400px] lg:h-[350px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 group-hover:bg-black/80 transition-colors duration-300" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10 text-white">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          {title}
        </motion.h3>
        <p className="text-sm md:text-base text-white/80 mb-6">{description}</p>
        <ul className="space-y-2 mb-6 text-sm md:text-base">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 text-green-400">✔</span>
              {feature}
            </li>
          ))}
        </ul>
        <Button asChild className="w-fit">
          <Link href={url}>{buttonText}</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default Main_PortalCard;
