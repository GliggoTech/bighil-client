"use client";
import React from "react";
import Main_PortalCard from "./Main_PortalCard";
import { motion } from "framer-motion";

const Main_PortalSection = () => {
  const portals = [
    {
      image: "/user_portal.png", // Replace with actual image path
      title: "User Portal",
      description:
        "Submit complaints anonymously, upload relevant evidence, and track the resolution status securely.",
      features: [
        "File anonymous complaints",
        "Track complaint progress",
        "Receive status notifications",
      ],
      buttonText: "Access User Portal",
      url: "/user/user-login",
    },
    {
      image: "/client_portal.png", // Replace with actual image path
      title: "Company Portal",
      description:
        "View and manage complaints raised against your organization, assign actions, and ensure timely resolutions.",
      features: [
        "View assigned complaints",
        "Update complaint statuses",
        "Collaborate with internal teams",
      ],
      buttonText: "Access Company Portal",
      url: "/client/client-login",
    },
    // {
    //   image: "/images/admin-portal.jpg", // Optional: admin portal
    //   title: "Admin Portal",
    //   description:
    //     "Oversee the entire complaint ecosystem, manage users, configure workflows, and monitor system performance.",
    //   features: [
    //     "User & role management",
    //     "View system analytics",
    //     "Moderate sensitive cases",
    //   ],
    //   buttonText: "Access Admin Portal",
    // },
  ];

  return (
    <section id="portals" className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-2xl md:text-2xl font-medium mb-3">
            Client Portals & Access
          </h2>
          <p className="text-text_color">
            Our secure client portals provide easy access to your information
            and services based on your role.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {portals.map((portal, index) => (
            <Main_PortalCard
              key={index}
              image={portal.image}
              title={portal.title}
              description={portal.description}
              features={portal.features}
              buttonText={portal.buttonText}
              delay={index * 0.3}
              url={portal.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main_PortalSection;
