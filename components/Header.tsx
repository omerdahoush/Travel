import React, { useState, useEffect } from 'react';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { PlaneIcon, HotelIcon, BookOpenIcon, PackageIcon, MapPinIcon } from './Icons';

interface HeaderProps {
  setCurrentPage: (page: Page) => void;
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, currentLanguage, setLanguage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { page: Page.Flights, label: t('flights'), icon: <PlaneIcon className="w-5 h-5" /> },
    { page: Page.Hotels, label: t('hotels'), icon: <HotelIcon className="w-5 h-5" /> },
    { page: Page.Packages, label: t('packages'), icon: <PackageIcon className="w-5 h-5" /> },
    { page: Page.TripPlanner, label: t('trip_planner'), icon: <MapPinIcon className="w-5 h-5" /> },
    { page: Page.Bookings, label: t('my_bookings'), icon: <BookOpenIcon className="w-5 h-5" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage(Page.Home)}
          >
            <PlaneIcon className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">{t('travelmate')}</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button 
                onClick={() => setLanguage(Language.En)} 
                className={`px-3 py-1 text-sm font-medium transition-colors ${currentLanguage === Language.En ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>
                EN
              </button>
              <button 
                onClick={() => setLanguage(Language.Ar)} 
                className={`px-3 py-1 text-sm font-medium transition-colors ${currentLanguage === Language.Ar ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>
                AR
              </button>
            </div>
            {/* Placeholder for User Profile */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 font-bold">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;