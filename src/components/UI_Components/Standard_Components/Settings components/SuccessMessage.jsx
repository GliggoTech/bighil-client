import { CheckCircle } from "lucide-react";

const SuccessMessage = ({ message }) => (
  <div
    className="rounded-lg bg-accent-success/10 dark:bg-accent-success-dark/10
                    border border-accent-success/20 dark:border-accent-success-dark/20
                    p-3 text-center text-accent-success dark:text-accent-success-light
                    animate-fade-in"
  >
    <p className="flex items-center justify-center gap-2">
      <CheckCircle className="h-4 w-4" />
      <span>{message}</span>
    </p>
  </div>
);

export default SuccessMessage;
