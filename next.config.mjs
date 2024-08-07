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
        hostname: "95.164.7.220",
      },
    ],
  },
};

export default nextConfig;
