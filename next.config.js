/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
    env: {
        API_ROOT: "http://localhost:3000",
        CDN_ROOT: "",
        SECRET: "YOUR_SECRET_VALUE_HERE",
    },
    transpilePackages: ["antd"],
    swcMinify: true,
    // experimental: {
    //   // Required:
    //   appDir: true,
    // },
};

module.exports = nextConfig;
