// components/notifications/RecentNotification.jsx
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/formatDateFun";

const getNotificationIcon = (type) => {
  const iconClasses = "h-4 w-4";
  const icons = {
    NEW_COMPLAINT: <FileTextIcon className={`${iconClasses} text-primary`} />,
    STATUS_CHANGE: (
      <FileWarningIcon className={`${iconClasses} text-accent-warning`} />
    ),
    NOTE_ADDED: (
      <MessageSquareIcon className={`${iconClasses} text-secondary`} />
    ),
    PRIORITY_CHANGE: (
      <BellIcon className={`${iconClasses} text-accent-danger`} />
    ),
    RESOLUTION_ADDED: (
      <FileTextIcon className={`${iconClasses} text-accent-success`} />
    ),
  };
  return (
    icons[type] || <BellIcon className={`${iconClasses} text-text-secondary`} />
  );
};

const getTypeStyles = (type) => {
  const styles = {
    NEW_COMPLAINT: {
      badge: "bg-primary-light/10 text-primary border-primary/20",
      hover: "hover:bg-primary hover:text-text-light",
    },
    STATUS_CHANGE: {
      badge:
        "bg-accent-warning/10 text-accent-warning border-accent-warning/20",
      hover: "hover:bg-accent-warning hover:text-text-light",
    },
    NOTE_ADDED: {
      badge: "bg-secondary-light/10 text-secondary border-secondary/20",
      hover: "hover:bg-secondary hover:text-text-light",
    },
    NEW_MESSAGE: {
      badge: "bg-accent-danger/10 text-accent-danger border-accent-danger/20",
      hover: "hover:bg-accent-danger hover:text-text-light",
    },
    RESOLUTION_ADDED: {
      badge:
        "bg-accent-success/10 text-accent-success border-accent-success/20",
      hover: "hover:bg-accent-success hover:text-text-light",
    },
  };
  return styles[type] || styles.NEW_COMPLAINT;
};

const RecentNotification = ({ recentNotifications }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-border-light dark:border-border-dark rounded-2xl">
      <CardHeader className=" rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-background-secondary to-background-tertiary border-b border-border-light dark:border-border-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold text-text-primary dark:text-text-light">
              Recent Notifications
            </CardTitle>
          </div>
          {/* <Link href="/client/client-notifications" asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-medium hover:bg-primary hover:text-text-light transition-colors duration-200"
            >
              View All
            </Button>
          </Link> */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-surface-light dark:bg-surface-dark hover:bg-primary hover:text-white dark:hover:bg-background-dark"
            asChild
          >
            <Link href="/client/client-notifications">View All</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 rounded-2xl">
        <Table className="rounded-2xl">
          <TableHeader>
            <TableRow className="bg-background-secondary hover:bg-background-secondary dark:bg-surface-dark">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="font-semibold text-text-primary dark:text-text-light">
                Notification
              </TableHead>
              <TableHead className="w-[100px] font-semibold text-text-primary dark:text-text-light">
                Type
              </TableHead>
              {/* <TableHead className="w-[120px] font-semibold text-text-primary dark:text-text-light">
                Time
              </TableHead> */}
              <TableHead className="w-[100px] font-semibold text-text-primary dark:text-text-light">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-background-secondary dark:bg-surface-dark rounded-2xl">
            {recentNotifications.map((notification) => {
              const typeStyles = getTypeStyles(notification.type);
              return (
                <TableRow
                  key={notification._id}
                  className={`group hover:bg-background-secondary/50 transition-all duration-200
                    ${!notification.isRead ? "bg-primary/5" : ""}`}
                >
                  <TableCell className="pl-4">
                    <div
                      className="bg-background-secondary rounded-full p-2 flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-200"
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="">
                      {/* {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      )} */}
                      <div>
                        <p className="font-medium  text-text-primary dark:text-text-light">
                          {notification.message}
                        </p>
                        {/* <p className="text-xs text-text-secondary mt-1">
                          By {notification.senderName} •{" "}
                          {notification.senderModel}
                        </p> */}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`${typeStyles.badge} ${typeStyles.hover} 
                        font-normal text-xs border transition-colors duration-200`}
                    >
                      {notification.type.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>

                  {/* <TableCell>
                    <span className="text-xs text-text-secondary flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      {formatDate(notification.createdAt)}
                    </span>
                  </TableCell> */}

                  <TableCell>
                    <Link
                      href={`/client/client-complaints/${notification.complaintId}?notificationId=${notification._id}`}
                      className="flex items-center justify-center"
                    >
                      <Button
                        variant="outline"
                        className="text-xs font-medium hover:bg-primary hover:text-text-light
                          transition-all duration-200 group-hover:scale-105"
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
      </CardContent>
    </Card>
  );
};

export default RecentNotification;
