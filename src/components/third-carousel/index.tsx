import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export type CarouselTypes = {
  position: 'first' | 'last';
  carouselPosition: (position: string) => void;
  backgroundColor?: string;
  children: React.ReactNode;
};

function chunkArray(array: any, size: any) {
  console.log(array.length, 'lenght');
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

export default function SecondCarousel({
  position,
  carouselPosition,
  backgroundColor = 'white',
  children,
}: CarouselTypes) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerCard = 6;

  const groupedChildren = chunkArray(
    React.Children.toArray(children),
    itemsPerCard
  );

  console.log(groupedChildren, 'groupedChildren');

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedChildren.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [groupedChildren.length]);

  useEffect(() => {
    if (groupedChildren.length === currentIndex + 1) {
      if (position === 'last') {
        carouselPosition('last');
      }
    }

    if (groupedChildren.length !== currentIndex + 1) {
      carouselPosition('first');
    }
  }, [currentIndex, groupedChildren.length, position, carouselPosition]);

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col h-[600px] items-center justify-center border border-[#DFE7EF] rounded-xl"
        style={{ backgroundColor }}
      >
        <div className="embla w-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {groupedChildren.map((group, index) => (
              <div className="embla__slide min-w-full" key={index}>
                <div className="h-[700px] flex items-center justify-center">
                  <div className="flex flex-col aspect-square items-center justify-center p-6">
                    {group}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        {groupedChildren.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-black' : 'bg-gray-300'}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
