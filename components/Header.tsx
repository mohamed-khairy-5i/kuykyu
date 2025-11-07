
import React from 'react';

const LanternIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5z"></path>
        <path d="M8 21h8"></path>
        <path d="M12 17v4"></path>
        <path d="M12 9a3 3 0 0 0-3 3v0a3 3 0 0 0 6 0v0a3 3 0 0 0-3-3z"></path>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center gap-3">
        <LanternIcon />
        <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400">
          أذكاري
        </h1>
      </div>
    </header>
  );
};

export default Header;
