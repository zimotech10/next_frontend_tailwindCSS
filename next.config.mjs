/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.arweave.net",
      },
    ],
  },
};

export default nextConfig;
