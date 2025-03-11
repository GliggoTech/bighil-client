import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => (
  <div
    className="rounded-lg bg-accent-danger/10 dark:bg-accent-danger-dark/10
                    border border-accent-danger/20 dark:border-accent-danger-dark/20
                    p-3 text-center text-accent-danger dark:text-accent-danger-light
                    animate-shake"
  >
    <p className="flex items-center justify-center gap-2">
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </p>
  </div>
);

export default ErrorMessage;
