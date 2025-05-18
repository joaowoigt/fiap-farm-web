import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    screens: {
      mobile: { max: "360px" },
    },
    extend: {
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
      colors: {
        background: "var(--primary)",
        foreground: "var(--foreground)",
        primary: "#004D61",
        secondary: "#47A138",
        secondaryVariant: "#E4EDE3",
        negative: "#FF5031",
        gradientStart: "#004D61",
        gradientEnd: "#FFFFFF",
        grey: "#DEE9EA",
        white: "#F8F8F8",
        darkGray: "#8B8B8B",
        grayVariant: "#CBCBCB",
      },
      fontSize: {
        big: "25px",
        medium: "20px",
        small: "16px",
        extra_small: "13px",
      },
      spacing: {
        extraBig: "32px",
        small: "8px",
        medium: "16px",
        big: "24px",
      },
    },
  },
  plugins: [],
};
export default config;
