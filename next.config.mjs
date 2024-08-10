import { withPlausibleProxy } from "next-plausible";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPlausibleProxy({
  subdirectory: process.env.PLAUSIBLE_ANALYTICS_SUBDIRECTORY,
  customDomain: process.env.PLAUSIBLE_ANALYTICS_DOMAIN,
})(nextConfig);
