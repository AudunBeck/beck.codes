import { withPlausibleProxy } from "next-plausible";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPlausibleProxy({
  customDomain: process.env.PLAUSIBLE_ANALYTICS_DOMAIN,
})(nextConfig);
