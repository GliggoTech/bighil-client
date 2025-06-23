export const accessControl = {
  // 🔒 Bighil-level super admin
  BIGHIL: [
    "/bighil/bighil-dashboard",
    "/bighil/bighil-clients",
    "/bighil/bighil-complaints",
    "/bighil/bighil-messages",
    "/bighil/bighil-setting",
  ],

  // 🔒 Client-level admin roles
  ADMIN: [
    "/client/client-dashboard",
    "/client/client-complaints",
    "/client/client-statistics",
    "/client/client-myAccount",
    "/client/client-notifications",
    "/client/client-setting",
  ],
  "SUPER ADMIN": [
    "/client/client-dashboard",
    "/client/client-complaints",
    "/client/client-statistics",
    "/client/client-myAccount",
    "/client/client-notifications",
    "/client/client-setting",
  ],
  "SUB ADMIN": [
    "/client/client-dashboard",
    "/client/client-complaints",
    "/client/client-statistics",
    "/client/client-myAccount",
    "/client/client-notifications",
    "/client/client-setting",
  ],

  // 🔒 General user
  user: [

    "/user/user-dashboard",
    "/user/user-add-complaint",
    "/user/user-myAccount",
    "/user/user-notifications",
    "/user/user-setting",
  ],
};
