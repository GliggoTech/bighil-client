"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaQuestion } from "react-icons/fa";

// Reusable Tooltip Component
export function InfoTooltip({
  content,
  icon: Icon = FaQuestion,
  iconClassName = "h-4 w-4 text-primary bg-gray/10 p-1 rounded-full border-none",
  contentClassName = "text-xs text-gray-700 max-w-48 sm:max-w-xs",
  side = "right",
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center cursor-pointer border-none outline-none focus:outline-none focus:ring-0 bg-transparent"
          onClick={() => setOpen(!open)} // For mobile/touch
          onMouseEnter={() => setOpen(true)} // For desktop hover
          onMouseLeave={() => setOpen(false)} // For desktop hover
        >
          <Icon className={iconClassName} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={`p-3 max-w-xs bg-white  border-gray-200 shadow-lg rounded-md ${contentClassName}`}
        side={side}
        sideOffset={5}
      >
        {typeof content === "string" ? (
          <p className="text-xs">{content}</p>
        ) : (
          content
        )}
      </PopoverContent>
    </Popover>
  );
}
