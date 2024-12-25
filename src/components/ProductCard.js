import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import dynamic from 'next/dynamic'; // Импорт dynamic из Next.js
const Notification = dynamic(() => import('./Notification'), { ssr: false });

const PackagePage = ({ product }) => {
    const { t } = useTranslation('common');
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(100); // Изначально ставим 100
    const [selectedSize, setSelectedSize] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
    const [showNotification, setShowNotification] = useState(false); // Стейт для отображения уведомления

    useEffect(() => {
        if (product.sizes && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0]); // Выбираем первый размер по умолчанию
        } else {
            setSelectedSize(null); // Если размеров нет, устанавливаем null
        }
        setIsLoading(false); // Данные загружены
    }, [product]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value % 100 === 0) { // Проверяем, что число кратно 100
            setQuantity(value);
        }
    };


    const handleSizeChange = (e) => {
        const size = product.sizes.find((s) => s.id === parseInt(e.target.value));
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (selectedSize && quantity >= 100) {
            const productWithSelectedSize = {
                ...product,
                selectedSize: selectedSize.size, // Размер
                price: selectedSize.price, // Цена выбранного размера
            };
            addToCart(productWithSelectedSize, quantity, selectedSize.size); // Передаем в корзину
            setShowNotification(true); // Показываем уведомление
            setTimeout(() => setShowNotification(false), 3000); // Скрываем уведомление через 3 секунды
        }
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 100); // Увеличиваем на 100
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 100 ? prev - 100 : 100)); // Уменьшаем на 100, но не ниже 100
    };

    if (isLoading) {
        return <p>{t('catalog.loading')}</p>; // Показываем сообщение о загрузке
    }

    // Добавляем проверку на null для selectedSize
    const renderStockInfo = () => {
        if (!selectedSize) {
            return <p className="text-sm text-gray-500">{t('catalog.not_available')}</p>; // Если selectedSize пустое
        }

        if (selectedSize.stockQuantity === 0) {
            return <p className="text-red-500">{t('catalog.preorder')}</p>; // Сообщение о предзаказе
        }

        return <p>{t('catalog.stock')}: {selectedSize.stockQuantity}</p>; // Количество в наличии
    };

    return (
        <div className="card bg-base-200 shadow-xl">
            <figure className='bg-white'>
                <Link href={`/catalog/${product.id}`}>
                    <img
                        src={product.imageUrl}
                        alt={product.translatedName}
                        className="h-40 object-cover"
                    />
                </Link>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.translatedName}</h2>

                <p>{product.color}</p>

                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={decreaseQuantity}
                            className="btn btn-sm bg-base-300"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="input input-bordered w-20 mx-2"
                            min="100"
                            step="100" // Шаг 100
                        />
                        <button
                            onClick={increaseQuantity}
                            className="btn btn-sm bg-base-300"
                        >
                            +
                        </button>
                    </div>

                    <div>
                        <p className="text-lg font-bold">
                            {selectedSize ? `${selectedSize.price} ₸` : `${product.price} ₸`}
                           <span> за шт</span>
                        </p>
                        {/* Здесь теперь вызываем функцию renderStockInfo */}
                        {renderStockInfo()}
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="size" className="block text-sm font-medium">
                        {t('catalog.choose_size')}:
                    </label>
                    <select
                        id="size"
                        value={selectedSize ? selectedSize.id : ''}
                        onChange={handleSizeChange}
                        className="select select-bordered w-full mt-2"
                    >
                        {product.sizes.map((size) => (
                            <option key={size.id} value={size.id}>
                                {size.size} - {size.price} {t('catalog.currency')}
                                {size.stockQuantity === 0 ? ` (${t('catalog.preorder')})` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="card-actions mt-4">
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-primary w-full"
                    >
                        {t('catalog.add_to_cart')}
                    </button>
                </div>
            </div>

            {/* Уведомление */}
            {showNotification && <Notification message={t('catalog.added_to_cart')} onClose={() => setShowNotification(false)} />}
        </div>
    );
};

export default PackagePage;
