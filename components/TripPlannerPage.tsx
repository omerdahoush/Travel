import React, { useState } from 'react';
import { Language, Page } from '../types';
import { TRANSLATIONS } from '../constants';
import { generateItinerary } from '../services/geminiService';
import { MapPinIcon, ArrowLeftIcon } from './Icons';

const TripPlannerPage: React.FC<{ currentLanguage: Language; setCurrentPage: (page: Page) => void; }> = ({ currentLanguage, setCurrentPage }) => {
  const t = (key: string) => TRANSLATIONS[key][currentLanguage];
  const [prompt, setPrompt] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setItinerary('');
    setError('');
    try {
        const result = await generateItinerary(prompt);
        if (result.startsWith('Failed to generate')) {
            setError(result);
        } else {
            setItinerary(result);
        }
    } catch (e) {
        setError('An unexpected error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const examplePrompts = [
      "A 7-day family-friendly trip to Orlando theme parks",
      "A 10-day romantic getaway to Paris for a foodie couple",
      "A 3-week solo backpacking adventure through Southeast Asia",
      "A historical tour of ancient Greece for 2 weeks",
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-8">
            <button 
                onClick={() => setCurrentPage(Page.Home)} 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                aria-label={t('back')}
            >
                <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="ml-2 font-semibold">{t('back')}</span>
            </button>
        </div>
        <div className="max-w-3xl mx-auto text-center">
            <MapPinIcon className="w-16 h-16 mx-auto text-blue-600"/>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4">{t('trip_planner_title')}</h1>
            <p className="mt-4 text-lg text-gray-600">
                Describe your dream vacation, and let our AI craft a personalized itinerary just for you.
            </p>
        </div>

        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col gap-4">
                <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A 5-day adventurous trip to Costa Rica including volcano hiking and zip-lining."
                    className="flex-grow p-4 border border-gray-300 rounded-md shadow-sm w-full text-lg focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-md hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('generating')}
                        </>
                    ) : (
                       t('generate_itinerary')
                    )}
                </button>
            </div>
             <div className="mt-6">
                <p className="text-sm text-gray-600">Need inspiration? Try one of these:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {examplePrompts.map((p, i) => (
                        <button key={i} onClick={() => setPrompt(p)} disabled={isLoading} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors disabled:opacity-50">
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {(isLoading || itinerary || error) && (
             <div className="max-w-3xl mx-auto mt-10">
                {isLoading && !itinerary && (
                     <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                        <p className="text-lg text-blue-600">Our AI is crafting your perfect journey...</p>
                    </div>
                )}
                {error && (
                     <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
                        <span className="font-medium">Error!</span> {error}
                    </div>
                )}
                {itinerary && (
                    <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg prose max-w-none">
                        <h2 className="text-2xl font-bold mb-4">Your Custom Itinerary</h2>
                        <pre className="whitespace-pre-wrap font-sans bg-gray-50 p-4 rounded-md">{itinerary}</pre>
                    </div>
                )}
             </div>
        )}

      </div>
    </div>
  );
};

export default TripPlannerPage;