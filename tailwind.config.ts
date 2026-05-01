import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F4F1EA",
        cream: "#EFE9DC",
        ink: "#0E0E0C",
        graphite: "#1A1A17",
        smoke: "#2A2A26",
        amber: {
          DEFAULT: "#E9B949",
          deep: "#C2941F",
        },
        moss: {
          DEFAULT: "#3F5236",
          deep: "#2A3823",
        },
        copper: "#B86F3C",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "display-tight": "-0.035em",
      },
      backgroundImage: {
        "grain":
          "radial-gradient(rgba(14,14,12,0.05) 1px, transparent 1px)",
        "blueprint":
          "linear-gradient(rgba(63,82,54,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(63,82,54,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grain-sm": "3px 3px",
        "blueprint-md": "32px 32px",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
