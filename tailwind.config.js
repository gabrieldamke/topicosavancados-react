/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "3.25rem": "3.25rem",
      },
      keyframes: {
        textShine: {
          "0%, 100%": { backgroundPosition: "100% center" },
          "50%": { backgroundPosition: "0 center" },
        },
      },
      animation: {
        "text-shine": "textShine 5s ease-in-out infinite alternate",
      },
      backgroundImage: {
        shine:
          "linear-gradient(to right, rgba(255,255,255,0.2) 40%, rgba(255,204,0,0.8) 50%, rgba(255,255,255,0.2) 60%)",
      },
      backgroundSize: {
        "500%": "500% 100%",
      },
      backgroundClip: {
        text: true,
      },
    },
  },
  plugins: [],
};
