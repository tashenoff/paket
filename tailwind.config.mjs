/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Правильный путь для страниц
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Путь для компонентов
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Путь для app (если используется)
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui'), // Подключение DaisyUI
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Укажите используемые темы
    base: true, // Базовые стили DaisyUI (включены по умолчанию)
    styled: true, // Включение стандартной стилизации компонентов
    utils: true, // Включение утилитарных классов DaisyUI
    logs: true, // Логи для отладки (выводятся в консоль)
    rtl: false, // Поддержка RTL (если потребуется, можно включить)
  },
};
