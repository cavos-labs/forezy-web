module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-background',
    'text-text-primary',
    'text-text-secondary',
    'border-secondary',
    'bg-primary',
    'bg-secondary',
    'text-primary',
    'text-secondary',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        'text-primary': '#FFFFFF',
        'text-secondary': '#AAAAAA',
        primary: '#28FF5B',
        secondary: '#2BD353',
        border: '#222222',
        gradientfrom: '#28FF5B',
        gradientto: '#6AF98C',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        border: '#222222',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 