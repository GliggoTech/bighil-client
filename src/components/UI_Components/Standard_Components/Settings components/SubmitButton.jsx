import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

const SubmitButton = ({ loading }) => (
  <Button
    type="submit"
    disabled={loading}
    className="w-full relative overflow-hidden
               bg-gradient-to-r from-primary via-primary-light to-accent-info
               hover:from-primary-dark hover:via-primary hover:to-accent-info-dark
               text-white font-semibold py-5 rounded-lg
               transition-all transform hover:scale-[1.01]
               shadow-md hover:shadow-lg
               disabled:opacity-70 disabled:cursor-not-allowed"
  >
    <span
      className="absolute inset-0 bg-white/20 transform -skew-x-12
                     transition-transform duration-700
                     group-hover:translate-x-full"
    />
    <span className="relative flex items-center justify-center gap-2">
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Updating...</span>
        </>
      ) : (
        <>
          <Lock className="h-4 w-4" />
          <span>Update Password</span>
        </>
      )}
    </span>
  </Button>
);

export default SubmitButton;
