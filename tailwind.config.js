/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      colors: {
        ink: {
          light: '#2c2c2c',
          DEFAULT: '#1a1a1a',
        },
        paper: {
          light: '#faf8f4',
          DEFAULT: '#f5f2ec',
        },
        accent: {
          DEFAULT: '#8b6f47',
          light: '#b8956a',
          dark: '#6b4f2e',
        }
      },
      lineHeight: {
        'chinese': '2.0',
        'chinese-loose': '2.2',
      }
    },
  },
  plugins: [],
}
