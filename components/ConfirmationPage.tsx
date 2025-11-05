import React from 'react';
import { Page, Language, Booking } from '../types';
import { TRANSLATIONS } from '../constants';
import { PlaneIcon, HotelIcon, PackageIcon } from './Icons';

interface ConfirmationPageProps {
  bookingDetails: Booking | null;
  setCurrentPage: (page: Page) => void;
  currentLanguage: Language;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ bookingDetails, setCurrentPage, currentLanguage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];

  if (!bookingDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-700">No booking details found.</h2>
        <button onClick={() => setCurrentPage(Page.Home)} className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          {t('back_to_home')}
        </button>
      </div>
    );
  }

  const { type, details } = bookingDetails;
  
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">{t('booking_confirmation')}</h1>
          <p className="mt-2 text-gray-600">{t('thank_you')}</p>
          
          <div className="mt-8 border-t border-gray-200 pt-6 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('booking_summary')}</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <p><strong>{t('booking_date')}</strong> {bookingDetails.bookingDate}</p>
              {type === 'Flight' && 'from' in details && (
                <>
                  <div className="flex items-center gap-2"><PlaneIcon className="w-5 h-5 text-blue-600" /> <span className="font-bold text-lg">{details.airline}</span></div>
                  <p><strong>{t('from')}:</strong> {details.from}</p>
                  <p><strong>{t('to')}:</strong> {details.to}</p>
                  <p><strong>{t('departure')}:</strong> {details.departureDate}</p>
                  <p className="text-xl font-bold text-right text-blue-700">${details.price}</p>
                </>
              )}
              {type === 'Hotel' && 'hotelName' in details && (
                <>
                  <div className="flex items-center gap-2"><HotelIcon className="w-5 h-5 text-blue-600" /> <span className="font-bold text-lg">{details.hotelName}</span></div>
                  <p><strong>City:</strong> {details.city}</p>
                  <p><strong>Room:</strong> {details.roomType}</p>
                  <p className="text-xl font-bold text-right text-blue-700">${details.pricePerNight}/night</p>
                </>
              )}
               {type === 'Package' && 'flight' in details && (
                <>
                  <div className="flex items-center gap-2"><PackageIcon className="w-5 h-5 text-blue-600" /> <span className="font-bold text-lg">{t('package_deal')}</span></div>
                  <div className="border-t mt-2 pt-2">
                    <p className="font-semibold text-gray-700">{t('flights')}:</p>
                    <p><strong>{details.flight.airline}:</strong> {details.flight.from} to {details.flight.to}</p>
                    <p><strong>{t('departure')}:</strong> {details.flight.departureDate}</p>
                  </div>
                   <div className="border-t mt-2 pt-2">
                    <p className="font-semibold text-gray-700">{t('hotels')}:</p>
                    <p><strong>{details.hotel.hotelName}</strong>, {details.hotel.city}</p>
                    <p><strong>Room:</strong> {details.hotel.roomType}</p>
                  </div>
                  <div className="text-right border-t mt-2 pt-2">
                    <p className="text-sm text-gray-500">{t('total_price')}:</p>
                    <p className="text-2xl font-bold text-blue-700">${(details.flight.price + details.hotel.pricePerNight * (1 - details.discountPercentage / 100)).toFixed(2)}</p>
                    <p className="text-sm font-semibold text-green-600">{t('you_save')} ${((details.flight.price + details.hotel.pricePerNight) * (details.discountPercentage / 100)).toFixed(2)}!</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <button onClick={() => setCurrentPage(Page.Home)} className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            {t('back_to_home')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;