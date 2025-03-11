import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const PasswordFields = ({ form }) => {
  const passwordFields = [
    {
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm new password",
    },
  ];

  return (
    <>
      {passwordFields.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2 text-foreground dark:text-foreground-dark">
                <Lock className="h-4 w-4 text-primary" />
                <span>{field.label}</span>
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    {...formField}
                    type="password"
                    placeholder={field.placeholder}
                    className="rounded-lg py-5 px-4
                               border-border dark:border-border-dark
                               bg-background/50 dark:bg-background-dark/50
                               text-foreground dark:text-foreground-dark
                               placeholder:text-muted dark:placeholder:text-muted-dark
                               focus-visible:ring-2 focus-visible:ring-primary
                               focus-visible:border-primary
                               transition-all duration-300"
                  />
                  <div
                    className="absolute inset-0 rounded-lg
                                  border border-primary/0 group-hover:border-primary/50
                                  pointer-events-none transition-all duration-300"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-accent-danger dark:text-accent-danger-light" />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

export default PasswordFields;
