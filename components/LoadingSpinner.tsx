import React, { useState, useEffect } from 'react';
import { CompassIcon } from './icons';

const loadingMessages = [
  'جاري رسم خريطة الأسئلة...',
  'يتم إيقاظ قرود الأدغال...',
  'لحظات وتبدأ المغامرة!',
  'يتم تلميع الكنز المفقود...',
  'هل تعلم أن الحرباء يمكنها تحريك عينيها في اتجاهين مختلفين؟',
];

const LoadingSpinner: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-white text-center" style={{minHeight: '400px'}}>
      <div className="relative w-24 h-24">
        <CompassIcon className="w-full h-full text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
      </div>
      <h2 className="text-3xl font-bold tracking-wider text-amber-100">جاري التحضير...</h2>
      <p className="text-lg transition-opacity duration-500 h-6 text-amber-200">{message}</p>
    </div>
  );
};

export default LoadingSpinner;