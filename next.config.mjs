/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.arweave.net",
      },
      {
        protocol: "http",
        hostname: "74.119.194.123",
      },
    ],
  },
};

export default nextConfig;
