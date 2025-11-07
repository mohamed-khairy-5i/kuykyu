
import React, { useState, useCallback } from 'react';
import type { AzkarCategory } from '../types';
import AzkarCard from './AzkarCard';
import ProgressBar from './ProgressBar';

interface AzkarListProps {
  category: AzkarCategory;
}

const AzkarList: React.FC<AzkarListProps> = ({ category }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const totalAzkar = category.data.length;

  const handleComplete = useCallback(() => {
    setCompletedCount((prevCount) => prevCount + 1);
  }, []);

  const progress = totalAzkar > 0 ? (completedCount / totalAzkar) * 100 : 0;

  return (
    <div className="space-y-4">
      <ProgressBar progress={progress} />
      {category.data.map((zikr) => (
        <AzkarCard key={zikr.id} zikr={zikr} onComplete={handleComplete} />
      ))}
    </div>
  );
};

export default AzkarList;
