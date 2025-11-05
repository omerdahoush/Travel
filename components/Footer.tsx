import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} TravelMate. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
