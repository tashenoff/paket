// src/components/PriceFilter.js
import { useState } from 'react';

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value, 10);
    setMin(newMin);
    onPriceChange(newMin, max); // Передаем изменения в родительский компонент
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value, 10);
    setMax(newMax);
    onPriceChange(min, newMax); // Передаем изменения в родительский компонент
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">Цена от: {min} ₸</label>
      <input
        type="range"
        min={0}
        max={maxPrice}
        value={min}
        onChange={handleMinChange}
        className="range range-sm"
      />
      <label className="text-sm">Цена до: {max} ₸</label>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={max}
        onChange={handleMaxChange}
        className="range range-sm"
      />
    </div>
  );
};

export default PriceFilter;
