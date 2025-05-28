export function getRoleTitle(role) {
  switch (role) {
    case "SUPER ADMIN":
      return "Audit Committee Chairman";
    case "SUB ADMIN":
      return "Complaint Officer";
    case "ADMIN":
      return "Tech Support";
    case "user":
      return "General User";
    default:
      return "Unknown Role";
  }
}
