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
        CDN_ROOT: "",
        SECRET: "YOUR_SECRET_VALUE_HERE",
    },
    // experimental: {
    //     serverActions: true,
    // },
    // transpilePackages: ["antd"],
    images: {
        domains: ["localhost", "tours.frdev.asia"],
    },
    swcMinify: true,
    compiler: {
        styledComponents: true,
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
