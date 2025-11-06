import React, { useState, useMemo } from 'react';
import { Page, Language, Hotel } from '../types';
import { TRANSLATIONS, HOTELS_DATA } from '../constants';
import { StarIcon, ArrowLeftIcon } from './Icons';

interface HotelsPageProps {
  setCurrentPage: (page: Page) => void;
  setBookingDetails: (details: any) => void;
  currentLanguage: Language;
}

const HotelsPage: React.FC<HotelsPageProps> = ({ setCurrentPage, setBookingDetails, currentLanguage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter(hotel => {
      const priceMatch = hotel.pricePerNight <= priceRange;
      const ratingMatch = selectedRating === 0 || hotel.rating >= selectedRating;
      return priceMatch && ratingMatch;
    });
  }, [priceRange, selectedRating]);

  const handleBookNow = (hotel: Hotel) => {
    setBookingDetails({ type: 'Hotel', details: hotel });
    setCurrentPage(Page.Confirmation);
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

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
            <h1 className="text-4xl font-bold text-gray-800 inline-block">{t('hotels')}</h1>
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
              {/* Rating Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t('rating')}</h4>
                <div className="space-y-2">
                  {[0, 5, 4, 3].map(rating => (
                     <div key={rating} className="flex items-center">
                      <input
                        id={`rating-${rating}`}
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-600">
                        {rating === 0 ? t('all') : `${rating} ${t('stars_and_up')}`}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Hotel Results */}
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHotels.length > 0 ? filteredHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <img src={hotel.image} alt={hotel.hotelName} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">{hotel.hotelName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{hotel.city}</p>
                    <StarRating rating={hotel.rating} />
                    <div className="mt-4 flex-grow">
                      <p className="text-gray-600">{hotel.roomType}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-xl font-bold text-blue-600">${hotel.pricePerNight}<span className="text-sm font-normal text-gray-500">/night</span></p>
                       <button onClick={() => handleBookNow(hotel)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105">
                         {t('book_now')}
                       </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md md:col-span-2 xl:col-span-3">
                    <p className="text-gray-600 text-lg">No hotels match your criteria.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;