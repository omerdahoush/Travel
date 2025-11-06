import { Flight, Hotel, Language, Translations, PackageDeal } from './types';

export const FLIGHTS_DATA: Flight[] = [
  { id: 1, from: 'New York', to: 'London', departureDate: '2024-09-10', airline: 'British Airways', price: 750, seatsAvailable: 15, airlineLogo: 'https://picsum.photos/seed/ba/40/40' },
  { id: 2, from: 'Los Angeles', to: 'Tokyo', departureDate: '2024-09-12', airline: 'Japan Airlines', price: 1100, seatsAvailable: 8, airlineLogo: 'https://picsum.photos/seed/jal/40/40' },
  { id: 3, from: 'Dubai', to: 'Paris', departureDate: '2024-09-15', airline: 'Emirates', price: 600, seatsAvailable: 20, airlineLogo: 'https://picsum.photos/seed/ek/40/40' },
  { id: 4, from: 'New York', to: 'Paris', departureDate: '2024-09-18', airline: 'Air France', price: 820, seatsAvailable: 5, airlineLogo: 'https://picsum.photos/seed/af/40/40' },
  { id: 5, from: 'Sydney', to: 'Los Angeles', departureDate: '2024-10-01', airline: 'Qantas', price: 1300, seatsAvailable: 12, airlineLogo: 'https://picsum.photos/seed/qf/40/40' },
  { id: 6, from: 'New York', to: 'London', departureDate: '2024-09-25', airline: 'Virgin Atlantic', price: 780, seatsAvailable: 10, airlineLogo: 'https://picsum.photos/seed/vs/40/40' },
];

export const HOTELS_DATA: Hotel[] = [
  { id: 1, hotelName: 'The Plaza', city: 'New York', roomType: 'Deluxe Queen', pricePerNight: 550, rating: 5, availableRooms: 10, image: 'https://picsum.photos/seed/plaza/400/300' },
  { id: 2, hotelName: 'The Ritz', city: 'London', roomType: 'Superior King', pricePerNight: 620, rating: 5, availableRooms: 5, image: 'https://picsum.photos/seed/ritz/400/300' },
  { id: 3, hotelName: 'Park Hyatt', city: 'Tokyo', roomType: 'Park Deluxe King', pricePerNight: 700, rating: 5, availableRooms: 8, image: 'https://picsum.photos/seed/hyatt/400/300' },
  { id: 4, hotelName: 'Le Bristol', city: 'Paris', roomType: 'Junior Suite', pricePerNight: 850, rating: 5, availableRooms: 3, image: 'https://picsum.photos/seed/bristol/400/300' },
  { id: 5, hotelName: 'Burj Al Arab', city: 'Dubai', roomType: 'Deluxe Marina Suite', pricePerNight: 1500, rating: 5, availableRooms: 12, image: 'https://picsum.photos/seed/burj/400/300' },
  { id: 6, hotelName: 'Four Seasons', city: 'Sydney', roomType: 'Deluxe Full Harbour', pricePerNight: 450, rating: 4, availableRooms: 15, image: 'https://picsum.photos/seed/fourseasons/400/300' },
];

export const PACKAGES_DATA: PackageDeal[] = [
  {
    id: 1,
    flight: FLIGHTS_DATA[0], // NY to London
    hotel: HOTELS_DATA[1], // The Ritz, London
    discountPercentage: 15,
  },
  {
    id: 2,
    flight: FLIGHTS_DATA[2], // Dubai to Paris
    hotel: HOTELS_DATA[3], // Le Bristol, Paris
    discountPercentage: 10,
  },
  {
    id: 3,
    flight: FLIGHTS_DATA[1], // LA to Tokyo
    hotel: HOTELS_DATA[2], // Park Hyatt, Tokyo
    discountPercentage: 20,
  },
];


export const POPULAR_DESTINATIONS = [
  { city: 'Paris', image: 'https://picsum.photos/seed/paris_dest/400/300' },
  { city: 'Tokyo', image: 'https://picsum.photos/seed/tokyo_dest/400/300' },
  { city: 'New York', image: 'https://picsum.photos/seed/ny_dest/400/300' },
  { city: 'Rome', image: 'https://picsum.photos/seed/rome_dest/400/300' },
];

export const SPECIAL_OFFERS = [
  { title: 'Hawaiian Paradise', discount: '30% Off', image: 'https://picsum.photos/seed/hawaii_offer/400/300' },
  { title: 'European Wonders', discount: 'Fly for $499', image: 'https://picsum.photos/seed/europe_offer/400/300' },
];


export const TRANSLATIONS: Translations = {
  travelmate: { en: 'TravelMate', ar: 'رفيق السفر' },
  flights: { en: 'Flights', ar: 'رحلات طيران' },
  hotels: { en: 'Hotels', ar: 'فنادق' },
  packages: { en: 'Packages', ar: 'الباقات' },
  my_bookings: { en: 'My Bookings', ar: 'حجوزاتي' },
  search_flights_and_hotels: { en: 'Search Flights & Hotels', ar: 'ابحث عن رحلات طيران وفنادق' },
  from: { en: 'From', ar: 'من' },
  to: { en: 'To', ar: 'إلى' },
  destination: { en: 'Destination', ar: 'الوجهة' },
  departure: { en: 'Departure', ar: 'المغادرة' },
  return: { en: 'Return', ar: 'العودة' },
  search: { en: 'Search', ar: 'بحث' },
  city_hotel_name: { en: 'City or hotel name', ar: 'المدينة أو اسم الفندق' },
  check_in: { en: 'Check-in', ar: 'تسجيل الدخول' },
  check_out: { en: 'Check-out', ar: 'تسجيل الخروج' },
  guests: { en: 'Guests', ar: 'النزلاء' },
  popular_destinations: { en: 'Popular Destinations', ar: 'وجهات شائعة' },
  special_offers: { en: 'Special Offers', ar: 'عروض خاصة' },
  trip_planner: { en: 'Trip Planner', ar: 'مخطط الرحلات' },
  trip_planner_title: { en: 'AI-Powered Trip Planner', ar: 'مخطط رحلات مدعوم بالذكاء الاصطناعي' },
  trip_planner_prompt: { en: 'e.g., A 5-day adventurous trip to Costa Rica', ar: 'مثال: رحلة مغامرات لمدة 5 أيام إلى كوستاريكا' },
  generate_itinerary: { en: 'Generate Itinerary', ar: 'إنشاء خط سير الرحلة' },
  generating: { en: 'Generating...', ar: 'جاري الإنشاء...' },
  filter_by: { en: 'Filter by:', ar: 'تصفية حسب:' },
  price_range: { en: 'Price Range', ar: 'نطاق السعر' },
  airlines: { en: 'Airlines', ar: 'شركات الطيران' },
  book_now: { en: 'Book Now', ar: 'احجز الآن' },
  book_package: { en: 'Book Package', ar: 'احجز الباقة' },
  rating: { en: 'Rating', ar: 'التقييم' },
  all: { en: 'All', ar: 'الكل' },
  stars_and_up: { en: 'stars and up', ar: 'نجوم فأكثر' },
  booking_confirmation: { en: 'Booking Confirmation', ar: 'تأكيد الحجز' },
  thank_you: { en: 'Thank you for booking with TravelMate!', ar: 'شكرًا لحجزك مع رفيق السفر!' },
  booking_summary: { en: 'Booking Summary', ar: 'ملخص الحجز' },
  booking_date: { en: 'Booking Date:', ar: 'تاريخ الحجز:' },
  back_to_home: { en: 'Back to Home', ar: 'العودة إلى الصفحة الرئيسية' },
  no_bookings_yet: { en: 'You have no bookings yet.', ar: 'ليس لديك حجوزات حتى الآن.' },
  package_deal: { en: 'Package Deal', ar: 'عرض الباقة' },
  total_price: { en: 'Total Price', ar: 'السعر الإجمالي' },
  you_save: { en: 'You Save', ar: 'أنت توفر' },
};