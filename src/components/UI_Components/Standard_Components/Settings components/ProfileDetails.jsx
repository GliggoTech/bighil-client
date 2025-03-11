import { MailIcon, ShieldIcon, UserIcon } from "lucide-react";
import ProfileDetailItem from "./ProfileDetailItem";

const ProfileDetails = ({ userData }) => {
  const details = [
    { icon: UserIcon, label: "Name", value: userData.name },
    { icon: MailIcon, label: "Email", value: userData.email },
    { icon: ShieldIcon, label: "Role", value: userData.role },
  ];

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <ProfileDetailItem key={index} {...detail} />
      ))}
    </div>
  );
};

export default ProfileDetails;
