/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack:{},
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 300,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
