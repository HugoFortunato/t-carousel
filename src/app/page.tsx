'use client';

import SecondCarousel from '@/components/second-carousel';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [maxDots, setMaxDots] = useState(0);
  const [maxDotsIndex, setMaxDotsIndex] = useState(-1);
  const [activeCarousels, setActiveCarousels] = useState<{
    [key: number]: number;
  }>({});

  const handleSetMaxDots = (dots: number, index: number) => {
    setMaxDots((prevMaxDots) => {
      if (dots > prevMaxDots) {
        setMaxDotsIndex(index);

        return dots;
      }
      return prevMaxDots;
    });
  };

  const handleCarouselUpdate = (index: number, currentIndex: number) => {
    setActiveCarousels((prev) => ({
      ...prev,
      [index]: currentIndex,
    }));
  };

  useEffect(() => {
    if (maxDotsIndex !== -1 && activeCarousels[maxDotsIndex] === maxDots - 1) {
      console.log('Último DOT do maior carrossel');
    }
  }, [activeCarousels, maxDots, maxDotsIndex]);

  return (
    <>
      <div className="flex items-center justify-center gap-5">
        <SecondCarousel
          index={0}
          setMaxDots={handleSetMaxDots}
          handleCarouselUpdate={handleCarouselUpdate}
        >
          {[...Array(56)].map((_, childIndex) => (
            <div key={childIndex}>Hello</div>
          ))}
        </SecondCarousel>

        <SecondCarousel
          index={1}
          setMaxDots={handleSetMaxDots}
          handleCarouselUpdate={handleCarouselUpdate}
        >
          {[...Array(10)].map((_, childIndex) => (
            <div key={childIndex}>Hello</div>
          ))}
        </SecondCarousel>

        <SecondCarousel
          index={2}
          setMaxDots={handleSetMaxDots}
          handleCarouselUpdate={handleCarouselUpdate}
        >
          {[...Array(5)].map((_, childIndex) => (
            <div key={childIndex}>Hello</div>
          ))}
        </SecondCarousel>

        <SecondCarousel
          index={3}
          setMaxDots={handleSetMaxDots}
          handleCarouselUpdate={handleCarouselUpdate}
        >
          {[...Array(5)].map((_, childIndex) => (
            <div key={childIndex}>Hello</div>
          ))}
        </SecondCarousel>
      </div>
    </>
  );
}
