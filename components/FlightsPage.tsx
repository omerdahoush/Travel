import React, { useState, useMemo } from 'react';
import { Page, Language, Flight } from '../types';
import { TRANSLATIONS, FLIGHTS_DATA } from '../constants';
import { PlaneIcon, ArrowLeftIcon } from './Icons';

interface FlightsPageProps {
  setCurrentPage: (page: Page) => void;
  setBookingDetails: (details: any) => void;
  currentLanguage: Language;
}

const FlightsPage: React.FC<FlightsPageProps> = ({ setCurrentPage, setBookingDetails, currentLanguage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  const airlines = useMemo(() => [...new Set(FLIGHTS_DATA.map(f => f.airline))], []);

  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  const filteredFlights = useMemo(() => {
    return FLIGHTS_DATA.filter(flight => {
      const priceMatch = flight.price <= priceRange;
      const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline);
      return priceMatch && airlineMatch;
    });
  }, [priceRange, selectedAirlines]);

  const handleBookNow = (flight: Flight) => {
    setBookingDetails({ type: 'Flight', details: flight });
    setCurrentPage(Page.Confirmation);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-8 text-center">
            <button
                onClick={() => setCurrentPage(Page.Home)}
                className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                aria-label={t('back')}
            >
                <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="ml-2 font-semibold">{t('back')}</span>
            </button>
            <h1 className="text-4xl font-bold text-gray-800 inline-block">{t('flights')}</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-semibold mb-4">{t('filter_by')}</h3>
              {/* Price Range Filter */}
              <div className="mb-6">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">{t('price_range')}: <span className="font-bold text-blue-600">${priceRange}</span></label>
                <input
                  id="price"
                  type="range"
                  min="300"
                  max="1500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              {/* Airlines Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t('airlines')}</h4>
                <div className="space-y-2">
                  {airlines.map(airline => (
                    <div key={airline} className="flex items-center">
                      <input
                        id={airline}
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => handleAirlineToggle(airline)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={airline} className="ml-2 text-sm text-gray-600">{airline}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Flight Results */}
          <main className="w-full lg:w-3/4">
            <div className="space-y-6">
              {filteredFlights.length > 0 ? filteredFlights.map(flight => (
                <div key={flight.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img src={flight.airlineLogo} alt={`${flight.airline} logo`} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-lg text-gray-800">{flight.airline}</p>
                        <p className="text-sm text-gray-500">Departure: {flight.departureDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 font-semibold text-gray-700">
                      <span>{flight.from}</span>
                      <PlaneIcon className="w-5 h-5 text-blue-500" />
                      <span>{flight.to}</span>
                    </div>
                    <div className="text-center md:text-right">
                       <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                       <button onClick={() => handleBookNow(flight)} className="mt-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105">
                         {t('book_now')}
                       </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg">No flights match your criteria.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;