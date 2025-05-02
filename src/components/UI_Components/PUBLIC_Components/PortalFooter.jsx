"use client";
import { Mail, Phone } from "lucide-react";
import { bighilInfo } from "@/utils/constValues";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PortalFooter() {
  return (
    <footer className="bg-white border-t border-green-100 fixed bottom-0 w-full py-3 z-30">
      <div className="container px-4 mx-auto">
        {/* Compact contact footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-green-800">
              BIGHIL Support
            </span>
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
            <Link
              href={`mailto:${bighilInfo.email}`}
              className="flex items-center text-green-700 hover:text-green-900 transition-colors"
            >
              <Mail className="h-4 w-4 mr-1.5 text-green-600" />
              {bighilInfo.email}
            </Link>

            <Link
              href={`tel:${bighilInfo.phone}`}
              className="flex items-center text-green-700 hover:text-green-900 transition-colors"
            >
              <Phone className="h-4 w-4 mr-1.5 text-green-600" />
              {bighilInfo.phone}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
