
import React from 'react';
// Fix: Corrected import path for types
import { Page } from '../types';
import Icon from './Icon';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  icon: string;
  currentPage: Page;
  onClick: (page: Page) => void;
}> = ({ page, label, icon, currentPage, onClick }) => {
  const isActive = currentPage === page;
  const activeClass = isActive ? 'text-indigo-600' : 'text-gray-500';

  return (
    <button
      onClick={() => onClick(page)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${activeClass} hover:text-indigo-600 focus:outline-none`}
    >
      <Icon name={icon} className="w-6 h-6" />
      <span className="text-xs mt-1">{label}</span>
      {page === Page.Sell && (
        <div className="absolute -top-4">
          <div className="relative flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-full text-white shadow-lg">
            <Icon name="sell" className="w-8 h-8"/>
          </div>
        </div>
      )}
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { page: Page.Home, label: 'Home', icon: 'home' },
    { page: Page.Chat, label: 'Chat', icon: 'chat' },
    { page: Page.Sell, label: 'Sell', icon: 'sell' },
    { page: Page.MyAds, label: 'My Ads', icon: 'ads' },
    { page: Page.Profile, label: 'Profile', icon: 'profile' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto relative">
        {navItems.map((item) => (
          <NavItem key={item.page} {...item} currentPage={currentPage} onClick={setCurrentPage} />
        ))}
      </div>
    </footer>
  );
};

export default BottomNav;