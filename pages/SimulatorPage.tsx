import React, { useState, useMemo, useEffect } from 'react';
import { resonators } from '../data/resonators';
import { weapons } from '../data/weapons';
import { echos } from '../data/echos';
import { Build, EquippedEcho, Resonator, Weapon, Echo, EchoSet, Preset } from '../types';

// --- DATA & CONSTANTS FOR CALCULATION ---

const MAIN_ECHO_FLAT_ATK = 110; // Flat ATK bonus for equipping a main echo at max rank.
const echoSlotCosts = [4, 3, 3, 1, 1]; // Standard build cost distribution

const statNameMap: Record<string, string> = {
  'HP': 'HP', 'ATK': '공격력', 'DEF': '방어력',
  'HP%': '체력%', 'ATK%': '공격력%', 'DEF%': '방어력%',
  'CRIT RATE': '치명타 확률', 'CRIT DMG': '치명타 피해',
  'Energy Regen': '공명 효율', 'Healing Bonus': '치유 보너스',
  'Aero DMG Bonus': '기류 피해 보너스', 'Glacio DMG Bonus': '응결 피해 보너스',
  'Fusion DMG Bonus': '용융 피해 보너스', 'Electro DMG Bonus': '전도 피해 보너스',
  'Havoc DMG Bonus': '인멸 피해 보너스', 'Spectro DMG Bonus': '회절 피해 보너스',
  'Basic ATK DMG': '일반 공격 피해', 'Heavy ATK DMG': '강공격 피해',
  'Skill DMG': '스킬 피해', 'Liberation DMG': '해방 피해',
};

// Internal key to Korean name mapping
const internalToKoreanMap: Record<string, string> = {
    ...statNameMap,
};
// Korean name to internal key mapping
const koreanToInternalMap: Record<string, string> = Object.fromEntries(
    Object.entries(internalToKoreanMap).map(([key, value]) => [value, key])
);


const MAIN_STAT_VALUES: { [cost: number]: { [stat: string]: number } } = {
  4: {
    [koreanToInternalMap['치명타 확률']]: 22.1,
    [koreanToInternalMap['치명타 피해']]: 44.2,
    [koreanToInternalMap['공격력%']]: 30.0,
    [koreanToInternalMap['체력%']]: 30.0,
    [koreanToInternalMap['방어력%']]: 37.5,
    [koreanToInternalMap['치유 보너스']]: 21.6,
  },
  3: {
    [koreanToInternalMap['기류 피해 보너스']]: 30.0,
    [koreanToInternalMap['응결 피해 보너스']]: 30.0,
    [koreanToInternalMap['용융 피해 보너스']]: 30.0,
    [koreanToInternalMap['전도 피해 보너스']]: 30.0,
    [koreanToInternalMap['인멸 피해 보너스']]: 30.0,
    [koreanToInternalMap['회절 피해 보너스']]: 30.0,
    [koreanToInternalMap['공명 효율']]: 21.6,
    [koreanToInternalMap['공격력%']]: 24.0,
    [koreanToInternalMap['체력%']]: 24.0,
    [koreanToInternalMap['방어력%']]: 30.0,
  },
  1: {
    [koreanToInternalMap['공격력%']]: 15.0,
    [koreanToInternalMap['체력%']]: 15.0,
    [koreanToInternalMap['방어력%']]: 18.7,
  }
};

const MIN_MAIN_STAT_VALUES: { [cost: number]: { [stat: string]: number } } = Object.entries(MAIN_STAT_VALUES).reduce((acc, [cost, stats]) => {
    acc[Number(cost)] = Object.entries(stats).reduce((statAcc, [stat, value]) => {
        // Using a 10% ratio for level 1 values relative to level 25.
        statAcc[stat] = value * 0.1;
        return statAcc;
    }, {} as { [stat: string]: number });
    return acc;
}, {} as { [cost: number]: { [stat: string]: number } });


// Fix: Added missing echo sets to satisfy the `Record<EchoSet, ...>` type.
// 2pc effects are inferred from build guides and naming conventions.
const ECHO_SET_EFFECTS: Record<EchoSet, { '2pc'?: any; '5pc'?: any }> = {
  [EchoSet.MOLTEN_RIFT]: { '2pc': { [koreanToInternalMap['용융 피해 보너스']]: 10 } },
  [EchoSet.VOID_THUNDER]: { '2pc': { [koreanToInternalMap['전도 피해 보너스']]: 10 } },
  [EchoSet.SIERRA_GALE]: { '2pc': { [koreanToInternalMap['기류 피해 보너스']]: 10 } },
  [EchoSet.CELESTIAL_RADIANCE]: { '2pc': { [koreanToInternalMap['회절 피해 보너스']]: 10 } },
  [EchoSet.SUN_SINKING_ECLIPSE]: { '2pc': { [koreanToInternalMap['인멸 피해 보너스']]: 10 } },
  [EchoSet.FREEZING_FROST]: { '2pc': { [koreanToInternalMap['응결 피해 보너스']]: 10 } },
  [EchoSet.LINGERING_TUNES]: { '2pc': { [koreanToInternalMap['공격력%']]: 10 } },
  [EchoSet.REJUVENATING_GLOW]: { '2pc': { [koreanToInternalMap['치유 보너스']]: 10 } },
  [EchoSet.MOONLIT_CLOUDS]: { '2pc': { [koreanToInternalMap['공명 효율']]: 10 } },
  [EchoSet.ENDLESS_SKY]: { '2pc': { [koreanToInternalMap['기류 피해 보너스']]: 10 } },
  [EchoSet.GLORIOUS_WIND]: { '2pc': { [koreanToInternalMap['기류 피해 보너스']]: 10 } },
  [EchoSet.COURAGE_AGAINST_WAVES]: { '2pc': { [koreanToInternalMap['용융 피해 보너스']]: 10 } },
  [EchoSet.HOWLING_WOLF_FLAME]: { '2pc': { [koreanToInternalMap['용융 피해 보너스']]: 10 } },
  [EchoSet.COLD_DECISION]: { '2pc': { [koreanToInternalMap['응결 피해 보너스']]: 10 } },
  [EchoSet.VEIL_OF_DARKNESS]: { '2pc': { [koreanToInternalMap['인멸 피해 보너스']]: 10 } },
  [EchoSet.ETERNAL_RADIANCE]: { '2pc': { [koreanToInternalMap['회절 피해 보너스']]: 10 } },
  [EchoSet.CONCERTO_OF_SKY]: { '2pc': { [koreanToInternalMap['공명 효율']]: 10 } },
  [EchoSet.BLADE_OF_GLORY]: {}, // 3pc effect not supported by calculator
  [EchoSet.BURNING_FEATHER]: {}, // 3pc effect not supported by calculator
  [EchoSet.TWISTED_NIRVANA]: {}, // 3pc effect not supported by calculator
};

// --- STAT CALCULATION LOGIC ---

const interpolate = (level: number, minStat: number, maxStat: number): number => {
    if (level <= 1) return minStat;
    if (level >= 90) return maxStat;
    return minStat + (maxStat - minStat) * ((level - 1) / 89);
};

const interpolateEcho = (level: number, minStat: number, maxStat: number): number => {
    if (level <= 1) return minStat;
    if (level >= 25) return maxStat;
    // Linear interpolation for levels 1 through 25 (24 steps)
    return minStat + (maxStat - minStat) * ((level - 1) / 24);
};

export const calculateStats = (build: Build): any => {
    const finalStats: any = {
        HP: 0, ATK: 0, DEF: 0,
        [koreanToInternalMap['치명타 확률']]: 5.0, [koreanToInternalMap['치명타 피해']]: 150.0,
        [koreanToInternalMap['공명 효율']]: 100.0, [koreanToInternalMap['기류 피해 보너스']]: 0.0, [koreanToInternalMap['응결 피해 보너스']]: 0.0,
        [koreanToInternalMap['용융 피해 보너스']]: 0.0, [koreanToInternalMap['전도 피해 보너스']]: 0.0, [koreanToInternalMap['인멸 피해 보너스']]: 0.0,
        [koreanToInternalMap['회절 피해 보너스']]: 0.0, [koreanToInternalMap['치유 보너스']]: 0.0, [koreanToInternalMap['일반 공격 피해']]: 0.0,
        [koreanToInternalMap['강공격 피해']]: 0.0, [koreanToInternalMap['스킬 피해']]: 0.0, [koreanToInternalMap['해방 피해']]: 0.0,
    };

    const resonator = resonators.find(r => r.id === build.resonatorId);
    if (!resonator) return { "Error": "공명자를 선택해주세요." };

    const resonatorLevelStats = {
        baseHp: interpolate(build.resonatorLevel, resonator.stats[1].baseHp, resonator.stats[90].baseHp),
        baseAtk: interpolate(build.resonatorLevel, resonator.stats[1].baseAtk, resonator.stats[90].baseAtk),
        baseDef: interpolate(build.resonatorLevel, resonator.stats[1].baseDef, resonator.stats[90].baseDef),
    };
    
    let baseHp = resonatorLevelStats.baseHp;
    let baseAtk = resonatorLevelStats.baseAtk;
    let baseDef = resonatorLevelStats.baseDef;
    
    let hp_percent = 0, atk_percent = 0, def_percent = 0;
    let hp_flat = 0, atk_flat = 0, def_flat = 0;

    const weapon = weapons.find(w => w.id === build.weaponId);
    if (weapon) {
        const weaponLevelStats = {
            baseAtK: interpolate(build.weaponLevel, weapon.stats[1].baseAtk, weapon.stats[90].baseAtk),
            subStatValue: interpolate(build.weaponLevel, weapon.stats[1].subStatValue, weapon.stats[90].subStatValue) * 100,
        };
        baseAtk += weaponLevelStats.baseAtK;
        const subStatName = weapon.stats[90].subStat;
        if (subStatName === 'ATK%') atk_percent += weaponLevelStats.subStatValue;
        else if (subStatName === 'HP%') hp_percent += weaponLevelStats.subStatValue;
        else if (subStatName === 'DEF%') def_percent += weaponLevelStats.subStatValue;
        else if(finalStats.hasOwnProperty(subStatName)) {
            finalStats[subStatName] = (finalStats[subStatName] as number) + weaponLevelStats.subStatValue;
        }
    }

    if(build.echos.some(e => e !== null)) {
        atk_flat += MAIN_ECHO_FLAT_ATK;
    }

    const setCounts: { [key: string]: number } = {};
    build.echos.forEach(equippedEcho => {
        if (!equippedEcho) return;
        const echoInfo = echos.find(echoDb => echoDb.id === equippedEcho.echoId);
        if (echoInfo) {
          setCounts[echoInfo.set] = (setCounts[echoInfo.set] || 0) + 1;
          const mainStatInternalKey = koreanToInternalMap[equippedEcho.mainStat];
          
          const minMainStat = MIN_MAIN_STAT_VALUES[echoInfo.cost]?.[mainStatInternalKey] || 0;
          const maxMainStat = MAIN_STAT_VALUES[echoInfo.cost]?.[mainStatInternalKey] || 0;
          const mainStatValue = interpolateEcho(equippedEcho.level, minMainStat, maxMainStat);
          
          if (mainStatInternalKey === koreanToInternalMap['공격력%']) atk_percent += mainStatValue;
          else if (mainStatInternalKey === koreanToInternalMap['체력%']) hp_percent += mainStatValue;
          else if (mainStatInternalKey === koreanToInternalMap['방어력%']) def_percent += mainStatValue;
          else if (finalStats.hasOwnProperty(mainStatInternalKey)) {
            finalStats[mainStatInternalKey] = (finalStats[mainStatInternalKey] as number) + mainStatValue;
          }
        }
        
        equippedEcho.subStats.forEach(sub => {
            const subStatInternalKey = koreanToInternalMap[sub.stat];
            if (subStatInternalKey === koreanToInternalMap['공격력%']) atk_percent += sub.value;
            else if (subStatInternalKey === koreanToInternalMap['체력%']) hp_percent += sub.value;
            else if (subStatInternalKey === koreanToInternalMap['방어력%']) def_percent += sub.value;
            else if (subStatInternalKey === koreanToInternalMap['공격력']) atk_flat += sub.value;
            else if (subStatInternalKey === koreanToInternalMap['체력']) hp_flat += sub.value;
            else if (subStatInternalKey === koreanToInternalMap['방어력']) def_flat += sub.value;
            else if (finalStats.hasOwnProperty(subStatInternalKey)) finalStats[subStatInternalKey] = (finalStats[subStatInternalKey] as number) + sub.value;
        });
    });

    Object.entries(setCounts).forEach(([setName, count]) => {
        const setEffect = ECHO_SET_EFFECTS[setName as EchoSet];
        if (count >= 2 && setEffect?.['2pc']) {
            Object.entries(setEffect['2pc']).forEach(([stat, value]) => {
                if (stat === koreanToInternalMap['공격력%']) atk_percent += (value as number);
                else if (finalStats.hasOwnProperty(stat)) finalStats[stat] = (finalStats[stat] as number) + (value as number);
            });
        }
    });

    finalStats.HP = Math.round(baseHp * (1 + hp_percent / 100) + hp_flat);
    finalStats.ATK = Math.round(baseAtk * (1 + atk_percent / 100) + atk_flat);
    finalStats.DEF = Math.round(baseDef * (1 + def_percent / 100) + def_flat);

    return finalStats;
};

// --- UI COMPONENTS ---

const initialBuild: Build = {
  resonatorId: null,
  resonatorLevel: 90,
  weaponId: null,
  weaponLevel: 90,
  echos: [null, null, null, null, null],
};

const ResonatorSelector: React.FC<{ build: Build; onChange: (id: string) => void; onLevelChange: (level: number) => void; }> = ({ build, onChange, onLevelChange }) => (
  <div className="space-y-3">
    <label className="font-semibold text-white">공명자</label>
    <select
      value={build.resonatorId || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-700 text-white rounded-md px-4 py-2 border border-gray-600 focus:ring-gold focus:border-gold"
    >
      <option value="" disabled>캐릭터 선택...</option>
      {resonators.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
    </select>
    <div className="flex items-center gap-4">
        <input
            type="range" min="1" max="90"
            value={build.resonatorLevel}
            onChange={(e) => onLevelChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <span className="font-bold text-gold w-12 text-center">Lv. {build.resonatorLevel}</span>
    </div>
  </div>
);

const WeaponSelector: React.FC<{ build: Build; selectedResonator: Resonator | undefined; availableWeapons: Weapon[]; onChange: (id: string) => void; onLevelChange: (level: number) => void; }> = ({ build, selectedResonator, availableWeapons, onChange, onLevelChange }) => (
    <div className="space-y-3">
        <label className="font-semibold text-white">무기</label>
        <select
            value={build.weaponId || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={!selectedResonator}
            className="w-full bg-gray-700 text-white rounded-md px-4 py-2 border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-gold focus:border-gold"
        >
            <option value="" disabled>무기 선택...</option>
            {availableWeapons.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
         <div className="flex items-center gap-4">
            <input
                type="range" min="1" max="90"
                value={build.weaponLevel}
                onChange={(e) => onLevelChange(parseInt(e.target.value))}
                disabled={!selectedResonator}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
            />
            <span className="font-bold text-gold w-12 text-center">Lv. {build.weaponLevel}</span>
        </div>
    </div>
);

const SubStatInput: React.FC<{ stat: string; value: number; onChange: (newValue: number) => void; }> = ({ stat, value, onChange }) => {
    const isPercentage = stat.includes('%') || stat.includes('피해') || stat.includes('확률');
    const step = isPercentage ? 1 : 10;
    
    const handleStep = (direction: 'up' | 'down') => {
        const newValue = direction === 'up' ? value + step : Math.max(0, value - step);
        onChange(newValue);
    };

    return (
        <div className="flex items-center w-full bg-gray-800 rounded-md border border-gray-600 focus-within:ring-2 focus-within:ring-gold focus-within:border-gold">
            <button onClick={() => handleStep('down')} className="px-3 py-2 text-lg text-gray-400 hover:text-white">-</button>
            <input
                type="number"
                step={isPercentage ? '0.1' : '1'}
                placeholder="수치"
                value={value}
                onChange={e => onChange(parseFloat(e.target.value) || 0)}
                className="w-full bg-transparent text-white text-center appearance-none focus:outline-none"
                style={{ MozAppearance: 'textfield' }} /* Firefox */
            />
            <button onClick={() => handleStep('up')} className="px-3 py-2 text-lg text-gray-400 hover:text-white">+</button>
        </div>
    );
};


const EchoSlot: React.FC<{ index: number; cost: number, equippedEcho: EquippedEcho | null; onUpdate: (index: number, echo: EquippedEcho | null) => void; }> = ({ index, cost, equippedEcho, onUpdate }) => {
    const filteredEchosByCost = useMemo(() => echos.filter(e => e.cost === cost), [cost]);

    const handleEchoSelect = (echoId: string) => {
        if (!echoId) {
            onUpdate(index, null);
            return;
        }
        const echo = echos.find(e => e.id === echoId);
        if(!echo) return;

        const newEcho: EquippedEcho = {
            echoId: echo.id,
            level: 25,
            mainStat: echo.mainStats[0],
            subStats: Array(5).fill({ stat: '', value: 0 }),
        };
        onUpdate(index, newEcho);
    };

    const handleMainStatChange = (stat: string) => {
        if (!equippedEcho) return;
        onUpdate(index, { ...equippedEcho, mainStat: stat });
    };

    const handleLevelChange = (level: number) => {
        if (!equippedEcho) return;
        onUpdate(index, { ...equippedEcho, level });
    };

    const handleSubStatUpdate = (subIndex: number, newStat?: string, newValue?: number) => {
        if (!equippedEcho) return;
        const newSubStats = JSON.parse(JSON.stringify(equippedEcho.subStats));
        
        while (newSubStats.length <= subIndex) {
            newSubStats.push({ stat: '', value: 0 });
        }

        const currentSub = newSubStats[subIndex];

        if (newStat !== undefined) {
            currentSub.stat = newStat;
        }
        if (newValue !== undefined) {
            currentSub.value = isNaN(newValue) ? 0 : newValue;
        }
        
        onUpdate(index, { ...equippedEcho, subStats: newSubStats });
    };

    const currentEchoInfo = useMemo(() => echos.find(e => e.id === equippedEcho?.echoId), [equippedEcho]);

    return (
        <div className="bg-gray-700 p-4 rounded-lg space-y-4">
            <div className="flex items-start md:items-center gap-4">
                <img src={currentEchoInfo?.imageUrl || `https://via.placeholder.com/64/1e1e1e/e5e7eb?text=COST+${cost}`} alt={currentEchoInfo?.name || `COST ${cost} 에코`} className="w-16 h-16 rounded-lg bg-gray-800 object-contain" />
                <div className="flex-grow space-y-1">
                    <select 
                        onChange={(e) => handleEchoSelect(e.target.value)} 
                        value={currentEchoInfo?.id || ""} 
                        className="w-full bg-gray-600 text-white rounded-md p-2 border border-gray-500 font-bold text-lg focus:ring-gold focus:border-gold"
                    >
                        <option value="" disabled>COST {cost} 에코 선택...</option>
                        {filteredEchosByCost.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                    {currentEchoInfo && <p className="text-sm text-gray-400 pl-2">{currentEchoInfo.set}</p>}
                </div>
                {currentEchoInfo && 
                    <button onClick={() => handleEchoSelect('')} className="text-red-400 hover:text-red-300 text-sm font-semibold flex-shrink-0">
                        제거
                    </button>
                }
            </div>

            {equippedEcho && currentEchoInfo && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
                        <label className="font-semibold text-gray-300 md:col-span-1">주옵션</label>
                        <select value={equippedEcho.mainStat} onChange={e => handleMainStatChange(e.target.value)} className="w-full bg-gray-600 text-white rounded-md p-2 border border-gray-500 md:col-span-2 focus:ring-gold focus:border-gold">
                            {currentEchoInfo.mainStats.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
                         <label className="font-semibold text-gray-300 md:col-span-1">레벨</label>
                         <div className="flex items-center gap-4 md:col-span-2">
                            <input
                                type="range" min="1" max="25"
                                value={equippedEcho.level}
                                onChange={(e) => handleLevelChange(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="font-bold text-gold w-12 text-center">Lv. {equippedEcho.level}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-300 mb-2">부옵션</h4>
                        <div className="space-y-2">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <select
                                        value={equippedEcho.subStats[i]?.stat || ''}
                                        onChange={e => handleSubStatUpdate(i, e.target.value, undefined)}
                                        className="w-full bg-gray-800 text-white rounded-md p-2 border border-gray-600 focus:ring-gold focus:border-gold"
                                    >
                                        <option value="">부옵션 선택...</option>
                                        {currentEchoInfo.subStats.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <SubStatInput
                                      stat={equippedEcho.subStats[i]?.stat || ''}
                                      value={equippedEcho.subStats[i]?.value || 0}
                                      onChange={val => handleSubStatUpdate(i, undefined, val)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


const StatDisplay: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="font-bold text-white text-base">{value}</span>
    </div>
);

const StatDisplayPanel: React.FC<{ stats: any | null }> = ({ stats }) => (
  <div className="bg-gray-800 p-6 rounded-lg sticky top-6">
    <h2 className="text-xl font-bold mb-4 text-gold">최종 스탯</h2>
    <div className="space-y-2">
      {stats && !stats.Error ? (
        <>
            <StatDisplay label="HP" value={stats.HP.toLocaleString()} />
            <StatDisplay label="공격력" value={stats.ATK.toLocaleString()} />
            <StatDisplay label="방어력" value={stats.DEF.toLocaleString()} />
            <StatDisplay label="치명타 확률" value={`${stats[koreanToInternalMap['치명타 확률']].toFixed(1)}%`} />
            <StatDisplay label="치명타 피해" value={`${stats[koreanToInternalMap['치명타 피해']].toFixed(1)}%`} />
            <StatDisplay label="공명 효율" value={`${stats[koreanToInternalMap['공명 효율']].toFixed(1)}%`} />
            <StatDisplay label="치유 보너스" value={`${stats[koreanToInternalMap['치유 보너스']].toFixed(1)}%`} />
            <hr className="border-gray-600 my-2" />
            <StatDisplay label="기류 피해" value={`${stats[koreanToInternalMap['기류 피해 보너스']].toFixed(1)}%`} />
            <StatDisplay label="응결 피해" value={`${stats[koreanToInternalMap['응결 피해 보너스']].toFixed(1)}%`} />
            <StatDisplay label="용융 피해" value={`${stats[koreanToInternalMap['용융 피해 보너스']].toFixed(1)}%`} />
            <StatDisplay label="전도 피해" value={`${stats[koreanToInternalMap['전도 피해 보너스']].toFixed(1)}%`} />
            <StatDisplay label="인멸 피해" value={`${stats[koreanToInternalMap['인멸 피해 보너스']].toFixed(1)}%`} />
            <StatDisplay label="회절 피해" value={`${stats[koreanToInternalMap['회절 피해 보너스']].toFixed(1)}%`} />
        </>
      ) : (
        <p className="text-center text-gray-500 py-10">{stats?.Error || "캐릭터를 선택하여 스탯 계산을 시작하세요."}</p>
      )}
    </div>
  </div>
);

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
            {message}
        </div>
    );
};

const PresetManager: React.FC<{
    presets: Preset[];
    onLoad: (build: Build) => void;
    onDelete: (index: number) => void;
    onClose: () => void;
}> = ({ presets, onLoad, onDelete, onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">프리셋 관리</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto">
                {presets.length > 0 ? (
                    <ul className="space-y-2">
                        {presets.map((preset, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                                <span className="text-white font-medium">{preset.name}</span>
                                <div className="space-x-2">
                                    <button onClick={() => onLoad(preset.build)} className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded">불러오기</button>
                                    <button onClick={() => onDelete(index)} className="text-sm bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded">삭제</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 text-center py-8">저장된 프리셋이 없습니다.</p>
                )}
            </div>
        </div>
    </div>
);


const SimulatorPage: React.FC = () => {
  const [build, setBuild] = useState<Build>(initialBuild);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  useEffect(() => {
    // Load presets from localStorage
    try {
      const savedPresets = localStorage.getItem('myeongjoPresets');
      if (savedPresets) {
        setPresets(JSON.parse(savedPresets));
      }
    } catch (error) {
      console.error("Failed to load presets:", error);
      localStorage.removeItem('myeongjoPresets');
    }

    // Load build from URL
    try {
      const params = new URLSearchParams(window.location.hash.split('?')[1]);
      const buildData = params.get('build');
      if (buildData) {
        const decodedBuild = JSON.parse(atob(buildData));
        if (decodedBuild && typeof decodedBuild === 'object' && 'resonatorId' in decodedBuild) {
           setBuild(decodedBuild as Build);
           setToastMessage('공유된 빌드를 불러왔습니다!');
        }
        window.location.hash = '/simulator';
      }
    } catch (error) {
      console.error("Failed to load build from URL:", error);
      window.location.hash = '/simulator';
    }
  }, []);

  const savePresetsToLocal = (newPresets: Preset[]) => {
      try {
          localStorage.setItem('myeongjoPresets', JSON.stringify(newPresets));
      } catch(error) {
          console.error("Failed to save presets:", error);
          setToastMessage("프리셋 저장에 실패했습니다.");
      }
  }

  const handleSavePreset = () => {
      const name = prompt("프리셋 이름을 입력하세요:", `프리셋 ${presets.length + 1}`);
      if (name) {
          const newPresets = [...presets, { name, build }];
          setPresets(newPresets);
          savePresetsToLocal(newPresets);
          setToastMessage(`"${name}" 프리셋이 저장되었습니다.`);
      }
  };

  const handleLoadPreset = (buildToLoad: Build) => {
      setBuild(buildToLoad);
      setShowPresetModal(false);
      setToastMessage('프리셋을 불러왔습니다.');
  };

  const handleDeletePreset = (index: number) => {
      if (confirm(`'${presets[index].name}' 프리셋을 정말 삭제하시겠습니까?`)) {
          const newPresets = presets.filter((_, i) => i !== index);
          setPresets(newPresets);
          savePresetsToLocal(newPresets);
          setToastMessage('프리셋이 삭제되었습니다.');
      }
  };
  
  const handleShare = () => {
    if (!build.resonatorId) {
        setToastMessage("공유할 캐릭터를 먼저 선택해주세요.");
        return;
    }
    try {
        const encodedBuild = btoa(JSON.stringify(build));
        const shareUrl = `${window.location.origin}${window.location.pathname}#/simulator?build=${encodedBuild}`;
        navigator.clipboard.writeText(shareUrl);
        setToastMessage("공유 링크가 클립보드에 복사되었습니다!");
    } catch (error) {
        console.error("Failed to create share link:", error);
        setToastMessage("공유 링크 생성에 실패했습니다.");
    }
  };

  const handleResetBuild = () => {
      if (confirm("정말로 현재 빌드를 초기화하시겠습니까?")) {
          setBuild(initialBuild);
          setToastMessage("빌드가 초기화되었습니다.");
      }
  }

  const calculatedStats = useMemo(() => {
    if (!build.resonatorId) return null;
    return calculateStats(build);
  }, [build]);
  
  const selectedResonator = useMemo(() => resonators.find(r => r.id === build.resonatorId), [build.resonatorId]);
  const availableWeapons = useMemo(() => selectedResonator ? weapons.filter(w => w.type === selectedResonator.weaponType) : [], [selectedResonator]);
  
  const handleResonatorChange = (id: string) => {
    const newResonator = resonators.find(r => r.id === id);
    if (!newResonator) return;

    setBuild(prev => ({ 
        ...initialBuild, 
        resonatorId: id, 
        resonatorLevel: prev.resonatorLevel,
        weaponLevel: prev.weaponLevel,
    }));
  };
  
  const handleWeaponChange = (id: string) => setBuild(prev => ({ ...prev, weaponId: id }));
  const handleLevelChange = (type: 'resonator' | 'weapon', level: number) => setBuild(prev => ({ ...prev, [`${type}Level`]: level }));
  const handleEchoUpdate = (index: number, updatedEcho: EquippedEcho | null) => {
      const newEchos = [...build.echos];
      newEchos[index] = updatedEcho;
      setBuild(prev => ({ ...prev, echos: newEchos }));
  };

  return (
    <div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
      {showPresetModal && <PresetManager presets={presets} onLoad={handleLoadPreset} onDelete={handleDeletePreset} onClose={() => setShowPresetModal(false)} />}
      
      <h1 className="text-3xl font-bold mb-2 text-white">빌드 시뮬레이터</h1>
      <p className="text-gray-400 mb-6">캐릭터, 무기, 에코를 조합하여 최종 스탯을 실시간으로 계산해보세요.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResonatorSelector build={build} onChange={handleResonatorChange} onLevelChange={(level) => handleLevelChange('resonator', level)} />
                <WeaponSelector build={build} selectedResonator={selectedResonator} availableWeapons={availableWeapons} onChange={handleWeaponChange} onLevelChange={(level) => handleLevelChange('weapon', level)} />
              </div>
               <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                    <button onClick={handleSavePreset} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors">프리셋 저장</button>
                    <button onClick={() => setShowPresetModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">프리셋 관리</button>
                    <button onClick={handleShare} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded transition-colors">공유하기</button>
                    <button onClick={handleResetBuild} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors ml-auto">빌드 초기화</button>
                </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gold">에코 (4-3-3-1-1)</h2>
            <div className="space-y-4">
              {echoSlotCosts.map((cost, index) => (
                <EchoSlot key={index} index={index} cost={cost} equippedEcho={build.echos[index]} onUpdate={handleEchoUpdate} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <StatDisplayPanel stats={calculatedStats} />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;