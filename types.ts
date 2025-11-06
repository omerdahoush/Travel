export enum Page {
  Home = 'HOME',
  Flights = 'FLIGHTS',
  Hotels = 'HOTELS',
  Packages = 'PACKAGES',
  TripPlanner = 'TRIP_PLANNER',
  Confirmation = 'CONFIRMATION',
  Bookings = 'BOOKINGS',
}

export enum Language {
  En = 'en',
  Ar = 'ar',
}

export interface Flight {
  id: number;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  airline: string;
  price: number;
  seatsAvailable: number;
  airlineLogo: string;
}

export interface Hotel {
  id: number;
  hotelName: string;
  city: string;
  roomType: string;
  pricePerNight: number;
  rating: number;
  availableRooms: number;
  image: string;
}

export interface PackageDeal {
  id: number;
  flight: Flight;
  hotel: Hotel;
  discountPercentage: number;
}

export type Booking = {
  type: 'Flight' | 'Hotel' | 'Package';
  details: Flight | Hotel | PackageDeal;
  bookingDate: string;
};

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}