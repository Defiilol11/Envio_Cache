/** @type {import('tailwindcss').Config} */
let tailwind;
module.exports = tailwind = {
        config: {
          theme: {
            extend: {
              colors: {
                umes: {
                  green: { 900: '#0b3d2a', 800: '#0e4c2e', 700: '#125d38', 600: '#166e45' },
                  beige: { 50: '#f8f4ea', 100: '#efe6d9', 200: '#e3d6bf' },
                  gold: { 500: '#d1b06b' },
                  ink: '#0f221c',
                },
              },
              fontFamily: {
                sans: [
                  'Poppins',
                  'system-ui',
                  'Segoe UI',
                  'Roboto',
                  'Helvetica Neue',
                  'Arial',
                  'Noto Sans',
                  'Liberation Sans',
                  'sans-serif',
                ],
              },
              boxShadow: {
                card: '0 1px 2px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.06)',
              },
            },
          },
        },
      };
