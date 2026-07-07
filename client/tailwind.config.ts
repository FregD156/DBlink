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
          secondary: "var(--color-bg-secondary, #EFE6DC)",
        },
        text: {
          primary: "var(--color-text-primary, #221C18)",
          secondary: "var(--color-text-secondary, #6B625B)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #C24E3A)",
          alt: "var(--color-accent-alt, #3F4B3B)",
        },
        border: "var(--color-border, #E3DDD3)",
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
