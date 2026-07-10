import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary, #FAF8F5)",
          secondary: "var(--color-bg-secondary, #F2EAE4)",
        },
        text: {
          primary: "var(--color-text-primary, #1D0B11)",
          secondary: "var(--color-text-secondary, #5E5256)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #650728)",
          alt: "var(--color-accent-alt, #8F7E6D)",
        },
        border: "var(--color-border, #E8DFD8)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Fraunces", "serif"],
        body: ["var(--font-body)", "Be Vietnam Pro", "sans-serif"],
      },
      borderRadius: {
        button: "4px",
        input: "4px",
        card: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
