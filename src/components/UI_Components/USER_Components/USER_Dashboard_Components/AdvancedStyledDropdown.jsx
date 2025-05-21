"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust import path as needed
import { Button } from "@/components/ui/button"; // Adjust import path as needed
import Link from "next/link";
import { User, LogOut, Settings } from "lucide-react"; // Assuming lucide-react for icons
import { useState } from "react";

// Assuming userName, handleLogOut, loading, and error are passed as props or defined in the component context

const AdvancedStyledDropdown = ({
  handleLogOut,
  loading,
  error,
  setActiveLink,
}) => {
  const [open, setOpen] = useState(false);

  // Function to close the dropdown (used for the Logout button)
  const closeDropdown = () => {
    setOpen(false);
  };

  // Handle logout click - close dropdown first, then call logout handler
  const handleLogoutClick = async () => {
    closeDropdown(); // Close dropdown immediately on click
    // Add a small delay before triggering logout if needed, to allow UI to update
    // For most cases, calling handleLogOut immediately is fine, but depends on its implementation
    await handleLogOut(); // Then perform the logout action (assuming it's async)
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {" "}
      {/* Use setOpen directly */}
      <DropdownMenuTrigger className="bg-primary hover:bg-primary/90 active:bg-primary/80 p-2 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
        <User className="text-white h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-primary text-gray-200 shadow-xl border border-dialog_inside_border_color rounded-lg overflow-hidden p-1 space-y-1 animate-slideDownAndFade">
        <DropdownMenuItem
          asChild
          onSelect={() => {
            // This function is called when the item is selected (clicked or via keyboard)
            setActiveLink(""); // Set the active link state to ""
            // The dropdown will typically close automatically after onSelect
          }}
        >
          <Link
            href={"/user/user-myAccount"}
            className="cursor-pointer hover:bg-white/10 hover:text-white transition-all duration-200 py-2 px-3 rounded-md flex items-center gap-2 group"
          >
            <User className="h-4 w-4 text-white group-hover:text-white transition-colors duration-200" />
            My Account
          </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem asChild>
          <Link
            href={"/user/user-setting"}
            className="cursor-pointer hover:bg-white/10 hover:text-white transition-all duration-200 py-2 px-3 rounded-md flex items-center gap-2 group"
          >
            <Settings className="h-4 w-4 text-white group-hover:text-white transition-colors duration-200" />
            Settings
          </Link>
        </DropdownMenuItem> */}

        {/* Logout Button - Not a DropdownMenuItem, handled separately */}
        <div className="px-1 py-1">
          <Button
            onClick={handleLogoutClick} // Call the new handler that includes closeDropdown
            disabled={loading}
            variant="ghost"
            size="sm"
            className={`w-full text-left group justify-start bg-white hover:bg-red/90 text-red hover:text-white transition-colors duration-300 rounded-md px-3 py-2
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
                flex items-center space-x-2
              `}
          >
            <LogOut
              className={`h-4 w-4 text-red group-hover:text-white ${
                loading ? "animate-spin" : ""
              }`}
            />
            <span>{loading ? "Logging Out..." : "Logout"}</span>
          </Button>
        </div>
        {error && <p className="text-red-400 text-xs mt-1 px-3">{error}</p>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdvancedStyledDropdown;
