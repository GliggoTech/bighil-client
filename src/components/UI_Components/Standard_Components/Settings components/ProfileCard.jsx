import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "./UserAvatar";
import ProfileDetails from "./ProfileDetails";

export const ProfileCard = ({ userData }) => {
  const { name, email, role } = userData;

  return (
    <Card
      className="lg:col-span-1 shadow-lg hover:shadow-xl transition-all duration-300
                      border border-border dark:border-border-dark
                      bg-card dark:bg-card-dark"
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-center text-foreground dark:text-foreground-dark">
          Profile Information
        </CardTitle>
        <CardDescription className="text-center text-muted dark:text-muted-dark">
          Your account details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <UserAvatar name={name || userData.username} />
        <ProfileDetails userData={userData} />
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
