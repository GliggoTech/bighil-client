import React from "react";
import usePasswordStrength from "./usePasswordStrength";
import { Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PasswordStrengthIndicator = ({
  password,
  showRequirements = true,
  className = "",
}) => {
  const { score, level, requirements } = usePasswordStrength(password);

  const getStrengthColor = () => {
    switch (level) {
      case "weak":
        return "bg-red";
      case "fair":
        return "bg-orange";
      case "good":
        return "bg-yellow";
      case "strong":
        return "bg-primary";
      default:
        return "bg-gray-200";
    }
  };

  const getStrengthText = () => {
    switch (level) {
      case "weak":
        return "Weak";
      case "fair":
        return "Fair";
      case "good":
        return "Good";
      case "strong":
        return "Strong";
      default:
        return "";
    }
  };

  const getTextColor = () => {
    switch (level) {
      case "weak":
        return "text-red";
      case "fair":
        return "text-orange";
      case "good":
        return "text-yellow";
      case "strong":
        return "text-primary";
      default:
        return "text-gray-500";
    }
  };

  const requirementsList = [
    { key: "minLength", text: "At least 8 characters" },
    { key: "hasUppercase", text: "One uppercase letter" },
    { key: "hasLowercase", text: "One lowercase letter" },
    { key: "hasNumbers", text: "One number" },
    { key: "hasSpecialChars", text: "One special character" },
  ];

  if (!password) return null;

  return (
    <div className={`mt-5 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Password strength
        </span>
        <span className={`text-sm font-medium ${getTextColor()}`}>
          {getStrengthText()}
        </span>
      </div>

      <Progress
        value={score}
        className="h-2 mb-3"
        style={{
          "--progress-background":
            score > 0 ? getStrengthColor().replace("bg-", "") : "#e5e7eb",
        }}
      />

      {showRequirements && (
        <div className="space-y-2">
          {requirementsList.map(({ key, text }) => (
            <div key={key} className="flex items-center text-sm">
              {requirements[key] ? (
                <Check className="w-4 h-4 text-primary mr-2" />
              ) : (
                <X className="w-4 h-4 text-red mr-2" />
              )}
              <span
                className={
                  requirements[key] ? "text-green" : "text-gray-600"
                }
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
