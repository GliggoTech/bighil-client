"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { roleBadgeColors, roleColors } from "@/utils/adminsConstants";
import { Building, CheckCircle2, Shield } from "lucide-react";
import React from "react";

const ReviewStep = ({ formValues, setCurrentStep }) => {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <CheckCircle2 className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Review Information
        </h3>
      </div>
      {/* <Separator className="bg-gray-200 dark:bg-gray-700" /> */}

      <div className="space-y-3">
        {/* Company Information Review */}
        <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <h4 className="font-light text-lg mb-4 flex items-center text-gray-800 dark:text-white">
            <Building className="h-5 w-5 mr-2 text-primary" />
            Company Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                Company Name
              </div>
              <div className="mt-1 font-light text-gray-900 dark:text-white">
                {formValues.companyName}
              </div>
            </div>
            <div>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                Contact Number
              </div>
              <div className="mt-1 font-light text-gray-900 dark:text-white">
                {formValues.contactNumber}
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="text-primary text-sm mt-3"
            onClick={() => setCurrentStep(1)}
          >
            Edit Company Details
          </Button>
        </div>

        {/* Admin Accounts Review */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <h4 className="font-light text-lg mb-4 flex items-center text-gray-800 dark:text-white">
            <Shield className="h-5 w-5 mr-2 text-purple" />
            Admin Accounts ({formValues.admins.length})
          </h4>

          <div className="space-y-4">
            {formValues.admins.map((admin, index) => (
              <div
                key={index}
                className="flex items-start p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3  text-white ${
                    roleColors[admin.role]
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="font-light text-gray-900 dark:text-white">
                      {admin.name}
                    </div>
                    <Badge className={roleBadgeColors[admin.role]}>
                      {admin.role}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {admin.email}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="ghost"
            className="text-primary text-sm mt-3"
            onClick={() => setCurrentStep(2)}
          >
            Edit Admin Accounts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
