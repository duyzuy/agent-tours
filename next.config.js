/** @type {import('next').NextConfig} */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

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
    experimental: {
        serverActions: true,
    },
    // transpilePackages: ["antd"],
    images: {
        domains: ["localhost", "tours.frdev.asia"],
    },
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    api: {
        bodyParser: false,
    },
    // i18n: {
    //     locales: ["en", "vi"],
    //     defaultLocale: "vi",
    // },
    // async headers() {
    //     return [
    //         {
    //             source: "/with-locale", // automatically handles all locales
    //             headers: [
    //                 {
    //                     key: "x-hello",
    //                     value: "world",
    //                 },
    //             ],
    //         },
    //         {
    //             // does not handle locales automatically since locale: false is set
    //             source: "/nl/with-locale-manual",
    //             locale: false,
    //             headers: [
    //                 {
    //                     key: "x-hello",
    //                     value: "world",
    //                 },
    //             ],
    //         },
    //         {
    //             // this matches '/' since `en` is the defaultLocale
    //             source: "/en",
    //             locale: false,
    //             headers: [
    //                 {
    //                     key: "x-hello",
    //                     value: "world",
    //                 },
    //             ],
    //         },
    //         {
    //             // this gets converted to /(en|fr|de)/(.*) so will not match the top-level
    //             // `/` or `/fr` routes like /:path* would
    //             source: "/(.*)",
    //             headers: [
    //                 {
    //                     key: "x-hello",
    //                     value: "world",
    //                 },
    //             ],
    //         },
    //     ];
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

module.exports = nextConfig;
