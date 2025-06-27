/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.bighil.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
