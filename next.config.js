/** @type {import('next').NextConfig} */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
    // reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
    reactStrictMode: false,
    env: {
        API_ROOT: "https://fahapi.com",
        LOCAL_API: "http://localhost:3000/api",
        CDN_ROOT: "",
        SECRET: "YOUR_SECRET_VALUE_HERE",
    },
    // transpilePackages: ["antd"],

    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    api: {
        bodyParser: false,
    },
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

module.exports = nextConfig;
