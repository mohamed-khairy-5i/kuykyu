
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} - موقع أذكاري. كل الحقوق محفوظة.</p>
        <p>صنع بحب 💚</p>
      </div>
    </footer>
  );
};

export default Footer;
