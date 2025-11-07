
import React, { useState, useCallback } from 'react';
import type { Zikr } from '../types';
import { getZikrReflection } from '../services/geminiService';

interface AzkarCardProps {
  zikr: Zikr;
  onComplete: () => void;
}

const ReflectionIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);


const AzkarCard: React.FC<AzkarCardProps> = ({ zikr, onComplete }) => {
  const [count, setCount] = useState(zikr.repetitions);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCounterClick = () => {
    if (isCompleted) return;

    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(0);
      setIsCompleted(true);
      onComplete();
    }
  };

  const handleGetReflection = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setReflection(null);
    try {
      const result = await getZikrReflection(zikr.arabic_text);
      setReflection(result);
    } catch (e) {
      setError("فشل في جلب التأمل.");
    } finally {
      setIsLoading(false);
    }
  }, [zikr.arabic_text]);


  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 transition-all duration-500 ease-in-out transform hover:shadow-xl ${
        isCompleted ? 'opacity-50 scale-95' : 'hover:scale-102'
      }`}
    >
      <p className="text-xl md:text-2xl leading-relaxed text-right font-semibold text-slate-800 dark:text-slate-100 mb-4" lang="ar">
        {zikr.arabic_text}
      </p>
      <div className="border-t border-slate-200 dark:border-gray-700 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400 dark:text-slate-500">{zikr.source}</p>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleGetReflection}
            disabled={isLoading}
            className="flex-shrink-0 flex items-center justify-center px-3 py-2 text-sm font-medium text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-gray-700 rounded-full hover:bg-teal-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
             <ReflectionIcon />
             <span>{isLoading ? 'جارِ التحميل...' : 'تأمل'}</span>
          </button>
          {zikr.repetitions > 1 && (
            <button
                onClick={handleCounterClick}
                disabled={isCompleted}
                className="w-full sm:w-auto flex items-center justify-center h-12 px-6 font-bold text-lg bg-teal-500 text-white rounded-full transition-all duration-300 ease-in-out hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              <span>{count}</span>
            </button>
          )}
           {zikr.repetitions === 1 && (
            <button
                onClick={handleCounterClick}
                disabled={isCompleted}
                className="w-full sm:w-auto flex items-center justify-center h-12 px-6 font-bold text-base bg-teal-500 text-white rounded-full transition-all duration-300 ease-in-out hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              <span>{isCompleted ? 'تم' : 'قراءة'}</span>
            </button>
          )}
        </div>
      </div>
      {(isLoading || error || reflection) && (
         <div className="mt-4 p-4 bg-slate-50 dark:bg-gray-700/50 rounded-lg border border-slate-200 dark:border-gray-700">
             {isLoading && <p className="text-center text-slate-600 dark:text-slate-300">...يولد الذكاء الاصطناعي تأملاً</p>}
             {error && <p className="text-red-500">{error}</p>}
             {reflection && <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{reflection}</p>}
         </div>
      )}
    </div>
  );
};

export default AzkarCard;
