/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ['var(--font-kumbh)'],
        body: ['var(--font-montserrat)']
      }
    }
  },
  plugins: [require('@tailwindcss/forms'),],
}
