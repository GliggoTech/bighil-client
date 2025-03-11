export const WelcomeMessage = ({ userRole }) => {
  const messages = {
    "SUPER ADMIN":
      "You have full system access and oversight of all operations.",
    ADMIN: "You have access to most system functions and reporting tools.",
    "SUB ADMIN": "You can manage team activities and handle escalated issues.",
    DEFAULT: "Welcome to your administration dashboard.",
  };

  return messages[userRole] || messages.DEFAULT;
};
