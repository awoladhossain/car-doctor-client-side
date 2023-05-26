/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   themes: [
        {
          mytheme: {
          
 "primary": "#5f2ead",
          
 "secondary": "#f9f9a2",
          
 "accent": "#a6fcb9",
          
 "neutral": "#252D41",
          
 "base-100": "#363036",
          
 "info": "#92AADD",
          
 "success": "#5DDAA6",
          
 "warning": "#F7BC50",
          
 "error": "#FC3636",
          },
        },
      ],
  plugins: [require("daisyui")],
}

