import React from 'react';
import { Link } from 'react-router-dom';

// Fix: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const FeatureCard: React.FC<{ title: string; description: string; linkTo: string; icon: React.ReactNode }> = ({ title, description, linkTo, icon }) => (
    <Link to={linkTo} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 flex flex-col items-center text-center">
        <div className="mb-4 text-gold">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </Link>
);


const HomePage: React.FC = () => {
  return (
    <div className="text-center">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Myeongjo.gg: 당신의 명조 여정을 위한 최고의 동반자
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                흩어진 정보를 한 곳에. 국내 최고의 명조 데이터베이스 및 빌드 시뮬레이터 플랫폼에서 캐릭터를 완벽하게 성장시키세요.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
                title="공명자 DB" 
                description="모든 공명자의 상세 스탯, 스킬, 추천 장비 정보를 확인하세요."
                linkTo="/resonators"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
            />
            <FeatureCard 
                title="무기 DB" 
                description="모든 무기의 상세 스탯, 재련 효과, 돌파 재료를 찾아보세요."
                linkTo="/weapons"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>}
            />
             <FeatureCard 
                title="에코 DB" 
                description="모든 에코의 세트 효과, 주옵션, 부옵션 정보를 확인하세요."
                linkTo="/echos"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>}
            />
             <FeatureCard 
                title="추천 빌드" 
                description="커뮤니티의 지혜가 담긴 캐릭터별 최적의 빌드 공략을 확인하세요."
                linkTo="/builds"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>}
            />
            <FeatureCard 
                title="빌드 시뮬레이터" 
                description="캐릭터, 무기, 에코를 조합하여 최종 스탯을 실시간으로 계산해보세요."
                linkTo="/simulator"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>}
            />
        </div>
    </div>
  );
};

export default HomePage;