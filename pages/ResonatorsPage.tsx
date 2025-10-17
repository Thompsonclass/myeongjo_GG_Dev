

import React from 'react';
import DatabasePage from './DatabasePage';
import { resonators } from '../data/resonators';
import { Resonator, Rarity, Element, WeaponType } from '../types';

const getRarityColor = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.FIVE_STAR: return 'border-gold';
    case Rarity.FOUR_STAR: return 'border-purple';
    default: return 'border-gray-600';
  }
};

const ResonatorCard: React.FC<{ item: Resonator }> = ({ item }) => (
  <div className={`bg-gray-800 rounded-lg overflow-hidden border-2 ${getRarityColor(item.rarity)} transition-transform hover:scale-105`}>
    <img src={item.imageUrl} alt={item.name} className="w-full h-auto object-cover" />
    <div className="p-3 text-center">
      <p className="font-semibold text-white truncate">{item.name}</p>
      <p className="text-sm text-gray-400">{item.element}</p>
    </div>
  </div>
);


const ResonatorsPage: React.FC = () => {
  const filterOptions = [
    // Fix: Updated to correctly generate options from the string-based Rarity enum.
    { key: 'rarity', label: '등급', options: Object.values(Rarity) },
    { key: 'element', label: '속성', options: Object.values(Element) },
    { key: 'weaponType', label: '무기', options: Object.values(WeaponType) },
  ];

  return (
    <DatabasePage
      title="공명자 (캐릭터) DB"
      items={resonators}
      filterOptions={filterOptions}
      renderItem={(item: Resonator) => <ResonatorCard item={item} />}
    />
  );
};

export default ResonatorsPage;