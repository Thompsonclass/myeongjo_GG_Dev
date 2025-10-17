import React, { useMemo, useState } from 'react';
import { buildGuides } from '../data/buildGuides';
import { resonators } from '../data/resonators';
import { BuildGuide, Element, Resonator, Rarity } from '../types';

const getRarityColor = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.FIVE_STAR: return 'bg-yellow-500/10 border-yellow-500';
    case Rarity.FOUR_STAR: return 'bg-purple-500/10 border-purple-500';
    default: return 'bg-gray-500/10 border-gray-500';
  }
};

const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-gold mb-3">{title}</h3>
        {children}
    </div>
);

const StatPill: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="bg-gray-700/50 rounded-full px-3 py-1 text-sm flex items-center gap-2">
        <span className="font-semibold text-gray-300">{label}:</span>
        <span className="text-white">{value}</span>
    </div>
);

const BuildGuideCard: React.FC<{ guide: BuildGuide & { resonator: Resonator } }> = ({ guide }) => (
    <div className={`bg-gray-800/50 border ${getRarityColor(guide.resonator.rarity)} rounded-xl overflow-hidden`}>
        <div className="p-4 bg-gray-900/30">
            <div className="flex items-center gap-4">
                <img src={guide.resonator.imageUrl} alt={guide.resonator.name} className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600" />
                <div>
                    <h2 className="text-2xl font-bold text-white">{guide.resonator.name}</h2>
                    <p className="text-sm text-gray-400">{guide.position}</p>
                </div>
            </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
                <Section title="기본 정보">
                    <div className="space-y-2 text-sm">
                        <p><strong className="text-gray-300">스킬 우선순위:</strong> {guide.skillPriority}</p>
                        <p><strong className="text-gray-300">노드 옵션:</strong> {guide.nodeOption}</p>
                    </div>
                </Section>
                <Section title="추천 무기">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {guide.recommendedWeapons.map((weapon, index) => (
                            <li key={index} className="text-white">{weapon.name} {weapon.tag && <span className="text-xs bg-gold/20 text-gold rounded-sm px-1.5 py-0.5 ml-1">{weapon.tag}</span>}</li>
                        ))}
                    </ul>
                </Section>
                 <Section title="참고 사항">
                    <p className="text-sm text-gray-300 italic">{guide.notes || '특별한 참고사항 없음'}</p>
                </Section>
            </div>

            <div className="space-y-4">
                <Section title="에코 세팅">
                    <div className="space-y-3">
                        <p className="font-bold text-white">{guide.echoSetup.set}</p>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-1">주옵션</h4>
                            <div className="flex flex-wrap gap-1">
                                {guide.echoSetup.mainStats.map((stat, i) => <span key={i} className="bg-blue-600/50 text-white text-xs font-medium px-2 py-1 rounded">{stat}</span>)}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-1">부옵션</h4>
                            <div className="flex flex-wrap gap-1">
                                {guide.echoSetup.subStats.map((stat, i) => <span key={i} className="bg-gray-600 text-gray-200 text-xs font-medium px-2 py-1 rounded">{stat}</span>)}
                            </div>
                        </div>
                    </div>
                </Section>
                <Section title="목표 스탯">
                     <div className="flex flex-wrap gap-2">
                        {Object.entries(guide.targetStats).map(([key, value]) => (
                           <StatPill key={key} label={key} value={value} />
                        ))}
                         <StatPill label="공명에너지" value={String(guide.resonanceEnergyCost)} />
                    </div>
                </Section>
            </div>
        </div>
    </div>
);


const BuildsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const guidesWithResonators = useMemo(() => {
        return buildGuides.map(guide => {
            const resonator = resonators.find(r => r.id === guide.resonatorId);
            return resonator ? { ...guide, resonator } : null;
        }).filter((g): g is BuildGuide & { resonator: Resonator } => g !== null);
    }, []);

    const filteredGuides = useMemo(() => {
        if (!searchTerm) {
            return guidesWithResonators;
        }
        return guidesWithResonators.filter(guide => 
            guide.resonator.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [guidesWithResonators, searchTerm]);


    const groupedGuides = useMemo(() => {
        return filteredGuides.reduce((acc, guide) => {
            const element = guide.element;
            if (!acc[element]) {
                acc[element] = [];
            }
            acc[element].push(guide);
            return acc;
        }, {} as Record<Element, (BuildGuide & { resonator: Resonator })[]>);
    }, [filteredGuides]);

    const elementOrder: Element[] = [Element.AERO, Element.FUSION, Element.GLACIO, Element.ELECTRO, Element.HAVOC, Element.SPECTRO];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-white">추천 빌드 가이드</h1>
            <p className="text-gray-400 mb-6">캐릭터별 추천 세팅 및 육성 가이드입니다.</p>
            
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <input
                    type="text"
                    placeholder="공명자 이름으로 검색..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-md px-4 py-2"
                />
            </div>

            <div className="space-y-8">
                {elementOrder.map(element => (
                    groupedGuides[element] && groupedGuides[element].length > 0 && (
                        <div key={element}>
                            <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b-2 border-gold/50">{element}</h2>
                            <div className="space-y-6">
                                {groupedGuides[element].map(guide => (
                                    <BuildGuideCard key={guide.resonatorId} guide={guide} />
                                ))}
                            </div>
                        </div>
                    )
                ))}
                {filteredGuides.length === 0 && searchTerm && (
                    <p className="text-center text-gray-400 py-10">"{searchTerm}"에 해당하는 공명자를 찾을 수 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default BuildsPage;
