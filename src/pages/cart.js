import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalPhone, setAdditionalPhone] = useState('');
  const [comment, setComment] = useState('');
  const [deliveryMethodId, setDeliveryMethodId] = useState(1); // ID способа доставки
  const [deliveryAddress, setDeliveryAddress] = useState(''); // Адрес доставки

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (productId, event) => {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fullName || !phone || !email || !deliveryMethodId) {
      alert('Пожалуйста, заполните все обязательные поля!');
      return;
    }

    if (!cart || cart.length === 0) {
      alert('Ваша корзина пуста');
      return;
    }

    if ((deliveryMethodId === 2 || deliveryMethodId === 3) && !deliveryAddress) {
      alert('Пожалуйста, укажите адрес доставки!');
      return;
    }

    const deliveryMethods = {
      1: 'Самовывоз',
      2: 'Доставка до двери',
      3: 'Доставка по Казахстану',
    };

    const orderItems = cart
      .map(
        (item) => `- ${item.translatedName} (${item.selectedSize || 'Без размера'}) - ${item.quantity} шт. по ${item.price} ₸`
      )
      .join('\n');

    const message = `Здравствуйте!\nМой заказ:\n\n` +
      `ФИО: ${fullName}\n` +
      `Телефон: ${phone}\n` +
      (additionalPhone ? `Доп. телефон: ${additionalPhone}\n` : '') +
      `Email: ${email}\n` +
      `Комментарий: ${comment || 'Нет'}\n` +
      `Способ доставки: ${deliveryMethods[deliveryMethodId]}\n` +
      ((deliveryMethodId === 2 || deliveryMethodId === 3) ? `Адрес доставки: ${deliveryAddress}\n` : '') +
      `Общая стоимость: ${totalPrice} тенге\n\nТовары:\n${orderItems}`;

    const whatsappURL = `https://wa.me/+77781647391?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  if (!isClient) return null;

  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-center p-5'>Оформление заказа</h1>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className='p-5'>
            <h2>Товары в корзине:</h2>
            {cart.length === 0 ? (
              <p>Ваша корзина пуста</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between border p-4 mb-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.translatedName}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h2>{item.translatedName}</h2>
                    <p>{item.price} ₸</p>
                    <p>{item.selectedSize && `Размер: ${item.selectedSize}`}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, e)}
                      className="w-16 p-1"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div>
            <div className="mt-4 p-5 text-center">
              <h3>Общая стоимость: {totalPrice} тенге</h3>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 p-5">
              <div>
                <label htmlFor="fullName">ФИО</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="border p-2 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="border p-2 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email">Электронная почта</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border p-2 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="additionalPhone">Дополнительный телефон</label>
                <input
                  type="tel"
                  id="additionalPhone"
                  value={additionalPhone}
                  onChange={(e) => setAdditionalPhone(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="comment">Комментарий</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="deliveryMethod">Способ доставки</label>
                <select
                  id="deliveryMethod"
                  value={deliveryMethodId}
                  onChange={(e) => setDeliveryMethodId(parseInt(e.target.value))}
                  className="border p-2 w-full"
                >
                  <option value="1">Самовывоз</option>
                  <option value="2">Доставка до двери</option>
                  <option value="3">Доставка по Казахстану</option>
                </select>
              </div>

              {(deliveryMethodId === 2 || deliveryMethodId === 3) && (
                <div className="mt-4">
                  <label htmlFor="deliveryAddress">Адрес доставки</label>
                  <input
                    type="text"
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    className="border p-2 w-full"
                  />
                </div>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-500 w-full text-white px-4 py-2 rounded"
                >
                  Отправить в WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
