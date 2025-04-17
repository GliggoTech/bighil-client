"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MessageCircle,
  X,
  ExternalLink,
  Copy,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BIGHIL_EMAIL = "support@bighil.com";
const BIGHIL_PHONE = "+1 (555) 123-4567";

function BighilContactFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState({ email: false, phone: false });
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Copy to clipboard function
  const copyToClipboard = (type, value) => {
    navigator.clipboard.writeText(value);
    setIsCopied({ ...isCopied, [type]: true });

    setTimeout(() => {
      setIsCopied({ ...isCopied, [type]: false });
    }, 2000);
  };

  // Open mail or phone
  const openDirectAction = (type) => {
    if (type === "email") {
      window.location.href = `mailto:${BIGHIL_EMAIL}`;
    } else if (type === "phone") {
      window.location.href = `tel:${BIGHIL_PHONE.replace(/\D/g, "")}`;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {/* Contact buttons that appear when open */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-2 mb-2">
          <div
            className={`flex items-center transition-all duration-300 transform ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => copyToClipboard("email", BIGHIL_EMAIL)}
                    variant="secondary"
                    size="icon"
                    className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all mr-2"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  {isCopied.email ? "Copied!" : "Copy email"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="bg-white dark:bg-slate-900 py-2 px-4 rounded-lg shadow-lg animate-fadeIn flex items-center">
              <span className="text-sm font-medium mr-2">{BIGHIL_EMAIL}</span>
              {isCopied.email ? (
                <span className="text-sm font-medium text-primary">
                  Copied!
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-primary/10 rounded-full"
                  onClick={() => openDirectAction("email")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          <div
            className={`flex items-center transition-all duration-300 transform ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => copyToClipboard("phone", BIGHIL_PHONE)}
                    variant="secondary"
                    size="icon"
                    className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all mr-2"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  {isCopied.phone ? "Copied!" : "Copy phone"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="bg-white dark:bg-slate-900 py-2 px-4 rounded-lg shadow-lg animate-fadeIn flex items-center">
              <span className="text-sm font-medium mr-2">{BIGHIL_PHONE}</span>
              {isCopied.phone ? (
                <span className="text-sm font-medium text-primary">
                  Copied!
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-primary/10 rounded-full"
                  onClick={() => openDirectAction("phone")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main contact button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-red-500 hover:bg-destructive/90"
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        <span className="sr-only">
          {isOpen ? "Close contact options" : "Open contact options"}
        </span>
      </Button>
    </div>
  );
}

function ContactComponent() {
  return (
    <>
      <div className="relative">
        {/* The floating contact component */}
        <BighilContactFloat />
      </div>
    </>
  );
}

export default ContactComponent;
