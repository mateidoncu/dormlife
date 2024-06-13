import type { Config } from "tailwindcss";
const {fontFamily} = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B9AC4",
        primary_dark: "#4059AD",
        primary_light: "#D8E1FF",
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
