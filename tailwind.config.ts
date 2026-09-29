import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1b1713",
        card: "#251f19",
        line: "#3a3128",
        cream: "#f3ead9",
        muted: "#a99b86",
        leaf: "#7fb069",
        leafdark: "#5c8a4a",
        amber: "#e0a458",
      },
      fontFamily: { display: ["Georgia", "serif"] },
    },
  },
  plugins: [],
};
export default config;
