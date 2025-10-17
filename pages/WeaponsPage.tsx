

import React from 'react';
import DatabasePage from './DatabasePage';
import { weapons } from '../data/weapons';
import { Weapon, Rarity, WeaponType } from '../types';

const getRarityColor = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.FIVE_STAR: return 'border-gold';
    case Rarity.FOUR_STAR: return 'border-purple';
    case Rarity.THREE_STAR: return 'border-blue';
    default: return 'border-gray-600';
  }
};

const WeaponCard: React.FC<{ item: Weapon }> = ({ item }) => (
  <div className={`bg-gray-800 rounded-lg overflow-hidden border-2 ${getRarityColor(item.rarity)} flex flex-col items-center p-4 text-center`}>
    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain mb-2" />
    <div className="w-full">
      <p className="font-semibold text-white truncate">{item.name}</p>
      <p className="text-sm text-gray-400">{item.type}</p>
    </div>
  </div>
);


const WeaponsPage: React.FC = () => {
  const filterOptions = [
    // Fix: Updated to correctly generate options from the string-based Rarity enum.
    { key: 'rarity', label: '등급', options: Object.values(Rarity) },
    { key: 'type', label: '무기 타입', options: Object.values(WeaponType) },
  ];

  return (
    <DatabasePage
      title="무기 DB"
      items={weapons}
      filterOptions={filterOptions}
      renderItem={(item: Weapon) => <WeaponCard item={item} />}
    />
  );
};

export default WeaponsPage;