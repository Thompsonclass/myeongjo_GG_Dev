import React from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    const activeClass = 'bg-gray-700 text-white';
    const inactiveClass = 'text-gray-300 hover:bg-gray-700 hover:text-white';

    return (
        <NavLink
            to={to}
            className={({ isActive }) => `${isActive ? activeClass : inactiveClass} rounded-md px-3 py-2 text-sm font-medium`}
        >
            {children}
        </NavLink>
    );
};


export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-white">Myeongjo.gg</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavItem to="/">Home</NavItem>
                  <NavItem to="/resonators">공명자</NavItem>
                  <NavItem to="/weapons">무기</NavItem>
                  <NavItem to="/echos">에코</NavItem>
                   <NavItem to="/builds">추천 빌드</NavItem>
                  <NavItem to="/simulator">빌드 시뮬레이터</NavItem>
                  <NavItem to="/analyzer">빌드 분석기</NavItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};