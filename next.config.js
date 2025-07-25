/** @type {import('next').NextConfig} */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  // reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  useFileSystemPublicRoutes: true,
  reactStrictMode: false,
  env: {
    API_ROOT: "https://chuyendotnet.com",
    LOCAL_API: "http://localhost:3000/api",
    NEXTAUTH_SECRET: "4ive5LE/Wgxa/W9p1NhnPxK5qP9LOSLsmejxdGfgOrI=",
    NEXTAUTH_URL: process.env.NODE_ENV === "production" ? "https://tours.frdev.asia" : "http://localhost:3000",
  },
  // experimental: {
  //     serverActions: true,
  // },
  // transpilePackages: ["antd"],
  images: {
    // domains: ["localhost", "tours.frdev.asia"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tours.frdev.asia",
        pathname: "/api/uploads/**",
      },
      {
        hostname: "localhost",
        port: "3000",
        pathname: "/api/uploads/**",
      },
    ],
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  // api: {
  //     bodyParser: false,
  // },
  // i18n: {
  //     locales: ["en", "vi"],
  //     defaultLocale: "vi",
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce"),
            to: path.join(__dirname, "public/assets/libs/tinymce"),
          },
        ],
      }),
    );
    return config;
  },
  // experimental: {
  //   // Required:
  //   appDir: true,
  // },
};

module.exports = withNextIntl(nextConfig);
