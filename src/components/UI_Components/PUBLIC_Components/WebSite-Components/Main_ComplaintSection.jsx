"use client";
import { motion } from "framer-motion";
import {
  ChartLine,
  ChevronRight,
  ChevronRightIcon,
  FileText,
  UserPlus,
} from "lucide-react";
import React from "react";
import Main_StepCard from "./Main_StepCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Main_ComplaintSection = () => {
  const steps = [
    {
      title: "Login or Register",
      description:
        " create an account for tracking and updates. BigHil values your privacy and voice.",
      icon: <UserPlus size={36} />,
    },
    {
      title: "Submit Your Complaint",
      description:
        "Fill out the secure complaint form with details, optionally attach supporting files, and select the relevant category or department.",
      icon: <FileText size={36} />,
    },
    {
      title: "Get Notified & Track Progress",
      description:
        "Receive real-time updates and track using your complaint ID. Stay informed as your issue moves through resolution stages.",
      icon: <ChartLine size={36} />,
    },
  ];

  return (
    <section
      id="complaint"
      className="py-8 md:py-12 scroll-mt-16 md:scroll-mt-24 bg-default_bg"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            Submit Complaints Safely & Anonymously
          </h2>
          <p className="text-text_color">
            BigHil empowers individuals to report issues confidently with
            complete anonymity, ensuring every voice is heard and followed up
            securely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Main_StepCard
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={index * 0.2}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-6"
        >
          <Button asChild>
            <Link
              href="/user/user-register"
              className="bg-primary text-white hover:bg-opacity-90 rounded-md font-medium transition-colors"
            >
              File a Complaint Now
              <ChevronRightIcon className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Main_ComplaintSection;
