// src/pages/catalog.js
import { PrismaClient } from '@prisma/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCart } from '../../../context/CartContext'; // Подключаем хук для работы с корзиной
import { useState } from 'react';
import Notification from '../../components/Notification'; // Подключаем компонент уведомлений
import dynamic from 'next/dynamic'; // Импорт dynamic из Next.js
import SearchBar from '../../components/SearchBar'; // Импортируем компонент поиска
const ProductCard = dynamic(() => import('../../components/ProductCard'), { ssr: false });

const prisma = new PrismaClient();

export async function getServerSideProps({ locale }) {
  const packages = await prisma.package.findMany({
    include: {
      sizes: true, // Загружаем размеры для каждого товара
      translations: {
        where: { language: locale },
      },
    },
  });

  const packagesWithTranslatedNames = packages.map((pkg) => {
    const translatedName = pkg.translations.length
      ? pkg.translations[0].name
      : pkg.name;

    return {
      ...pkg,
      translatedName,
    };
  });

  return {
    props: {
      packages: packagesWithTranslatedNames,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const Catalog = ({ packages }) => {
  const { t } = useTranslation('common');
  const { addToCart } = useCart(); // Хук для добавления товара в корзину
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPackages, setFilteredPackages] = useState(packages);

  // Функция для обработки поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = packages.filter((pkg) =>
      pkg.translatedName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPackages(filtered);
  };

  const handleAddToCart = (product, quantity, selectedSize) => {
    addToCart(product, quantity, selectedSize); // Добавляем товар в корзину
    console.log('Товар добавлен в корзину:', product);
    setNotificationMessage(`${product.translatedName} (${selectedSize}) ${t('catalog.added_to_cart')}`); // Сообщение для уведомления
  };

  return (
    <div>
      {notificationMessage && (
        <Notification message={notificationMessage} onClose={() => setNotificationMessage(null)} />
      )}


      <div className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        {filteredPackages.length === 0 ? (
          <div className="text-center">{t('catalog.no_products_found')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {filteredPackages.map((pkg) => (
              <ProductCard
                key={pkg.id}
                product={pkg}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
