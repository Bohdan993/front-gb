/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["uk", "en"],
    defaultLocale: "uk",
    localeDetection: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["back-getbase.dev.digitalart.agency", "api.getbase.online"],
  },
};

module.exports = nextConfig;
