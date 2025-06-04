/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",              // Adjust according to your project structure
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/React component files
  ],
  theme: {
    extend: {
      // You can customize your theme here
      colors: {
        "primary": "#1e40af",  // example custom color
        "secondary": "#f59e0b",
        "topbarRed": "#ea2e0e"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add Tailwind plugins here
    // Example: require('@tailwindcss/forms'),
  ],
}
