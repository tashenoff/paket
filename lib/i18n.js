import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../public/locales/en/common.json';
import ruTranslation from '../public/locales/ru/common.json';

i18n
  .use(initReactI18next) // Подключаем инициализацию для React
  .init({
    resources: {
      en: {
        common: enTranslation,
      },
      ru: {
        common: ruTranslation,
      },
    },
    lng: 'en', // Язык по умолчанию
    fallbackLng: 'en', // Язык по умолчанию, если перевода нет
    interpolation: {
      escapeValue: false, // Не экранировать HTML
    },
  });

export default i18n;
