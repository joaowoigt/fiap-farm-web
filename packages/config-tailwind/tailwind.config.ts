import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#43A047",
          light: "#66BB6A",
        },
        secondary: {
          DEFAULT: "#FFB300",
          light: "#FFD54F",
        },
        text: {
          DEFAULT: "#212121",
          secondary: "#757575",
        },
        background: {
          DEFAULT: "#E0E0E0",
        },
        error: {
          DEFAULT: "#E53935",
          light: "#EF5350",
        },
      },

      // 🔠 Fontes personalizadas
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      // 🔡 Tamanhos de fonte (em rem)
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      },

      // 📏 Espaçamentos (em rem) - para paddings, margins, gaps
      spacing: {
        "0": "0rem",
        "1": "0.25rem", // 4px
        "2": "0.5rem", // 8px
        "3": "0.75rem", // 12px
        "4": "1rem", // 16px
        "5": "1.25rem", // 20px
        "6": "1.5rem", // 24px
        "8": "2rem", // 32px
        "10": "2.5rem", // 40px
        "12": "3rem", // 48px
        "16": "4rem", // 64px
        "20": "5rem", // 80px
      },
    },
  },
  plugins: [],
};
export default config;
