
import React, { useState, useMemo } from 'react';

interface DBItem {
  id: string;
  name: string;
  imageUrl: string;
  [key: string]: any;
}

interface FilterOption {
  key: string;
  label: string;
  options: string[];
}

interface DatabasePageProps<T extends DBItem> {
  title: string;
  items: T[];
  filterOptions: FilterOption[];
  renderItem: (item: T) => React.ReactNode;
}

const DatabasePage = <T extends DBItem,>({ title, items, filterOptions, renderItem }: DatabasePageProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all') return true;
        // Handle numeric values from enums
        return String(item[key]) === value;
      });
      
      return matchesSearch && matchesFilters;
    });
  }, [items, searchTerm, filters]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">{title}</h1>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="이름으로 검색..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 rounded-md px-4 py-2 flex-grow min-w-[200px]"
        />
        {filterOptions.map(filter => (
          <select
            key={filter.key}
            onChange={e => handleFilterChange(filter.key, e.target.value)}
            className="bg-gray-700 text-white rounded-md px-4 py-2"
            value={filters[filter.key] || 'all'}
          >
            <option value="all">{filter.label} (전체)</option>
            {filter.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredItems.map(item => (
          <div key={item.id}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabasePage;
