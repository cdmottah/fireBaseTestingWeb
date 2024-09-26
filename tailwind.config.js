/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors:{
      main: {
        DEFAULT: '#3B82F6', // Color principal
        light: '#93C5FD',   // Color principal claro
        dark: 'hsl(236, 95%, 80%)',    // Color principal oscuro
      },
      // Colores de éxito
      success: {
        DEFAULT: '#4CAF50', // Color de éxito
        light: '#81C784',   // Color de éxito claro
        dark: '#388E3C',    // Color de éxito oscuro
      },
      // Colores de advertencia
      warning: {
        DEFAULT: '#FF9800', // Color de advertencia
        light: '#FFB74D',   // Color de advertencia claro
        dark: '#F57C00',    // Color de advertencia oscuro
      },
      // Colores de error
      danger: {
        DEFAULT: '#F44336', // Color de error
        light: '#EF9A9A',   // Color de error claro
        dark: '#C62828',    // Color de error oscuro
      },
      // Colores de información
      info: {
        DEFAULT: '#2196F3', // Color de información
        light: '#64B5F6',   // Color de información claro
        dark: '#1976D2',    // Color de información oscuro
      },
      // Colores para el modo oscuro
      dark: {
        background: '#111827', // Fondo oscuro
        title:{
          1:'#e2e8f0'
        },
        text: '#E0E0E0',       // Texto claro
        border: '#BB86FC',     // Borde oscuro
      },
      white: {
        background: '#e2e8f0', // Fondo claro
        title:{
          1:'#1a202c'
        },
        text: '#0f172a',       // Texto oscuro
        border: '#94a3b8',     // Borde claro
      },
      // Colores neutros
      gray: {
        100: '#F7FAFC',
        200: '#EDF2F7',
        300: '#E2E8F0',
        400: '#CBD5E0',
        500: '#A0AEC0',
        600: '#718096',
        700: '#4A5568',
        800: '#2D3748',
        900: '#1A202C',
      },
    },
    extend: {},
  },
  plugins: [],
}

