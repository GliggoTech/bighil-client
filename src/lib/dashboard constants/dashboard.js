import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

// src/constants/dashboard.js
export const TIME_PERIODS = {
  MORNING: { start: 5, end: 12, greeting: "Good Morning" },
  AFTERNOON: { start: 12, end: 18, greeting: "Good Afternoon" },
  EVENING: { start: 18, end: 5, greeting: "Good Evening" },
};

export const USER_ROLE_MESSAGES = {
  SUPER_ADMIN: "You have full system access and oversight of all operations.",
  ADMIN: "You have access to most system functions and reporting tools.",
  SUB_ADMIN: "You can manage team activities and handle escalated issues.",
  DEFAULT: "Welcome to your administration dashboard.",
};
export const SPARKLINE_DIMENSIONS = {
  height: 32,
  width: 60,
};

export const STATS_CONFIG = [
  {
    title: "Total Complaints",
    key: "total",
    icon: AlertCircle,
    color: "blue",
    isNegative: false,
  },
  {
    title: "Pending",
    key: "pending",
    icon: Clock,
    color: "yellow",
    isNegative: true,
  },
  {
    title: "In Progress",
    key: "inProgress",
    icon: Clock,
    color: "orange",
    isNegative: false,
  },
  {
    title: "Resolved",
    key: "resolved",
    icon: CheckCircle,
    color: "green",
    isNegative: false,
  },
  {
    title: "Unwanted",
    key: "unwanted",
    icon: X,
    color: "red",
    isNegative: true,
  },
];

// lib/constants/tableColumns.js
export const COMPLAINT_TABLE_COLUMNS = [
  // { key: "company", label: "Company", width: "w-[350px]" },
  { key: "complaint", label: "Complaint", width: "", padding: "pl-10" },
  { key: "status", label: "Status", width: "w-[100px]" },
  { key: "priority", label: "Priority", width: "w-[80px]" },
  { key: "id", label: "ID", width: "w-[100px]" },
];
