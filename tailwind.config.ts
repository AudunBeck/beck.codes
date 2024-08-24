import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: { prose: "72ch" },
      typography: (theme: any) => ({
        DEFAULT: { css: { em: { color: theme("colors.green.700") } } },
        invert: { css: { em: { color: theme("colors.green.400") } } },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
