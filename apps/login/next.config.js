/** @type {import('next').NextConfig} */

const DASHBOARD_URL = process.env.DASHBOARD_URL || "http://localhost:3001";
const LOGIN_URL = process.env.LOGIN_URL || "http://localhost:3002";

module.exports = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  assetPrefix: "/login",
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: `http://localhost:3001/`,
        source: "/dashboard/:path*",
        destination: `http://localhost:3001/:path*`,
      },
    ];
  },
};
