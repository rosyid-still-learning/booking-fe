/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "booking-be-production-38e5.up.railway.app",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "cdn.undiksha.ac.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
