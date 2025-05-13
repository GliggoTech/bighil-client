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

const getNotificationIcon = (type) => {
  const iconClasses = "h-4 w-4";
  const icons = {
    NEW_COMPLAINT: <FileTextIcon className={`${iconClasses} text-primary`} />,
    STATUS_CHANGE: (
      <FileWarningIcon className={`${iconClasses} text-warning`} />
    ),
    NOTE_ADDED: (
      <MessageSquareIcon className={`${iconClasses} text-secondary`} />
    ),
    PRIORITY_CHANGE: <BellIcon className={`${iconClasses} text-danger`} />,
    RESOLUTION_ADDED: (
      <FileTextIcon className={`${iconClasses} text-success`} />
    ),
  };
  return icons[type] || <BellIcon className={`${iconClasses} text-light`} />;
};

const getTypeStyles = (type) => {
  const styles = {
    NEW_COMPLAINT: {
      badge: "bg-primary/10 text-primary border-primary/20",
      hover: "hover:bg-primary hover:text-light",
    },
    STATUS_CHANGE: {
      badge: "bg-warning/10 text-warning border-warning/20",
      hover: "hover:bg-warning hover:text-light",
    },
    NOTE_ADDED: {
      badge: "bg-muted/10 text-muted-foreground border-muted/20",
      hover: "hover:bg-muted hover:text-light",
    },
    NEW_MESSAGE: {
      badge: "bg-danger/10 text-danger border-danger/20",
      hover: "hover:bg-danger hover:text-light",
    },
    RESOLUTION_ADDED: {
      badge: "bg-success/10 text-success border-success/20",
      hover: "hover:bg-success hover:text-light",
    },
  };
  return styles[type] || styles.NEW_COMPLAINT;
};

const RecentNotification = ({ recentNotifications }) => {
  return (
    <Card className="rounded-3xl hover:shadow-xl transition-all duration-300 border-light dark:border-border-dark">
      <CardHeader className="bg-white border-b border-dialog_inside_border_color dark:border-border-dark relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold text-text_color dark:text-text-light">
              Recent Notifications
            </CardTitle>
          </div>
          <Button
            className="text-sm font-medium text-white bg-blue hover:bg-blue/90"
            asChild
          >
            <Link href="/client/client-notifications">View All</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table className="w-full border border-dialog_inside_border_color rounded-b-3xl">
          <TableHeader className="!border-b-2 !border-dialog_inside_border_color dark:!border-b-gray-700">
            <TableRow className="bg-white dark:bg-surface-dark">
              <TableHead />
              <TableHead className="xl:w-[250px] font-semibold text-text_color dark:text-text-light">
                Notification
              </TableHead>
              <TableHead className=" hidden md:table-cell font-semibold text-text_color dark:text-text-light">
                Type
              </TableHead>
              <TableHead className="font-semibold text-text_color dark:text-text-light">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white dark:bg-surface-dark rounded-full">
            {recentNotifications.map((notification) => {
              const typeStyles = getTypeStyles(notification.type);
              return (
                <TableRow
                  key={notification._id}
                  className="hover:bg-gray-100 dark:hover:bg-surface-dark/80 border-b border-dialog_inside_border_color dark:border-border-dark transition-colors duration-200"
                >
                  <TableCell className="pl-4 ">
                    {getNotificationIcon(notification.type)}
                  </TableCell>

                  <TableCell className="text-sm">
                    {notification.message}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <Badge
                      className={`text-xs font-normal border transition-colors duration-200 ${typeStyles.badge} ${typeStyles.hover}`}
                    >
                      {notification.type.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Link
                      href={`/client/client-complaints/${notification.complaintId}?notificationId=${notification._id}`}
                    >
                      <Button
                        variant="outline"
                        className="text-xs text-white border-none bg-primary hover:bg-primary/80 transition-all duration-200"
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
