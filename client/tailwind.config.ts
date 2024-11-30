import { nextui } from '@nextui-org/react'

import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        dividerWeight: '1px',
        disabledOpacity: 0.5,
        fontSize: {
          tiny: '0.75rem', // text-tiny
          small: '0.875rem', // text-small
          medium: '1rem', // text-medium
          large: '1.125rem', // text-large
        },
        lineHeight: {
          tiny: '1rem', // text-tiny
          small: '1.25rem', // text-small
          medium: '1.5rem', // text-medium
          large: '1.75rem', // text-large
        },
        radius: {
          small: '4px', // rounded-small
          medium: '8px', // rounded-medium
          large: '10px', // rounded-large
        },
        borderWidth: {
          small: '1px', // border-small
          medium: '1px', // border-medium
          large: '2px', // border-large
        },
      },
      themes: {
        light: {
          colors: {
            background: '#F0FCFF',
            foreground: '#053B48',
            primary: {
              DEFAULT: '#053B48',
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            background: '#0d0d0e',
            foreground: '#F0FCFF',
            primary: {
              DEFAULT: '#053B48',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
} satisfies Config
