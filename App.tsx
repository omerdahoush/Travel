import React, { useState, useEffect } from 'react';
import { Page, Language, Booking } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import FlightsPage from './components/FlightsPage';
import HotelsPage from './components/HotelsPage';
import PackagesPage from './components/PackagesPage';
import ConfirmationPage from './components/ConfirmationPage';
import TripPlannerPage from './components/TripPlannerPage';
import { TRANSLATIONS } from './constants';
import { HotelIcon, PlaneIcon, PackageIcon, ArrowLeftIcon } from './components/Icons';

const BookingsPage: React.FC<{ bookings: Booking[], currentLanguage: Language, setCurrentPage: (page: Page) => void }> = ({ bookings, currentLanguage, setCurrentPage }) => {
    const t = (key: string) => TRANSLATIONS[key][currentLanguage];
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
            <div className="relative mb-8 text-center">
                 <button
                    onClick={() => setCurrentPage(Page.Home)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                    aria-label={t('back')}
                >
                    <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="ml-2 font-semibold">{t('back')}</span>
                </button>
                <h1 className="text-4xl font-bold text-gray-800 inline-block">{t('my_bookings')}</h1>
            </div>
            {bookings.length === 0 ? (
                <p className="text-gray-600">{t('no_bookings_yet')}</p>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                           {booking.type === 'Flight' && 'airline' in booking.details && (
                                <>
                                    <PlaneIcon className="w-8 h-8 text-blue-500 mt-1"/>
                                    <div>
                                        <p className="font-bold text-lg">Flight: {booking.details.airline}</p>
                                        <p className="text-gray-700">{booking.details.from} to {booking.details.to}</p>
                                        <p className="text-sm text-gray-500">Booked on: {booking.bookingDate}</p>
                                    </div>
                                </>
                           )}
                           {booking.type === 'Hotel' && 'hotelName' in booking.details && (
                                <>
                                    <HotelIcon className="w-8 h-8 text-purple-500 mt-1"/>
                                    <div>
                                        <p className="font-bold text-lg">Hotel: {booking.details.hotelName}</p>
                                        <p className="text-gray-700">{booking.details.city}</p>
                                        <p className="text-sm text-gray-500">Booked on: {booking.bookingDate}</p>
                                    </div>
                                </>
                           )}
                           {booking.type === 'Package' && 'flight' in booking.details && (
                                <>
                                    <PackageIcon className="w-8 h-8 text-green-500 mt-1"/>
                                    <div>
                                        <p className="font-bold text-lg">{t('package_deal')}: {booking.details.flight.to}</p>
                                        <p className="text-gray-700">Flight with {booking.details.flight.airline} &amp; stay at {booking.details.hotel.hotelName}</p>
                                        <p className="text-sm text-gray-500">Booked on: {booking.bookingDate}</p>
                                    </div>
                                </>
                           )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [language, setLanguage] = useState<Language>(Language.En);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.Ar ? 'rtl' : 'ltr';
  }, [language]);

  const handleSetBooking = (bookingData: Omit<Booking, 'bookingDate'>) => {
    const newBooking = { ...bookingData, bookingDate: new Date().toLocaleDateString() };
    setCurrentBooking(newBooking);
    setBookings(prev => [...prev, newBooking]);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} currentLanguage={language} />;
      case Page.Flights:
        return <FlightsPage setCurrentPage={setCurrentPage} setBookingDetails={handleSetBooking} currentLanguage={language} />;
      case Page.Hotels:
        return <HotelsPage setCurrentPage={setCurrentPage} setBookingDetails={handleSetBooking} currentLanguage={language} />;
      case Page.Packages:
        return <PackagesPage setCurrentPage={setCurrentPage} setBookingDetails={handleSetBooking} currentLanguage={language} />;
      case Page.TripPlanner:
        return <TripPlannerPage currentLanguage={language} setCurrentPage={setCurrentPage} />;
      case Page.Confirmation:
        return <ConfirmationPage bookingDetails={currentBooking} setCurrentPage={setCurrentPage} currentLanguage={language} />;
      case Page.Bookings:
        return <BookingsPage bookings={bookings} currentLanguage={language} setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} currentLanguage={language} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen bg-white font-sans ${language === Language.Ar ? 'font-[Tahoma]' : ''}`}>
      <Header setCurrentPage={setCurrentPage} currentLanguage={language} setLanguage={setLanguage} />
      <div className="flex-grow pt-20">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}

export default App;