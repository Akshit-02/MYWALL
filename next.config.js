/** @type {import('next').NextConfig} */
//const webpack = require("webpack");
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  images: {
    // domains: ["yt3.ggpht.com","i.ytimg.com","scontent.famd1-1.fna.fbcdn.net","scontent.cdninstagram.com","scontent.fstv5-1.fna.fbcdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/home",
  //       destination: `https://${process.env.HOME_PAGE_URL}`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
