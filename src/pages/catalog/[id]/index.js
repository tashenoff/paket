import { PrismaClient } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Notification from '../../../components/Notification';
import { useCart } from '../../../../context/CartContext';
import Button from '../../../components/Button';

const prisma = new PrismaClient();

export async function getServerSideProps({ params, locale }) {
    const { id } = params;

    if (!id || isNaN(id)) {
        return { notFound: true };
    }

    const packageData = await prisma.package.findUnique({
        where: { id: parseInt(id) },
        include: {
            sizes: true,
            translations: {
                where: { language: locale },
            },
        },
    });

    if (!packageData) {
        return { notFound: true };
    }

    const translatedName = packageData.translations.length
        ? packageData.translations[0].name
        : packageData.name;

    return {
        props: {
            packageData: { ...packageData, translatedName },
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const PackagePage = ({ packageData }) => {
    const { t } = useTranslation('common');
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(100); // Минимальное количество — 100
    const [selectedSize, setSelectedSize] = useState(packageData.sizes[0] || null);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleQuantityChange = (e) => {
        // Убираем возможность вводить значения меньше 100
        const value = parseInt(e.target.value, 10);
        if (value % 100 === 0) {
            setQuantity(value);
        }
    };

    const handleIncrease = () => {
        // Увеличиваем на 100, если в наличии
        if (quantity < (selectedSize ? selectedSize.stockQuantity : 0) - 100) {
            setQuantity(quantity + 100);
        }
    };

    const handleDecrease = () => {
        // Уменьшаем на 100, если минимальное количество не меньше 100
        if (quantity > 100) {
            setQuantity(quantity - 100);
        }
    };

    const handleSizeChange = (e) => {
        const size = packageData.sizes.find((s) => s.id === parseInt(e.target.value));
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!selectedSize) return;

        const productToCart = {
            ...packageData,
            selectedSize: selectedSize.size,
            price: selectedSize.price,
            quantity: quantity, // Учитываем количество
        };

        addToCart(productToCart, productToCart.quantity, selectedSize.size);
        setNotificationMessage(`${packageData.translatedName} (${selectedSize.size}) ${t('catalog.item_added_to_cart')}`);
    };

    const handleNotificationClose = () => {
        setNotificationMessage('');
    };

    return (
        <div>
            {notificationMessage && (
                <Notification message={notificationMessage} onClose={handleNotificationClose} />
            )}

            <div className="container mx-auto px-20 py-10">
                <div className="grid gap-10 lg:grid-cols-2 items-start">
                    <div className="flex items-center justify-center bg-white rounded-lg w-full mb-4 md:mb-0">
                        <img
                            src={packageData.imageUrl || '/default-image.jpg'}
                            alt={packageData.translatedName}
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                    </div>

                    <div className="w-full bg-base-200 rounded-lg p-5">
                        <h1 className="text-2xl font-bold">{packageData.translatedName}</h1>
                        <p className="my-4">{packageData.description}</p>
                        <p className="my-4 flex justify-between w-full">
                            <span>{t('catalog.dimensions')}:</span> {selectedSize ? selectedSize.size : '-'}
                        </p>
                        <p className="my-4 flex justify-between w-full">
                            <span>{t('catalog.color')}:</span> {packageData.color}
                        </p>
                        <p className="flex justify-between w-full">
                            <span>{t('catalog.thickness')}:</span> {packageData.thickness}
                        </p>

                        <div className="my-4">
                            <label htmlFor="size" className="block font-medium mb-2">
                                {t('catalog.choose_size')}:
                            </label>
                            <select
                                id="size"
                                onChange={handleSizeChange}
                                className="bg-base-300 rounded-lg p-2 w-full"
                                value={selectedSize?.id || ''}
                            >
                                {packageData.sizes.map((size) => (
                                    <option key={size.id} value={size.id}>
                                        {size.size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedSize && selectedSize.stockQuantity === 0 ? (
                            <p className="text-red-500">{t('catalog.preorder')}</p>
                        ) : (
                            <p>{t('catalog.stock')}: {selectedSize.stockQuantity}</p>
                        )}

                        {selectedSize && (
                            <p className="mt-4 text-lg uppercase">
                                {t('catalog.price')}: {selectedSize.price} тенге за шт
                            </p>
                        )}

                        <div className="flex items-center justify-between w-full mt-4">
                            <div className="flex items-center w-full">
                                <button
                                    onClick={handleDecrease}
                                    className="w-8 h-8 bg-base-300 text-gray-500 rounded-lg flex items-center justify-center"
                                    disabled={quantity <= 100}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-16 border text-gray-500 bg-white rounded-lg p-1 mx-2 text-center"
                                    min="100"
                                    max={selectedSize ? selectedSize.stockQuantity : 0}
                                    step="100"
                                />
                                <button
                                    onClick={handleIncrease}
                                    className="w-8 h-8 bg-base-300 text-gray-500 rounded-lg flex items-center justify-center"
                                    disabled={quantity >= (selectedSize ? selectedSize.stockQuantity : 0)}
                                >
                                    +
                                </button>
                                <div className="ml-5">
                                    <Button
                                        label={t('catalog.add_to_cart')}
                                        onClick={handleAddToCart}
                                        variant="secondary"
                                        size="md"
                                    />
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-end my-4">
                                <Button label={'Заказать в один клик'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagePage;
