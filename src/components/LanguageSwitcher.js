// src/components/LanguageSwitcher.js
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    router.push(router.asPath, undefined, { locale: lang }); // Перезагружаем текущую страницу с новым языком
  };

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-4 py-2 rounded-md focus:outline-none"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
