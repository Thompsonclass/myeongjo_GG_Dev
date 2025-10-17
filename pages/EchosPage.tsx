
import React from 'react';
import DatabasePage from './DatabasePage';
import { echos } from '../data/echos';
import { Echo, EchoSet } from '../types';

const EchoCard: React.FC<{ item: Echo }> = ({ item }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600 flex flex-col items-center p-4 text-center">
    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain mb-2" />
    <div className="w-full">
      <p className="font-semibold text-white truncate">{item.name}</p>
      <p className="text-sm text-gray-400 truncate">{item.set}</p>
      <p className="text-xs text-gold">Cost: {item.cost}</p>
    </div>
  </div>
);


const EchosPage: React.FC = () => {
  const filterOptions = [
    { key: 'cost', label: '코스트', options: ['4', '3', '1'] },
    { key: 'set', label: '세트 효과', options: Object.values(EchoSet) },
  ];

  return (
    <DatabasePage
      title="에코 DB"
      items={echos}
      filterOptions={filterOptions}
      renderItem={(item: Echo) => <EchoCard item={item} />}
    />
  );
};

export default EchosPage;
