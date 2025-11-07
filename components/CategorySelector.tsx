
import React from 'react';
import type { AzkarCategory } from '../types';

interface CategorySelectorProps {
  categories: AzkarCategory[];
  selectedCategory: AzkarCategory;
  onSelectCategory: (category: AzkarCategory) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex justify-center items-center bg-slate-200/50 dark:bg-gray-800/50 rounded-full p-1.5 shadow-inner gap-2">
      {categories.map((category) => (
        <button
          key={category.title}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-gray-900 focus:ring-teal-500 ${
            selectedCategory.title === category.title
              ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-gray-700/60'
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
