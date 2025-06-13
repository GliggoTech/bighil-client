import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

const ErrorPage = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  showRetry = true,
  showGoHome = true,
  showGoBack = false,
  onRetry,
  onGoHome,
  onGoBack,
  icon: CustomIcon,
  className = "",
  size = "default", // "small", "default", "large"
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry action - reload the page
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      // Default home action - navigate to dashboard
      window.location.href = "/client/client-dashboard";
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      // Default back action
      window.history.back();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          container: "p-4",
          icon: "w-8 h-8",
          title: "text-lg",
          message: "text-sm",
          button: "px-3 py-1.5 text-sm",
        };
      case "large":
        return {
          container: "p-12",
          icon: "w-16 h-16",
          title: "text-3xl",
          message: "text-lg",
          button: "px-6 py-3 text-base",
        };
      default:
        return {
          container: "p-8",
          icon: "w-12 h-12",
          title: "text-2xl",
          message: "text-base",
          button: "px-4 py-2 text-sm",
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const IconComponent = CustomIcon || AlertTriangle;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[400px] text-center ${sizeClasses.container} ${className}`}
    >
      {/* Error Icon */}
      <div className="mb-6">
        <div className="p-4 rounded-full bg-red/20 dark:bg-red-900/20">
          <IconComponent
            className={`${sizeClasses.icon} text-red dark:text-red-400`}
          />
        </div>
      </div>

      {/* Error Title */}
      <h2
        className={`${sizeClasses.title} font-semibold text-text_color dark:text-text-light mb-3`}
      >
        {title}
      </h2>

      {/* Error Message */}
      <p
        className={`${sizeClasses.message} text-text_color dark:text-text-muted mb-8 max-w-md`}
      >
        {message}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {showRetry && (
          <button
            onClick={handleRetry}
            className={`${sizeClasses.button} flex items-center gap-2 
                       bg-primary hover:bg-primary-dark 
                       text-white rounded-lg font-medium
                       transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}

        {showGoHome && (
          <button
            onClick={handleGoHome}
            className={`${sizeClasses.button} flex items-center gap-2
                       bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                       text-text_color dark:text-text-light rounded-lg font-medium
                       transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        )}

        {showGoBack && (
          <button
            onClick={handleGoBack}
            className={`${sizeClasses.button} flex items-center gap-2
                       border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800
                       text-text_color dark:text-text-light rounded-lg font-medium
                       transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
