// src/components/SearchBar.js
import { useState } from 'react';
import { HiSearch, HiX } from 'react-icons/hi'; // Импортируем иконки поиска и крестик

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Передаем запрос в родительский компонент
  };

  const handleClearSearch = () => {
    setQuery('');
    onSearch(''); // Очищаем поиск в родительском компоненте
  };

  return (
    <div className="mb-4 flex items-center space-x-2">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Поиск по товарам..."
          className="input input-bordered w-full pl-10"
        />
        {/* Иконка поиска */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <HiSearch />
        </div>
        {/* Крестик для очистки */}
        {query && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={handleClearSearch}
          >
            <HiX />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
