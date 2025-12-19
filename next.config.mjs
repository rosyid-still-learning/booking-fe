/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.undiksha.ac.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
