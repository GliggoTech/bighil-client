import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BellIcon,
  ClockIcon,
  FileTextIcon,
  MessageSquareIcon,
  FileWarningIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  ThumbsDownIcon,
  RefreshCcwIcon,
  ArchiveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getNotificationIcon = (type) => {
  const iconClasses = "h-4 w-4 flex-shrink-0";
  const icons = {
    NEW_COMPLAINT: <FileTextIcon className={`${iconClasses} text-primary`} />,
    STATUS_CHANGE: <RefreshCcwIcon className={`${iconClasses} text-warning`} />,
    NOTE_ADDED: (
      <MessageSquareIcon className={`${iconClasses} text-secondary`} />
    ),
    PRIORITY_CHANGE: (
      <AlertCircleIcon className={`${iconClasses} text-danger`} />
    ),
    RESOLUTION_ADDED: (
      <CheckCircle2Icon className={`${iconClasses} text-success`} />
    ),
    NEW_MESSAGE: <MessageSquareIcon className={`${iconClasses} text-danger`} />,
    AUTHORIZATION_REQUIRED: (
      <ShieldAlertIcon className={`${iconClasses} text-yellow`} />
    ),
    AUTHORIZATION_RESOLVED: (
      <ShieldCheckIcon className={`${iconClasses} text-green`} />
    ),
    AUTHORIZATION_REJECTED: (
      <XCircleIcon className={`${iconClasses} text-red`} />
    ),
    UNWANTED_COMPLAINT: (
      <ThumbsDownIcon className={`${iconClasses} text-red`} />
    ),
    AUTHORIZATION_STATUS_CHANGE: (
      <ClockIcon className={`${iconClasses} text-blue`} />
    ),
    COMPLAINT_RESOLVED: (
      <ArchiveIcon className={`${iconClasses} text-emerald-600`} />
    ),
  };
  return icons[type] || <BellIcon className={`${iconClasses} text-gray-400`} />;
};

const getTypeStyles = (type) => {
  const styles = {
    NEW_COMPLAINT: {
      badge: "bg-primary/10 text-primary border-primary/20",
      hover: "hover:bg-primary hover:text-white",
    },
    STATUS_CHANGE: {
      badge: "bg-warning/10 text-warning border-warning/20",
      hover: "hover:bg-warning hover:text-white",
    },
    NOTE_ADDED: {
      badge: "bg-orange/10 text-orange border-orange/20",
      hover: "hover:bg-orange-500 hover:text-white",
    },
    NEW_MESSAGE: {
      badge: "bg-danger/10 text-danger border-danger/20",
      hover: "hover:bg-danger hover:text-white",
    },
    RESOLUTION_ADDED: {
      badge: "bg-success/10 text-success border-success/20",
      hover: "hover:bg-success hover:text-white",
    },
    AUTHORIZATION_REQUIRED: {
      badge: "bg-yellow/10 text-yellow border-yellow/30",
      hover: "hover:bg-yellow-500 hover:text-white",
    },
    AUTHORIZATION_RESOLVED: {
      badge: "bg-green/10 text-green border-green/30",
      hover: "hover:bg-green-500 hover:text-white",
    },
    AUTHORIZATION_REJECTED: {
      badge: "bg-red/10 text-red border-red/30",
      hover: "hover:bg-red hover:text-white",
    },
    UNWANTED_COMPLAINT: {
      badge: "bg-gray-100 text-gray-700 border-gray-200",
      hover: "hover:bg-gray-200 hover:text-gray-800",
    },
    AUTHORIZATION_STATUS_CHANGE: {
      badge: "bg-blue/10 text-blue border-blue/30",
      hover: "hover:bg-blue-500 hover:text-white",
    },
    COMPLAINT_RESOLVED: {
      badge: "bg-emerald/10 text-emerald border-emerald/30",
      hover: "hover:bg-emerald-500 hover:text-white",
    },
  };
  return styles[type] || styles.NEW_COMPLAINT;
};

const RecentNotification = ({ recentNotifications = [] }) => {
  const hasNotifications = recentNotifications.length > 0;

  return (
    <Card className="shadow-lg h-full border-0 hover:shadow-xl bg-white transition-all duration-300 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BellIcon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Recent Notifications
            </CardTitle>
          </div>
          <Button
            className="text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200 rounded-lg px-4 py-2 shadow-sm"
            asChild
          >
            <Link href="/client/client-notifications">View All</Link>
          </Button>
        </div>
      </CardHeader>

      {hasNotifications ? (
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <TableHead className="w-12 text-center py-2 font-semibold text-gray-700 dark:text-gray-300">
                    <span className="sr-only">Icon</span>
                  </TableHead>
                  <TableHead className="min-w-[280px] sm:min-w-[320px] py-2 font-semibold text-gray-700 dark:text-gray-300">
                    Notification
                  </TableHead>
                  <TableHead className="hidden lg:table-cell w-[160px] py-2 font-semibold text-gray-700 dark:text-gray-300">
                    Type
                  </TableHead>
                  <TableHead className="w-[100px] text-center py-2 font-semibold text-gray-700 dark:text-gray-300">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentNotifications.map((notification, index) => {
                  const typeStyles = getTypeStyles(notification.type);
                  const isLast = index === recentNotifications.length - 1;

                  return (
                    <TableRow
                      key={notification._id}
                      className={`hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200 ${
                        !isLast
                          ? "border-b border-gray-200 dark:border-gray-700"
                          : ""
                      }`}
                    >
                      <TableCell className="text-center py-4 px-4">
                        <div className="flex justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </TableCell>

                      <TableCell className="py-2 ">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="lg:hidden">
                            <Badge
                              className={`text-xs font-medium border transition-colors duration-200 inline-flex items-center gap-1 ${typeStyles.badge} ${typeStyles.hover}`}
                            >
                              {notification.type.replace(/_/g, " ")}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell py-2 text-center ">
                        <Badge
                          className={`text-xs font-medium border transition-colors duration-200 inline-flex items-start gap-1 ${typeStyles.badge} ${typeStyles.hover}`}
                        >
                          {notification.type.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-center py-2 ">
                        <Link
                          href={`/client/client-complaints/${notification.complaintId}?notificationId=${notification._id}`}
                        >
                          <Button
                            size="sm"
                            className="text-xs font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-200 rounded-lg shadow-sm min-w-[60px]"
                          >
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      ) : (
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
              <BellIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                No notifications yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 max-w-sm">
                When you receive notifications, they'll appear here for quick
                access.
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentNotification;
