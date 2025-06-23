/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
    serverComponentsExternalPackages: ["jose"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://new-bighil-server.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
