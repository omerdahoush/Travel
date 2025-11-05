import React, { useState } from 'react';
import { Page, Language } from '../types';
import { TRANSLATIONS, POPULAR_DESTINATIONS, SPECIAL_OFFERS } from '../constants';
import { PlaneIcon, HotelIcon, CalendarIcon, UsersIcon, MapPinIcon, PackageIcon } from './Icons';
import { generateItinerary } from '../services/geminiService';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  currentLanguage: Language;
}

const SearchForm: React.FC<{ currentLanguage: Language; setCurrentPage: (page: Page) => void; }> = ({ currentLanguage, setCurrentPage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'packages'>('flights');

  const tabs = [
    { id: 'flights', icon: PlaneIcon, label: t('flights') },
    { id: 'hotels', icon: HotelIcon, label: t('hotels') },
    { id: 'packages', icon: PackageIcon, label: t('packages') },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto">
      <div className="flex border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center space-x-2 w-1/3 py-3 font-semibold transition-colors duration-300 ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      {activeTab === 'flights' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end" onSubmit={(e) => { e.preventDefault(); setCurrentPage(Page.Flights); }}>
          <div className="col-span-1 md:col-span-2 lg:col-span-1"><label className="block text-sm font-medium text-gray-700">{t('from')}</label><input type="text" placeholder="New York" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" /></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1"><label className="block text-sm font-medium text-gray-700">{t('to')}</label><input type="text" placeholder="London" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" /></div>
          <div><label className="block text-sm font-medium text-gray-700">{t('departure')}</label><input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" /></div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105">{t('search')}</button>
        </form>
      )}
      {activeTab === 'hotels' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end" onSubmit={(e) => { e.preventDefault(); setCurrentPage(Page.Hotels); }}>
          <div className="col-span-1 md:col-span-2 lg:col-span-2"><label className="block text-sm font-medium text-gray-700">{t('city_hotel_name')}</label><input type="text" placeholder="Paris" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" /></div>
          <div><label className="block text-sm font-medium text-gray-700">{t('check_in')}</label><input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" /></div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105">{t('search')}</button>
        </form>
      )}
      {activeTab === 'packages' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end" onSubmit={(e) => { e.preventDefault(); setCurrentPage(Page.Packages); }}>
            <div className="col-span-1"><label className="block text-sm font-medium text-gray-700">{t('from')}</label><input type="text" placeholder="New York" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/></div>
            <div className="col-span-1"><label className="block text-sm font-medium text-gray-700">{t('destination')}</label><input type="text" placeholder="London" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/></div>
            <div className="col-span-1"><label className="block text-sm font-medium text-gray-700">{t('departure')}</label><input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/></div>
            <div className="col-span-1"><label className="block text-sm font-medium text-gray-700">{t('return')}</label><input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/></div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105">{t('search')}</button>
        </form>
      )}
    </div>
  );
};

const GeminiTripPlanner: React.FC<{ currentLanguage: Language }> = ({ currentLanguage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];
  const [prompt, setPrompt] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setItinerary('');
    const result = await generateItinerary(prompt);
    setItinerary(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('trip_planner_title')}</h3>
        <div className="flex flex-col md:flex-row gap-4">
            <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('trip_planner_prompt')}
                className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-400"
            >
                {isLoading ? t('generating') : t('generate_itinerary')}
            </button>
        </div>
        {itinerary && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{itinerary}</pre>
            </div>
        )}
    </div>
  );
};


const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, currentLanguage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/worldmap/1600/900')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Your Journey Starts Here</h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">Discover and book flights and hotels with ease.</p>
          <SearchForm currentLanguage={currentLanguage} setCurrentPage={setCurrentPage} />
        </div>
      </section>

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Popular Destinations */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('popular_destinations')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {POPULAR_DESTINATIONS.map(dest => (
                <div key={dest.city} className="relative rounded-xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300">
                  <img src={dest.image} alt={dest.city} className="w-full h-80 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{dest.city}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gemini Trip Planner */}
          <section>
              <GeminiTripPlanner currentLanguage={currentLanguage} />
          </section>

          {/* Special Offers */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('special_offers')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SPECIAL_OFFERS.map(offer => (
                <div key={offer.title} className="relative rounded-xl overflow-hidden shadow-lg flex items-end text-white p-8 h-64 bg-cover bg-center" style={{ backgroundImage: `url(${offer.image})` }}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative">
                    <h3 className="text-3xl font-bold">{offer.title}</h3>
                    <p className="text-xl mt-2 bg-yellow-400 text-black font-semibold inline-block px-3 py-1 rounded">{offer.discount}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;