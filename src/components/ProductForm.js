import { useState } from 'react';

const ProductForm = ({ onSubmit, sizes }) => {
  const [formData, setFormData] = useState({
    name: '',
    dimensions: '',
    quantityPerBox: '',
    polyethylene: '',
    thickness: '',
    size: sizes.length > 0 ? sizes[0].size : '',
    color: '',
    sideFoldsSize: '',
    hasSideFolds: false,
    hasPrint: false,
    packing: '',
    stockQuantity: '',
    weight: '',
    price: '',
    volume: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      sideFoldsSize: formData.sideFoldsSize || null,
      hasSideFolds: formData.hasSideFolds || false,
      hasPrint: formData.hasPrint || false,
      packing: formData.packing || null,
      stockQuantity: formData.stockQuantity ? parseInt(formData.stockQuantity, 10) : null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      price: formData.price ? parseFloat(formData.price) : 0.0,
      volume: formData.volume ? parseFloat(formData.volume) : null,
      description: formData.description || null,
      imageUrl: formData.imageUrl || null,
    };

    try {
      const response = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Package added:', data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Габариты</label>
        <input
          type="text"
          name="dimensions"
          value={formData.dimensions}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Количество в коробке</label>
        <input
          type="number"
          name="quantityPerBox"
          value={formData.quantityPerBox}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Полиэтилен</label>
        <input
          type="text"
          name="polyethylene"
          value={formData.polyethylene}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Толщина</label>
        <input
          type="text"
          name="thickness"
          value={formData.thickness}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Размер</label>
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        >
          {sizes.map((size) => (
            <option key={size.id} value={size.size}>
              {size.size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Цвет</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Размер боковых складок</label>
        <input
          type="text"
          name="sideFoldsSize"
          value={formData.sideFoldsSize}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Боковые складки</label>
        <input
          type="checkbox"
          name="hasSideFolds"
          checked={formData.hasSideFolds}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Рисунок</label>
        <input
          type="checkbox"
          name="hasPrint"
          checked={formData.hasPrint}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Упаковка</label>
        <input
          type="text"
          name="packing"
          value={formData.packing}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Количество на складе</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Вес</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Цена</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Объем</label>
        <input
          type="number"
          name="volume"
          value={formData.volume}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>URL изображения</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Добавить товар</button>
    </form>
  );
};

export default ProductForm;
