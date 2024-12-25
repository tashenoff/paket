import { useState, useEffect } from 'react';
import ProductForm from '../../components/ProductForm';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const [sizes, setSizes] = useState([]);
  const router = useRouter();

  // Загрузка доступных размеров
  useEffect(() => {
    const fetchSizes = async () => {
      const response = await fetch('/api/admin/package-sizes?packageId=1'); // Передайте правильный packageId
      const data = await response.json();
      setSizes(data);
    };

    fetchSizes();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Товар успешно добавлен');
        router.push('/admin'); // Перенаправление после успешного добавления
      } else {
        setMessage('Ошибка при добавлении товара');
      }
    } catch (error) {
      setMessage('Ошибка при добавлении товара');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Админка - Добавить товар</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <ProductForm
        onSubmit={handleSubmit}
        sizes={sizes} // Передаем размеры в компонент формы
      />
    </div>
  );
};

export default AdminPage;
