import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id, item.selectedSize); // Удаляем элемент
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id} // Уникальный ключ для работы анимации
        className="flex border-b border-opacity-25 border-white py-3 justify-between items-center"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }} // Анимация при удалении
        transition={{ duration: 0.4 }} // Плавность анимации
      >
        {/* Левая часть с изображением */}
        <div className="flex items-center">
          <img
            src={item.imageUrl || '/default-image.jpg'}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <p className="text-sm">{item.name}</p>
            {item.selectedSize && (
              <p className="text-xs text-gray-500">Размер: {item.selectedSize}</p>
            )}

                {/* Правая часть с ценой и количеством */}
        <p className="text-sm">
          {item.quantity} x {item.price} ₸
        </p>
          </div>
        </div>

    

        {/* Кнопка удаления */}
        <button
          onClick={handleRemove}
          className="text-white hover:text-red-800 text-sm ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartItem;
