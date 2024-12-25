import { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const CartContext = createContext();

// Хук для использования корзины
export const useCart = () => {
  return useContext(CartContext);
};

// Провайдер для оборачивания приложения
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Инициализация корзины как пустого массива
  const [totalPrice, setTotalPrice] = useState(0);

  // Загружаем корзину из localStorage при старте
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedSize) => {
    setCart((prevCart) => {
      // Проверка на наличие товара с таким размером
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
  
      if (existingProduct) {
        // Если товар с этим размером уже есть в корзине, обновляем только количество
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
  
      // Если товар с этим размером еще не добавлен в корзину, добавляем новый товар
      return [
        ...prevCart,
        { ...product, quantity, selectedSize }
      ];
    });
  };
  
  
  

  
  


// Функция для удаления товара из корзины и обновления localStorage
const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Обновляем localStorage
      return updatedCart;
    });
  };
  
  // Функция для обновления количества товара в корзине
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => 
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Функция для подсчета общей стоимости
  const calculateTotalPrice = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Обновляем общую стоимость при изменении корзины
  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
