const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  reactStrictMode: true,
  i18n: i18n,
  webpack: (config, context) => {
    const { isServer } = context;
    if (phase === PHASE_DEVELOPMENT_SERVER && !isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    return config;
  },
  swcMinify: true,
});

module.exports = nextConfig;
