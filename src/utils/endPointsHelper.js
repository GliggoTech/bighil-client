export const endpoints = {
  user: {
    otpSent: "/api/forgot-password/user/sendOtp",
    otpVerify: "/api/forgot-password/user/verifyOtp",
    resetPassword: "/api/forgot-password/user/resetPassword",
    login: "/user/user-login",
  },
  bighil: {
    otpSent: "/api/forgot-password/bighil/sendOtp",
    otpVerify: "/api/forgot-password/bighil/verifyOtp",
    resetPassword: "/api/forgot-password/bighil/resetPassword",
    login: "/bighil/bighil-login",
  },
  client: {
    otpSent: "/api/forgot-password/client/sendOtp",
    otpVerify: "/api/forgot-password/client/verifyOtp",
    resetPassword: "/api/forgot-password/client/resetPassword",
    login: "/client/client-login",
  },
};
