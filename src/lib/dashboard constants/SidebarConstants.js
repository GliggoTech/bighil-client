import {
  AlertCircle,
  Bell,
  Building2,
  LayoutDashboard,
  MessageSquareText,
  Settings,
} from "lucide-react";
import { FiBell, FiList, FiPlusCircle } from "react-icons/fi";

// Enhanced sidebar items with additional metadata
export const clientSidebarValues = [
  {
    id: 1,
    title: "Dashboard",
    path: "/client/client-dashboard",
    icon: LayoutDashboard,
    description: "Overview of all activities",
  },
  {
    id: 2,
    title: "Complaints",
    path: "/client/client-complaints",
    icon: AlertCircle,
    description: "Manage your submitted complaints",
  },
  {
    id: 3,
    title: "Notifications",
    path: "/client/client-notifications",
    icon: Bell,
    description: "Check your alerts and updates",
  },
  {
    id: 4,
    title: "Settings",
    path: "/client/client-setting",
    icon: Settings,
    description: "Configure your preferences",
  },
];
export const bighilSidebarValues = [
  {
    id: 1,
    title: "Dashboard",
    path: "/bighil/bighil-dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Clients",
    path: "/bighil/bighil-clients",
    icon: Building2,
  },
  {
    id: 3,
    title: "Complaints",
    path: "/bighil/bighil-complaints",
    icon: AlertCircle,
  },
  {
    id: 4,
    title: "Messages",
    path: "/bighil/bighil-messages",
    icon: MessageSquareText,
  },
  {
    id: 5,
    title: "Settings",
    path: "/bighil/bighil-setting",
    icon: Settings,
  },
];

export const navLinks = [
  {
    name: "Add Complaint",
    icon: <FiPlusCircle className="mr-2 h-5 w-5" />,
    url: "/user/user-add-complaint",
  },
  {
    name: "My Complaints",
    icon: <FiList className="mr-2 h-5 w-5" />,
    url: "/user/my-complaints",
  },
  {
    name: "Notifications",
    icon: <FiBell className="mr-2 h-5 w-5" />,
    url: "/user/user-notifications",
  },
  {
    name: "Settings",
    icon: <Settings className="mr-2 h-5 w-5" />,
    url: "/user/user-setting",
  },
];
