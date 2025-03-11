export const getReceiverRoles = (senderRole) => {
  return senderRole === "user" ? ["ADMIN", "SUPER ADMIN"] : ["user"];
};

//   // Usage in component
//   const receiverRoles = getReceiverRoles(msg.sender);
//   const isRead = receiverRoles.some(role => msg.readBy.includes(role));
