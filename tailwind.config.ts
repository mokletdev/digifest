import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        xl: "1200px",
        lg: "810px",
        sm: "360px",
      },
      colors: {
        black: "#121212",
        white: "#fff",

        "neutral-50": "#F8F8F8",
        "neutral-100": "#DBDBDB",
        "neutral-200": "#C5C5C5",
        "neutral-300": "#ABABAB",
        "neutral-400": "#929292",
        "neutral-500": "#787777",
        "neutral-600": "#5F5C5C",
        "neutral-700": "#454242",

        "primary-50": "#FFEEEF",
        "primary-100": "#FF8388",
        "primary-200": "#FF8388",
        "primary-300": "#FF5157",
        "primary-400": "#ED1C24",
        "primary-500": "#BA050C",
        "primary-600": "#870005",
        "primary-700": "#540003",

        "secondary-50": "#EDF9FF",
        "secondary-100": "#B7E8FF",
        "secondary-200": "#81D7FF",
        "secondary-300": "#4CC6FF",
        "secondary-400": "#34A9E0",
        "secondary-500": "#1F86B7",
        "secondary-600": "#0E658E",
        "secondary-700": "#044666",

        "warning-50": "#FFFDFA",
        "warning-100": "#FFF9EE",
        "warning-200": "#FFF7E1",
        "warning-300": "#FFEAB3",
        "warning-400": "#FFDD82",
        "warning-500": "#FFC62B",
        "warning-600": "#FFAD0D",
        "warning-700": "#FE9B0E",

        "success-50": "#FBFEFC",
        "success-100": "#F2FAF6",
        "success-200": "#E5F5EC",
        "success-300": "#C0E5D1",
        "success-400": "#97D4B4",
        "success-500": "#6BC497",
        "success-600": "#47B881",
        "success-700": "#0C9D61",

        "info-50": "#F8FCFF",
        "info-100": "#F1F8FF",
        "info-200": "#E4F2FF",
        "info-300": "#BDDDFF",
        "info-400": "#93C8FF",
        "info-500": "#4BA1FF",
        "info-600": "#3B82F6",
        "info-700": "#3A70E2",
      },
    },
  },
  plugins: [],
};
export default config;
