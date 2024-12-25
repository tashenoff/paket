const CartButton = ({ totalItems, totalPrice, t }) => {
    return (
        <button className="flex items-center p-2 bg-gray-800 text-white rounded-full">
            <span className="mr-2">🛒</span>
            <div className="flex flex-col text-left">
                <span className="text-sm font-semibold">{t('miniCart.your_cart')}</span>
                <span className="text-xs">{t('miniCart.items')}: {totalItems}</span>
                <span className="text-xs">{t('miniCart.total')}: {totalPrice} ₽</span>
            </div>
        </button>
    );
};

export default CartButton;
