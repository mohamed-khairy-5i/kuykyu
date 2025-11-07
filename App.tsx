
import React, { useState } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import AzkarList from './components/AzkarList';
import Footer from './components/Footer';
import { azkarData } from './data/azkarData';
import type { AzkarCategory } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AzkarCategory>(azkarData[0]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-slate-200 flex flex-col transition-colors duration-500">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <CategorySelector
          categories={azkarData}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="mt-6">
          <AzkarList key={selectedCategory.title} category={selectedCategory} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
