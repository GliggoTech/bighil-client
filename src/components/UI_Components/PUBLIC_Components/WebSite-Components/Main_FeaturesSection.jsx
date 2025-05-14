"use client";
import { motion } from "framer-motion";
import {
  BarChart2,
  CheckSquare,
  Shield,
  Smartphone,
  Ticket,
  Users,
} from "lucide-react";
import React from "react";
import Main_FeatureCard from "./Main_FeatureCard";

const Main_FeaturesSection = () => {
  const features = [
    {
      icon: <Shield size={28} />,
      title: "Anonymous & Secure",
      description:
        "Ensure whistleblowers feel safe with end-to-end encrypted and completely anonymous complaint submissions.",
    },
    {
      icon: <Ticket size={28} />,
      title: "Complaint Tracking",
      description:
        "Track complaints in real-time with status updates, priority tags, and resolution timelines for better accountability.",
    },
    {
      icon: <Users size={28} />,
      title: "Role-Based Access",
      description:
        "Grant different access levels to admins, staff, and investigators to keep complaint data secure and organized.",
    },
    {
      icon: <CheckSquare size={28} />,
      title: "Actionable Workflow",
      description:
        "Assign, escalate, and resolve complaints with an intuitive workflow system that keeps your team efficient.",
    },
    {
      icon: <Smartphone size={28} />,
      title: "Responsive Platform",
      description:
        "Submit and manage complaints from any device with a mobile-friendly, modern user interface.",
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Insights & Reports",
      description:
        "Get powerful analytics on complaint trends, resolution rates, and department performance to drive improvements.",
    },
  ];

  return (
    <section id="features" className="py-8 md:py-12  scroll-mt-16  border-none">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            Empowering Anonymous & Secure Complaint Handling
          </h2>
          <p className="text-text_color">
            BigHil provides a robust platform for submitting, managing, and
            resolving anonymous complaints — ensuring trust, accountability, and
            complete data security across your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Main_FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main_FeaturesSection;
