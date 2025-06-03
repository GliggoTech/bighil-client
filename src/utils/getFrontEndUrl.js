export const getFrontEndURL = () => {
  return process.env.NEXT_PUBLIC_NODE_DEV != "production"
    ? process.env.NEXT_PUBLIC_CLIENT_DEV_URL
    : process.env.NEXT_PUBLIC_CLIENT_PROD_URL;
};
