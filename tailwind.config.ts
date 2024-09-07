import type { Config } from "tailwindcss";
import type { PluginUtils } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: { em: { color: theme("colors.green.700") }, maxWidth: "72ch" },
        },
        invert: { css: { em: { color: theme("colors.green.400") } } },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
