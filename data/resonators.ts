import { Resonator, Rarity, Element, WeaponType } from '../types';

// Image URLs are now local assets.
export const resonators: Resonator[] = [
  // 5 Star
  {
    id: 'jiyan',
    name: '기염',
    rarity: Rarity.FIVE_STAR,
    element: Element.AERO,
    weaponType: WeaponType.BROADBLADE,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EA%B8%B0%EC%97%BC',
    stats: { 1: { baseHp: 820, baseAtk: 28, baseDef: 95 }, 90: { baseHp: 11075, baseAtk: 435, baseDef: 1287 } },
  },
  {
    id: 'calcharo',
    name: '카카루',
    rarity: Rarity.FIVE_STAR,
    element: Element.ELECTRO,
    weaponType: WeaponType.BROADBLADE,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%B9%B4%EC%B9%B4%EB%A3%A8',
    stats: { 1: { baseHp: 800, baseAtk: 25, baseDef: 100 }, 90: { baseHp: 10850, baseAtk: 415, baseDef: 1350 } },
  },
  {
    id: 'yinlin',
    name: '음림',
    rarity: Rarity.FIVE_STAR,
    element: Element.ELECTRO,
    weaponType: WeaponType.RECTIFIER,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%9D%8C%EB%A6%BC',
    stats: { 1: { baseHp: 750, baseAtk: 22, baseDef: 80 }, 90: { baseHp: 10210, baseAtk: 390, baseDef: 1120 } },
  },
  {
    id: 'jinhsi',
    name: '금희',
    rarity: Rarity.FIVE_STAR,
    element: Element.SPECTRO,
    weaponType: WeaponType.BROADBLADE,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EA%B8%88%ED%9D%AC',
    stats: { 1: { baseHp: 815, baseAtk: 27, baseDef: 97 }, 90: { baseHp: 10995, baseAtk: 430, baseDef: 1305 } },
  },
  {
    id: 'changli',
    name: '장리',
    rarity: Rarity.FIVE_STAR,
    element: Element.FUSION,
    weaponType: WeaponType.SWORD,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%9E%A5%EB%A6%AC',
    stats: { 1: { baseHp: 770, baseAtk: 26, baseDef: 88 }, 90: { baseHp: 10450, baseAtk: 425, baseDef: 1220 } },
  },
  {
    id: 'verina',
    name: '벨리나',
    rarity: Rarity.FIVE_STAR,
    element: Element.SPECTRO,
    weaponType: WeaponType.RECTIFIER,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%B2%A8%EB%A6%AC%EB%82%98',
    stats: { 1: { baseHp: 780, baseAtk: 20, baseDef: 85 }, 90: { baseHp: 10450, baseAtk: 350, baseDef: 1180 } },
  },
  {
    id: 'encore',
    name: '앙코',
    rarity: Rarity.FIVE_STAR,
    element: Element.FUSION,
    weaponType: WeaponType.RECTIFIER,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%95%99%EC%BD%94',
    stats: { 1: { baseHp: 760, baseAtk: 24, baseDef: 82 }, 90: { baseHp: 10320, baseAtk: 405, baseDef: 1150 } },
  },
  {
    id: 'lingyang',
    name: '능양',
    rarity: Rarity.FIVE_STAR,
    element: Element.GLACIO,
    weaponType: WeaponType.GAUNTLETS,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%8A%A5%EC%96%91',
    stats: { 1: { baseHp: 810, baseAtk: 26, baseDef: 98 }, 90: { baseHp: 10980, baseAtk: 420, baseDef: 1310 } },
  },
  {
    id: 'jianxin',
    name: '감심',
    rarity: Rarity.FIVE_STAR,
    element: Element.AERO,
    weaponType: WeaponType.GAUNTLETS,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EA%B0%90%EC%8B%AC',
    stats: { 1: { baseHp: 850, baseAtk: 19, baseDef: 105 }, 90: { baseHp: 11520, baseAtk: 330, baseDef: 1420 } },
  },
  {
    id: 'rover_spectro',
    name: '방랑자 (회절)',
    rarity: Rarity.FIVE_STAR,
    element: Element.SPECTRO,
    weaponType: WeaponType.SWORD,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%B0%A9%EB%9E%91%EC%9E%90%20(%ED%9A%8C%EC%A0%88)',
    stats: { 1: { baseHp: 790, baseAtk: 23, baseDef: 90 }, 90: { baseHp: 10760, baseAtk: 400, baseDef: 1250 } },
  },
  {
    id: 'rover_havoc',
    name: '방랑자 (인멸)',
    rarity: Rarity.FIVE_STAR,
    element: Element.HAVOC,
    weaponType: WeaponType.SWORD,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%B0%A9%EB%9E%91%EC%9E%90%20(%EC%9D%B8%EB%A9%B8)',
    stats: { 1: { baseHp: 795, baseAtk: 24, baseDef: 92 }, 90: { baseHp: 10810, baseAtk: 405, baseDef: 1265 } },
  },
  {
    id: 'rover_aero',
    name: '방랑자 (기류)',
    rarity: Rarity.FIVE_STAR,
    element: Element.AERO,
    weaponType: WeaponType.SWORD,
    imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%B0%A9%EB%9E%91%EC%9E%90%20(%EA%B8%B0%EB%A5%98)', // Placeholder
    stats: { 1: { baseHp: 790, baseAtk: 23, baseDef: 90 }, 90: { baseHp: 10760, baseAtk: 400, baseDef: 1250 } },
  },
  // New Characters from Build Guide
  {
    id: 'chaconne', name: '샤콘', rarity: Rarity.FIVE_STAR, element: Element.AERO, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%83%A4%EC%BD%98', stats: { 1: { baseHp: 750, baseAtk: 22, baseDef: 80 }, 90: { baseHp: 10210, baseAtk: 390, baseDef: 1120 } },
  },
  {
    id: 'cartisia', name: '카르티시아', rarity: Rarity.FIVE_STAR, element: Element.AERO, weaponType: WeaponType.SWORD, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%B9%B4%EB%A5%B4%ED%8B%B0%EC%8B%9C%EC%95%84', stats: { 1: { baseHp: 770, baseAtk: 26, baseDef: 88 }, 90: { baseHp: 10450, baseAtk: 425, baseDef: 1220 } },
  },
  {
    id: 'yuno', name: '유노', rarity: Rarity.FIVE_STAR, element: Element.AERO, weaponType: WeaponType.PISTOLS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%9C%A0%EB%85%B8', stats: { 1: { baseHp: 760, baseAtk: 24, baseDef: 82 }, 90: { baseHp: 10320, baseAtk: 405, baseDef: 1150 } },
  },
  {
    id: 'brent', name: '브렌트', rarity: Rarity.FIVE_STAR, element: Element.FUSION, weaponType: WeaponType.BROADBLADE, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%B8%8C%EB%A0%8C%ED%8A%B8', stats: { 1: { baseHp: 800, baseAtk: 25, baseDef: 100 }, 90: { baseHp: 10850, baseAtk: 415, baseDef: 1350 } },
  },
  {
    id: 'lupa', name: '루파', rarity: Rarity.FIVE_STAR, element: Element.FUSION, weaponType: WeaponType.BROADBLADE, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%A3%A8%ED%8C%8C', stats: { 1: { baseHp: 815, baseAtk: 27, baseDef: 97 }, 90: { baseHp: 10995, baseAtk: 430, baseDef: 1305 } },
  },
  {
    id: 'galbrena', name: '갈브레나', rarity: Rarity.FIVE_STAR, element: Element.FUSION, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EA%B0%88%EB%B8%8C%EB%A0%88%EB%82%98', stats: { 1: { baseHp: 750, baseAtk: 22, baseDef: 80 }, 90: { baseHp: 10210, baseAtk: 390, baseDef: 1120 } },
  },
  {
    id: 'zhezhi', name: '절지', rarity: Rarity.FIVE_STAR, element: Element.GLACIO, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%A0%88%EC%A7%80', stats: { 1: { baseHp: 750, baseAtk: 22, baseDef: 80 }, 90: { baseHp: 10210, baseAtk: 390, baseDef: 1120 } },
  },
  {
    id: 'carlotta', name: '카를로타', rarity: Rarity.FIVE_STAR, element: Element.GLACIO, weaponType: WeaponType.PISTOLS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%B9%B4%EB%A5%BC%EB%A1%9C%ED%83%80', stats: { 1: { baseHp: 760, baseAtk: 24, baseDef: 82 }, 90: { baseHp: 10320, baseAtk: 405, baseDef: 1150 } },
  },
  {
    id: 'xiangliyao', name: '상리요', rarity: Rarity.FIVE_STAR, element: Element.ELECTRO, weaponType: WeaponType.GAUNTLETS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%83%81%EB%A6%AC%EC%9A%94', stats: { 1: { baseHp: 810, baseAtk: 26, baseDef: 98 }, 90: { baseHp: 10980, baseAtk: 420, baseDef: 1310 } },
  },
  {
    id: 'augusta', name: '아우구스타', rarity: Rarity.FIVE_STAR, element: Element.ELECTRO, weaponType: WeaponType.BROADBLADE, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%95%84%EC%9A%B0%EA%B5%AC%EC%8A%A4%ED%83%80', stats: { 1: { baseHp: 800, baseAtk: 25, baseDef: 100 }, 90: { baseHp: 10850, baseAtk: 415, baseDef: 1350 } },
  },
  {
    id: 'camellia', name: '카멜리아', rarity: Rarity.FIVE_STAR, element: Element.HAVOC, weaponType: WeaponType.SWORD, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%B9%B4%EB%A9%9C%EB%A6%AC%EC%95%84', stats: { 1: { baseHp: 770, baseAtk: 26, baseDef: 88 }, 90: { baseHp: 10450, baseAtk: 425, baseDef: 1220 } },
  },
  {
    id: 'rococo', name: '로코코', rarity: Rarity.FIVE_STAR, element: Element.HAVOC, weaponType: WeaponType.GAUNTLETS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%A1%9C%EC%BD%94%EC%BD%94', stats: { 1: { baseHp: 810, baseAtk: 26, baseDef: 98 }, 90: { baseHp: 10980, baseAtk: 420, baseDef: 1310 } },
  },
  {
    id: 'cantarella', name: '칸타렐라', rarity: Rarity.FIVE_STAR, element: Element.HAVOC, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%B9%B8%ED%83%80%EB%A0%90%EB%9D%BC', stats: { 1: { baseHp: 750, baseAtk: 22, baseDef: 80 }, 90: { baseHp: 10210, baseAtk: 390, baseDef: 1120 } },
  },
  {
    id: 'floro', name: '플로로', rarity: Rarity.FIVE_STAR, element: Element.HAVOC, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%ED%94%8C%EB%A1%9C%EB%A1%9C', stats: { 1: { baseHp: 750, baseAtk: 22, baseDef: 80 }, 90: { baseHp: 10210, baseAtk: 390, baseDef: 1120 } },
  },
  {
    id: 'guardian', name: '파수인', rarity: Rarity.FIVE_STAR, element: Element.SPECTRO, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%ED%8C%8C%EC%88%98%EC%9D%B8', stats: { 1: { baseHp: 780, baseAtk: 20, baseDef: 85 }, 90: { baseHp: 10450, baseAtk: 350, baseDef: 1180 } }, // Placeholder using Verina's base
  },
  {
    id: 'febi', name: '페비', rarity: Rarity.FIVE_STAR, element: Element.SPECTRO, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%ED%8E%98%EB%B9%84', stats: { 1: { baseHp: 750, baseAtk: 22, baseDef: 80 }, 90: { baseHp: 10210, baseAtk: 390, baseDef: 1120 } },
  },
  {
    id: 'zhenni', name: '젠니', rarity: Rarity.FIVE_STAR, element: Element.SPECTRO, weaponType: WeaponType.GAUNTLETS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%A0%A0%EB%8B%88', stats: { 1: { baseHp: 810, baseAtk: 26, baseDef: 98 }, 90: { baseHp: 10980, baseAtk: 420, baseDef: 1310 } },
  },
  // 4 Star
  {
    id: 'sanhua', name: '산화', rarity: Rarity.FOUR_STAR, element: Element.GLACIO, weaponType: WeaponType.SWORD, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%82%B0%ED%99%94', stats: { 1: { baseHp: 680, baseAtk: 18, baseDef: 70 }, 90: { baseHp: 9150, baseAtk: 280, baseDef: 980 } },
  },
  {
    id: 'danjin', name: '단근', rarity: Rarity.FOUR_STAR, element: Element.HAVOC, weaponType: WeaponType.SWORD, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%8B%A8%EA%B7%BC', stats: { 1: { baseHp: 650, baseAtk: 21, baseDef: 65 }, 90: { baseHp: 8800, baseAtk: 325, baseDef: 910 } },
  },
  {
    id: 'yangyang', name: '양양', rarity: Rarity.FOUR_STAR, element: Element.AERO, weaponType: WeaponType.SWORD, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%96%91%EC%96%91', stats: { 1: { baseHp: 690, baseAtk: 17, baseDef: 72 }, 90: { baseHp: 9280, baseAtk: 270, baseDef: 1010 } },
  },
  {
    id: 'chixia', name: '치샤', rarity: Rarity.FOUR_STAR, element: Element.FUSION, weaponType: WeaponType.PISTOLS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%B9%98%EC%83%A4', stats: { 1: { baseHp: 670, baseAtk: 19, baseDef: 68 }, 90: { baseHp: 9010, baseAtk: 295, baseDef: 950 } },
  },
  {
    id: 'baizhi', name: '백지', rarity: Rarity.FOUR_STAR, element: Element.GLACIO, weaponType: WeaponType.RECTIFIER, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%B0%B1%EC%A7%80', stats: { 1: { baseHp: 710, baseAtk: 15, baseDef: 75 }, 90: { baseHp: 9550, baseAtk: 250, baseDef: 1050 } },
  },
  {
    id: 'taoqi', name: '도기', rarity: Rarity.FOUR_STAR, element: Element.HAVOC, weaponType: WeaponType.BROADBLADE, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%8F%84%EA%B8%B0', stats: { 1: { baseHp: 750, baseAtk: 16, baseDef: 80 }, 90: { baseHp: 10100, baseAtk: 260, baseDef: 1120 } },
  },
  {
    id: 'mortefi', name: '모르테피', rarity: Rarity.FOUR_STAR, element: Element.FUSION, weaponType: WeaponType.PISTOLS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EB%AA%A8%EB%A5%B4%ED%85%8C%ED%94%BC', stats: { 1: { baseHp: 660, baseAtk: 20, baseDef: 67 }, 90: { baseHp: 8900, baseAtk: 310, baseDef: 940 } },
  },
  {
    id: 'aalto', name: '알토', rarity: Rarity.FOUR_STAR, element: Element.AERO, weaponType: WeaponType.PISTOLS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%95%8C%ED%86%A0',
    stats: { 1: { baseHp: 675, baseAtk: 18, baseDef: 69 }, 90: { baseHp: 9080, baseAtk: 285, baseDef: 965 } },
  },
  {
    id: 'yuanwu', name: '연무', rarity: Rarity.FOUR_STAR, element: Element.ELECTRO, weaponType: WeaponType.GAUNTLETS, imageUrl: 'https://via.placeholder.com/256/1e1e1e/e5e7eb?text=%EC%97%B0%EB%AC%B4', stats: { 1: { baseHp: 720, baseAtk: 17, baseDef: 78 }, 90: { baseHp: 9750, baseAtk: 275, baseDef: 1090 } },
  },
];