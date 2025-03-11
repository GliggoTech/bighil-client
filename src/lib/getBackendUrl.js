export const getBackendUrl = () => {
  return process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL;
};
