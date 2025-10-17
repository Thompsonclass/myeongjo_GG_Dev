import { Echo, EchoSet } from '../types';

// Image URLs are now local assets.
const commonSubStats = ['치명타 확률', '치명타 피해', '공격력%', '공격력', '체력%', '체력', '방어력%', '방어력', '공명 효율'];
const damageSubStats = [...commonSubStats, '스킬 피해', '일반 공격 피해', '강공격 피해', '해방 피해'];
const elementDmgMap: { [key: string]: string } = {
  [EchoSet.SIERRA_GALE]: '기류 피해 보너스',
  [EchoSet.VOID_THUNDER]: '전도 피해 보너스',
  [EchoSet.MOLTEN_RIFT]: '용융 피해 보너스',
  [EchoSet.FREEZING_FROST]: '응결 피해 보너스',
  [EchoSet.SUN_SINKING_ECLIPSE]: '인멸 피해 보너스',
  [EchoSet.CELESTIAL_RADIANCE]: '회절 피해 보너스',
};

const cost4MainStats = ['치명타 확률', '치명타 피해', '공격력%', '체력%', '방어력%'];
const cost3MainStats = (set: EchoSet) => {
    const elementalBonus = elementDmgMap[set];
    const stats = ['공명 효율', '공격력%', '체력%', '방어력%'];
    if (elementalBonus) {
        stats.unshift(elementalBonus);
    }
    return stats;
};
const cost1MainStats = ['공격력%', '체력%', '방어력%'];

export const echos: Echo[] = [
  // Cost 4 (Bosses - 노도급/해일급)
  { id: 'mourning_aix', name: '애곡하는 앙조', cost: 4, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%A0%EA%B3%A1%ED%95%98%EB%8A%94%20%EC%95%99%EC%A1%B0', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'feilian_beringal', name: '비렴 제압자', cost: 4, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%B9%84%EB%A0%B4%20%EC%A0%9C%EC%95%95%EC%9E%90', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'thundering_mephis', name: '뇌운의 비늘', cost: 4, set: EchoSet.VOID_THUNDER, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%87%8C%EC%9A%B4%EC%9D%98%20%EB%B9%84%EB%8A%98', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'lampylumen_myriad', name: '반디의 군세', cost: 4, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%B0%98%EB%94%94%EC%9D%98%20%EA%B5%B0%EC%84%B8', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'inferno_rider', name: '지옥불 기사', cost: 4, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%A7%80%EC%98%A5%EB%B6%88%20%EA%B8%B0%EC%82%AC', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'mech_abomination', name: '메카네이터 프리즘', cost: 4, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%A9%94%EC%B9%B4%EB%84%A4%EC%9D%B4%ED%84%B0%20%ED%94%84%EB%A6%AC%EC%A6%98', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'impermanence_heron', name: '무상성 해오라기', cost: 4, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%AC%B4%EC%83%81%EC%84%B1%20%ED%95%B4%EC%98%A4%EB%9D%BC%EA%B8%B0', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'crownless', name: '무관의 왕', cost: 4, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%AC%B4%EA%B4%80%EC%9D%98%20%EC%99%95', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'dreamless', name: '꿈 없는 자', cost: 4, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%BF%88%20%EC%97%86%EB%8A%94%20%EC%9E%90', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'bell_borne_geochelone', name: '타종 거북이', cost: 4, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%83%80%EC%A2%85%20%EA%B1%B0%EB%B6%81%EC%9D%B4', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'nightmare_lampylumen', name: '악몽 · 반디의 군세', cost: 4, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%85%EB%AA%BD%20%C2%B7%20%EB%B0%98%EB%94%94%EC%9D%98%20%EA%B5%B0%EC%84%B8', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'nightmare_crownless', name: '악몽 · 크라운리스', cost: 4, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%85%EB%AA%BD%20%C2%B7%20%ED%81%AC%EB%9D%BC%EC%9A%B4%EB%A6%AC%EC%8A%A4', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'nightmare_thundering_mephis', name: '악몽 · 천둥의 비늘', cost: 4, set: EchoSet.VOID_THUNDER, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%85%EB%AA%BD%20%C2%B7%20%EC%B2%9C%EB%91%A5%EC%9D%98%20%EB%B9%84%EB%8A%98', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'nightmare_mourning_aix', name: '악몽 · 애곡하는 아익스', cost: 4, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%85%EB%AA%BD%20%C2%B7%20%EC%95%A0%EA%B3%A1%ED%95%98%EB%8A%94%20%EC%95%84%EC%9D%B5%EC%8A%A4', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'nightmare_impermanence_heron', name: '악몽 · 음험한 백로', cost: 4, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%85%EB%AA%BD%20%C2%B7%20%EC%9D%8C%ED%97%98%ED%95%9C%20%EB%B0%B1%EB%A1%9C', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'nightmare_inferno_rider', name: '악몽 · 지옥불 기사', cost: 4, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%85%EB%AA%BD%20%C2%B7%20%EC%A7%80%EC%98%A5%EB%B6%88%20%EA%B8%B0%EC%82%AC', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'nightmare_rampaging_gorilla', name: '악몽 · 폭주의 고릴라', cost: 4, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%85%EB%AA%BD%20%C2%B7%20%ED%8F%AD%EC%A3%BC%EC%9D%98%20%EA%B3%A0%EB%A6%B4%EB%9D%BC', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'fleur_de_lys', name: '공명의 메아리 · 플뢰르 드 리스', cost: 4, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B3%B5%EB%AA%85%EC%9D%98%20%EB%A9%94%EC%95%84%EB%A6%AC%20%C2%B7%20%ED%94%8C%EB%A2%B0%EB%A5%B4%20%EB%93%9C%20%EB%A6%AC%EC%8A%A4', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'black_moon_beast', name: '흑월의 야수', cost: 4, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%9D%91%EC%9B%94%EC%9D%98%20%EC%95%BC%EC%88%98', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'rampaging_gorilla', name: '폭주의 고릴라', cost: 4, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%8F%AD%EC%A3%BC%EC%9D%98%20%EA%B3%A0%EB%A6%B4%EB%9D%BC', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'dragonscale_hinge', name: '용비늘의 기축', cost: 4, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9A%A9%EB%B9%84%EB%8A%98%EC%9D%98%20%EA%B8%B0%EC%B6%95', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'dragon_constellation', name: '용의 별자리', cost: 4, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9A%A9%EC%9D%98%20%EB%B3%84%EC%9E%90%EB%A6%AC', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'error_with_no_return', name: '돌아갈 곳이 없는 오류', cost: 4, set: EchoSet.VOID_THUNDER, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%8F%8C%EC%95%84%EA%B0%88%20%EA%B3%B3%EC%9D%B4%20%EC%97%86%EB%8A%94%20%EC%98%A4%EB%A5%98', mainStats: cost4MainStats, subStats: damageSubStats },
  { id: 'wailing_ancient_dragon', name: '탄식의 고룡', cost: 4, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%83%84%EC%8B%9D%EC%9D%98%20%EA%B3%A0%EB%A3%A1', mainStats: cost4MainStats, subStats: damageSubStats },

  // Cost 3 (Elites - 거랑급)
  { id: 'aero_predator', name: '초록색 왜가리', cost: 3, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%B4%88%EB%A1%9D%EC%83%89%20%EC%99%9C%EA%B0%80%EB%A6%AC', mainStats: cost3MainStats(EchoSet.SIERRA_GALE), subStats: damageSubStats },
  { id: 'violet_feathered_heron', name: '자색깃 해오라기', cost: 3, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9E%90%EC%83%89%EA%B9%83%20%ED%95%B4%EC%98%A4%EB%9D%BC%EA%B8%B0', mainStats: cost3MainStats(EchoSet.CELESTIAL_RADIANCE), subStats: damageSubStats },
  { id: 'electro_predator', name: '보라색 왜가리', cost: 3, set: EchoSet.VOID_THUNDER, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%B3%B4%EB%9D%BC%EC%83%89%20%EC%99%9C%EA%B0%80%EB%A6%AC', mainStats: cost3MainStats(EchoSet.VOID_THUNDER), subStats: damageSubStats },
  { id: 'fusion_dreadmane', name: '용융의 갈기', cost: 3, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9A%A9%EC%9C%B5%EC%9D%98%20%EA%B0%88%EA%B8%B0', mainStats: cost3MainStats(EchoSet.MOLTEN_RIFT), subStats: damageSubStats },
  { id: 'havoc_dreadmane', name: '암흑의 갈기', cost: 3, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%94%ED%9D%91%EC%9D%98%20%EA%B0%88%EA%B8%B0', mainStats: cost3MainStats(EchoSet.SUN_SINKING_ECLIPSE), subStats: damageSubStats },
  { id: 'glacio_predator', name: '얼음의 포식자', cost: 3, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%96%BC%EC%9D%8C%EC%9D%98%20%ED%8F%AC%EC%8B%9D%EC%9E%90', mainStats: cost3MainStats(EchoSet.FREEZING_FROST), subStats: damageSubStats },
  { id: 'chasm_guardian', name: '협곡의 수호자', cost: 3, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%98%91%EA%B3%A1%EC%9D%98%20%EC%88%98%ED%98%B8%EC%9E%90', mainStats: ['공격력%'], subStats: damageSubStats },
  { id: 'tambourinist', name: '마접의 악사', cost: 3, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%A7%88%EC%A0%91%EC%9D%98%20%EC%95%85%EC%82%AC', mainStats: ['공격력%'], subStats: damageSubStats },
  { id: 'hoochief', name: '후파파', cost: 3, set: EchoSet.MOONLIT_CLOUDS, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%9B%84%ED%8C%8C%ED%8C%8C', mainStats: ['공명 효율'], subStats: damageSubStats },
  { id: 'spearback', name: '화살곰', cost: 3, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%99%94%EC%82%B4%EA%B3%B0', mainStats: ['체력%'], subStats: damageSubStats },
  { id: 'indomitable_guard', name: '불굴의 호위', cost: 3, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%B6%88%EA%B5%B4%EC%9D%98%20%ED%98%B8%EC%9C%84', mainStats: ['체력%'], subStats: damageSubStats },
  { id: 'frost_dreadmane', name: '갈기늑대 · 서리', cost: 3, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B0%88%EA%B8%B0%EB%8A%91%EB%8C%80%20%C2%B7%20%EC%84%9C%EB%A6%AC', mainStats: cost3MainStats(EchoSet.FREEZING_FROST), subStats: damageSubStats },
  { id: 'snowflake_dreadmane', name: '갈기늑대 · 눈꽃', cost: 3, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B0%88%EA%B8%B0%EB%8A%91%EB%8C%80%20%C2%B7%20%EB%88%88%EA%BD%83', mainStats: cost3MainStats(EchoSet.FREEZING_FROST), subStats: damageSubStats },
  { id: 'thunder_dreadmane', name: '갈기늑대 · 천둥', cost: 3, set: EchoSet.VOID_THUNDER, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B0%88%EA%B8%B0%EB%8A%91%EB%8C%80%20%C2%B7%20%EC%B2%9C%EB%91%A5', mainStats: cost3MainStats(EchoSet.VOID_THUNDER), subStats: damageSubStats },
  { id: 'flame_dreadmane', name: '갈기늑대 · 불꽃', cost: 3, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B0%88%EA%B8%B0%EB%8A%91%EB%8C%80%20%C2%B7%20%EB%B6%88%EA%BD%83', mainStats: cost3MainStats(EchoSet.MOLTEN_RIFT), subStats: damageSubStats },
  { id: 'wind_dreadmane', name: '갈기늑대 · 바람', cost: 3, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B0%88%EA%B8%B0%EB%8A%91%EB%8C%80%20%C2%B7%20%EB%B0%94%EB%9E%8C', mainStats: cost3MainStats(EchoSet.SIERRA_GALE), subStats: damageSubStats },
  { id: 'vortex_bear', name: '소용돌이 곰', cost: 3, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%86%8C%EC%9A%A9%EB%8F%8C%EC%9D%B4%20%EA%B3%B0', mainStats: cost3MainStats(EchoSet.SIERRA_GALE), subStats: damageSubStats },
  { id: 'vanguard_rock', name: '선봉 암괴', cost: 3, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%84%A0%EB%B4%89%20%EC%95%94%EA%B4%B4', mainStats: ['방어력%'], subStats: damageSubStats },
  { id: 'abyssal_guard', name: '심연의 위병', cost: 3, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%8B%AC%EC%97%B0%EC%9D%98%20%EC%9C%84%EB%B3%91', mainStats: cost3MainStats(EchoSet.SUN_SINKING_ECLIPSE), subStats: damageSubStats },
  { id: 'soul_summoning_musician', name: '초혼의 악사', cost: 3, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%B4%88%ED%98%BC%EC%9D%98%20%EC%95%85%EC%82%AC', mainStats: ['공격력%'], subStats: damageSubStats },
  // Fix: Replaced non-existent `EchoSet.SPECTRO` with `EchoSet.CELESTIAL_RADIANCE`.
  { id: 'greenmelting_chameleon', name: '그린멜팅카멜레온', cost: 3, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B7%B8%EB%A6%B0%EB%A9%9C%ED%8C%85%EC%B9%B4%EB%A9%9C%EB%A0%88%EC%98%A8', mainStats: cost3MainStats(EchoSet.CELESTIAL_RADIANCE), subStats: damageSubStats },
  { id: 'thornrose_mushroom', name: '가시장미버섯', cost: 3, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B0%80%EC%8B%9C%EC%9E%A5%EB%AF%B8%EB%B2%84%EC%84%AF', mainStats: ['공격력%'], subStats: damageSubStats },

  // Cost 1 (Common - 경파급)
  { id: 'cruisewing', name: '순회 나비', cost: 1, set: EchoSet.MOONLIT_CLOUDS, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%88%9C%ED%9A%8C%20%EB%82%98%EB%B9%84', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'hooppaw', name: '후슈슈', cost: 1, set: EchoSet.MOONLIT_CLOUDS, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%9B%84%EC%8A%88%EC%8A%88', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'snip_snap', name: '결정화 전갈', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B2%B0%EC%A0%95%ED%99%94%20%EC%A0%84%EA%B0%88', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'sabyr_boar', name: '쇄아멧돼지', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%87%84%EC%95%84%EB%A9%A7%EB%8F%BC%EC%A7%80', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'young_geohide', name: '서릿땅거북', cost: 1, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%84%9C%EB%A6%BF%EB%95%85%EA%B1%B0%EB%B6%81', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'gulpuff', name: '그린멜팅카멜레온(유체)', cost: 1, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B7%B8%EB%A6%B0%EB%A9%9C%ED%8C%85%EC%B9%B4%EB%A9%9C%EB%A0%88%EC%98%A8(%EC%9C%A0%EC%B2%B4)', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'whiff_whaff', name: '쮸쮸 복어', cost: 1, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%AE%B8%EC%AE%B8%20%EB%B3%B5%EC%96%B4', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'boomerang_hunter', name: '부메랑 사냥꾼', cost: 1, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%B6%80%EB%A9%94%EB%9E%91%20%EC%82%AC%EB%83%A5%EA%BE%BC', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'zig_zag', name: '경칩의 사냥꾼', cost: 1, set: EchoSet.VOID_THUNDER, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B2%BD%EC%B9%A9%EC%9D%98%20%EC%82%AC%EB%83%A5%EA%BE%BC', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'wailing_warrior', name: '오열하는 전사', cost: 1, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%98%A4%EC%97%B4%ED%95%98%EB%8A%94%20%EC%A0%84%EC%82%AC', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'hoarfrost_hunter', name: '상강의 사냥꾼', cost: 1, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%83%81%EA%B0%95%EC%9D%98%20%EC%82%AC%EB%83%A5%EA%BE%BC', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'judging_warrior', name: '심판하는 전사', cost: 1, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%8B%AC%ED%8C%90%ED%95%98%EB%8A%94%20%EC%A0%84%EC%82%AC', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'azizz', name: '아즈즈', cost: 1, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%95%84%EC%A6%88%EC%A6%88', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'spectro_prism', name: '회절 프리즘', cost: 1, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%9A%8C%EC%A0%88%20%ED%94%84%EB%A6%AC%EC%A6%98', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'aero_prism', name: '기류 프리즘', cost: 1, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B8%B0%EB%A5%98%20%ED%94%84%EB%A6%AC%EC%A6%98', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'fusion_prism', name: '용융 프리즘', cost: 1, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9A%A9%EC%9C%B5%20%ED%94%84%EB%A6%AC%EC%A6%98', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'glacio_prism', name: '응결 프리즘', cost: 1, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9D%91%EA%B2%B0%20%ED%94%84%EB%A6%AC%EC%A6%98', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'havoc_prism', name: '인멸 프리즘', cost: 1, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9D%B8%EB%A9%B8%20%ED%94%84%EB%A6%AC%EC%A6%98', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'mimic', name: '미믹', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%AF%B8%EB%AF%B9', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'cloudsea_fairy', name: '구름 바다 요정', cost: 1, set: EchoSet.MOONLIT_CLOUDS, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B5%AC%EB%A6%84%20%EB%B0%94%EB%8B%A4%20%EC%9A%94%EC%A0%95', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'thornrose_mushroom_larva', name: '가시장미버섯(유체)', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B0%80%EC%8B%9C%EC%9E%A5%EB%AF%B8%EB%B2%84%EC%84%AF(%EC%9C%A0%EC%B2%B4)', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'rock_golem_heavy', name: '거암 투사', cost: 1, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B1%B0%EC%95%94%20%ED%88%AC%EC%82%AC', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'light_tank_robot', name: '경전차 로봇', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B2%BD%EC%A0%84%EC%B0%A8%20%EB%A1%9C%EB%B4%87', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'blade_dancer', name: '블레이드 댄서', cost: 1, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%B8%94%EB%A0%88%EC%9D%B4%EB%93%9C%20%EB%8C%84%EC%84%9C', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'ding_dong', name: '딩동동', cost: 1, set: EchoSet.CELESTIAL_RADIANCE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%94%A9%EB%8F%99%EB%8F%99', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'pygmy_ostrich', name: '피그미타조', cost: 1, set: EchoSet.SIERRA_GALE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%ED%94%BC%EA%B7%B8%EB%AF%B8%ED%83%80%EC%A1%B0', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'wiggle', name: '우글글', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9A%B0%EA%B8%80%EA%B8%80', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'puffy', name: '꾹꾹복어', cost: 1, set: EchoSet.FREEZING_FROST, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%BE%B9%EA%BE%B9%EB%B3%B5%EC%96%B4', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'lava_worm', name: '용암 벌레', cost: 1, set: EchoSet.MOLTEN_RIFT, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9A%A9%EC%95%94%20%EB%B2%8C%EB%A0%88', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'clang_clang', name: '칵찰찰', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%BA%85%EC%B0%B0%EC%B0%B0', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'assemblable_robot', name: '조립식 로봇', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%A1%B0%EB%A6%BD%EC%8B%9D%20%EB%A1%9C%EB%B4%87', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'traffic_light_robot', name: '신호등 로봇', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%8B%A0%ED%98%B8%EB%93%B1%20%EB%A1%9C%EB%B4%87', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'ghost_doll_head', name: '유령 인형 · 헤드', cost: 1, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9C%A0%EB%A0%B9%20%EC%9D%B8%ED%98%95%20%C2%B7%20%ED%97%A4%EB%93%9C', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'mole', name: '두더지', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EB%91%90%EB%8D%94%EC%A7%80', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'young_monkey', name: '어린 원숭이', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%96%B4%EB%A6%B0%20%EC%9B%90%EC%88%AD%EC%9D%B4', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'mischievous_monkey', name: '까부는 원숭이', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B9%8C%EB%B6%80%EB%8A%94%20%EC%9B%90%EC%88%AD%EC%9D%B4', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'ghost_doll_leff', name: '유령 인형 · 레프', cost: 1, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9C%A0%EB%A0%B9%20%EC%9D%B8%ED%98%95%20%C2%B7%20%EB%A0%88%ED%94%84', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'working_doll', name: '근무 인형', cost: 1, set: EchoSet.LINGERING_TUNES, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EA%B7%BC%EB%AC%B4%20%EC%9D%B8%ED%98%95', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'ghost_doll', name: '유령 인형', cost: 1, set: EchoSet.SUN_SINKING_ECLIPSE, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9C%A0%EB%A0%B9%20%EC%9D%B8%ED%98%95', mainStats: cost1MainStats, subStats: commonSubStats },
  { id: 'glazed_rock', name: '유약 암괴', cost: 1, set: EchoSet.REJUVENATING_GLOW, imageUrl: 'https://via.placeholder.com/96/1e1e1e/e5e7eb?text=%EC%9C%A0%EC%95%BD%20%EC%95%94%EA%B4%B4', mainStats: cost1MainStats, subStats: commonSubStats },
];