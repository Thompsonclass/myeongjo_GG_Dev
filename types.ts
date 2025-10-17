// Fix: Replaced incorrect data file with actual type definitions.

export enum Rarity {
  FIVE_STAR = '5',
  FOUR_STAR = '4',
  THREE_STAR = '3',
  TWO_STAR = '2',
  ONE_STAR = '1',
}

export enum Element {
  AERO = '기류',
  FUSION = '용융',
  GLACIO = '응결',
  ELECTRO = '전도',
  HAVOC = '인멸',
  SPECTRO = '회절',
}

export enum WeaponType {
  BROADBLADE = '대검',
  SWORD = '직검',
  PISTOLS = '권총',
  GAUNTLETS = '건틀릿',
  RECTIFIER = '증폭기',
}

export enum EchoSet {
  // Existing Sets from Data
  SIERRA_GALE = '스쳐가는 바람',
  VOID_THUNDER = '울려퍼지는 뇌음',
  MOLTEN_RIFT = '솟구치는 용암',
  FREEZING_FROST = '야밤의 서리',
  SUN_SINKING_ECLIPSE = '빛을 삼키는 해',
  CELESTIAL_RADIANCE = '빛나는 별',
  REJUVENATING_GLOW = '찬란한 광휘',
  MOONLIT_CLOUDS = '떠오르는 구름',
  LINGERING_TUNES = '오래된 맹세',
  
  // Additional Sets from Build Guides
  ENDLESS_SKY = '끝없는 하늘',
  GLORIOUS_WIND = '영광이 깃든 바람',
  BLADE_OF_GLORY = '영광의 칼날',
  COURAGE_AGAINST_WAVES = '파도에 맞선 용기',
  HOWLING_WOLF_FLAME = '울부짖는 늑대의 불꽃',
  BURNING_FEATHER = '불타는 깃털',
  CONCERTO_OF_SKY = '하늘의 합주곡',
  COLD_DECISION = '냉철한 결단',
  VEIL_OF_DARKNESS = '어둠의 장막',
  TWISTED_NIRVANA = '뒤틀린 피안',
  ETERNAL_RADIANCE = '영원의 광채',
}


export interface Resonator {
  id: string;
  name: string;
  rarity: Rarity;
  element: Element;
  weaponType: WeaponType;
  imageUrl: string;
  stats: {
    [level: number]: {
      baseHp: number;
      baseAtk: number;
      baseDef: number;
    };
  };
}

export interface Weapon {
  id: string;
  name: string;
  rarity: Rarity;
  type: WeaponType;
  imageUrl: string;
  stats: {
    [level: number]: {
      baseAtk: number;
      subStat: string;
      subStatValue: number;
    };
  };
}

export interface Echo {
  id: string;
  name: string;
  cost: number;
  set: EchoSet;
  imageUrl: string;
  mainStats: string[];
  subStats: string[];
}

export interface BuildGuide {
    resonatorId: string;
    element: Element;
    position: string;
    skillPriority: string;
    nodeOption: string;
    recommendedWeapons: { name: string; tag?: string; }[];
    echoSetup: {
        set: string;
        mainStats: string[];
        subStats: string[];
    };
    targetStats: Record<string, string>;
    resonanceEnergyCost: number | string;
    notes: string;
}

export interface EquippedEcho {
  echoId: string;
  level: number;
  mainStat: string;
  subStats: { stat: string; value: number }[];
}

export interface Build {
  resonatorId: string | null;
  resonatorLevel: number;
  weaponId: string | null;
  weaponLevel: number;
  echos: (EquippedEcho | null)[];
}

export interface Preset {
  name: string;
  build: Build;
}
