import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordForm from "./PasswordForm";

export const PasswordUpdateCard = ({ form, onSubmit, loading, error }) => (
  <Card
    className="lg:col-span-2 shadow-lg hover:shadow-xl transition-all duration-300
                    border border-border dark:border-border-dark
                    bg-card dark:bg-card-dark"
  >
    <CardHeader className="pb-4">
      <CardTitle className="text-xl text-foreground dark:text-foreground-dark">
        Change Password
      </CardTitle>
      <CardDescription className="text-muted dark:text-muted-dark">
        Update your password to keep your account secure
      </CardDescription>
    </CardHeader>
    <CardContent>
      <PasswordForm
        form={form}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </CardContent>
  </Card>
);

export default PasswordUpdateCard;
