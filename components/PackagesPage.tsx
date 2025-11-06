import React from 'react';
import { Page, Language, PackageDeal } from '../types';
import { TRANSLATIONS, PACKAGES_DATA } from '../constants';
import { PlaneIcon, HotelIcon, StarIcon, ArrowLeftIcon } from './Icons';

interface PackagesPageProps {
  setCurrentPage: (page: Page) => void;
  setBookingDetails: (details: any) => void;
  currentLanguage: Language;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ setCurrentPage, setBookingDetails, currentLanguage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];

  const handleBookNow = (pkg: PackageDeal) => {
    setBookingDetails({ type: 'Package', details: pkg });
    setCurrentPage(Page.Confirmation);
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
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
            <h1 className="text-4xl font-bold text-gray-800 inline-block">{t('packages')}</h1>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {PACKAGES_DATA.map(pkg => {
            const originalPrice = pkg.flight.price + pkg.hotel.pricePerNight;
            const savedAmount = originalPrice * (pkg.discountPercentage / 100);
            const finalPrice = originalPrice - savedAmount;

            return (
              <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
                {/* Image and Price Section */}
                <div className="w-full md:w-1/3 relative">
                  <img src={pkg.hotel.image} alt={pkg.hotel.hotelName} className="w-full h-full object-cover" />
                  <div className="absolute top-0 right-0 bg-red-500 text-white font-bold text-sm px-3 py-1 m-2 rounded-full">
                    {t('you_save')} ${savedAmount.toFixed(0)}!
                  </div>
                </div>
                {/* Details Section */}
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{pkg.hotel.city} {t('package_deal')}</h2>
                    {/* Flight Details */}
                    <div className="border-b pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <PlaneIcon className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-700">{t('flights')}</h3>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                          <div className="flex items-center gap-2">
                              <img src={pkg.flight.airlineLogo} alt={pkg.flight.airline} className="w-6 h-6 rounded-full" />
                              <span>{pkg.flight.airline}</span>
                          </div>
                          <div className="font-semibold">{pkg.flight.from} → {pkg.flight.to}</div>
                          <span>{pkg.flight.departureDate}</span>
                      </div>
                    </div>
                    {/* Hotel Details */}
                    <div>
                      <div className="flex items-center gap-3">
                        <HotelIcon className="w-6 h-6 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-700">{t('hotels')}</h3>
                      </div>
                       <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                          <span className="font-semibold">{pkg.hotel.hotelName}</span>
                          <StarRating rating={pkg.hotel.rating} />
                          <span>{pkg.hotel.roomType}</span>
                      </div>
                    </div>
                  </div>
                  {/* Booking Action */}
                  <div className="mt-6 flex items-end justify-between">
                    <div>
                        <p className="text-sm text-gray-500 line-through">
                            ${originalPrice.toFixed(2)}
                        </p>
                        <p className="text-3xl font-bold text-blue-600">
                            ${finalPrice.toFixed(2)}
                        </p>
                    </div>
                    <button onClick={() => handleBookNow(pkg)} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105">
                      {t('book_package')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;