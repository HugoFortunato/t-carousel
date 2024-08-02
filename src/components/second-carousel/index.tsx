import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

export type CarouselTypes = {
  position: 'first' | 'last';
  carouselPosition: (position: string) => void;
  backgroundColor?: string;
  children: React.ReactNode;
};

function chunkArray(array: any, size: any) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

export default function SecondCarousel({
  position,
  carouselPosition,
  backgroundColor,
  children,
}: CarouselTypes) {
  console.log(backgroundColor, 'backgroundColor');
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const itemsPerCard = 6;

  const groupedChildren = chunkArray(
    React.Children.toArray(children),
    itemsPerCard
  );

  const handleClickDot = (index: number) => {
    setCurrentIndex(index);
    if (api) {
      api.scrollTo(index);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedChildren.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [groupedChildren.length]);

  React.useEffect(() => {
    const arrLength = api?.scrollSnapList().length;

    if (groupedChildren.length === currentIndex + 1) {
      if (position === 'last') {
        carouselPosition('last');
      }
    }

    if (groupedChildren.length !== currentIndex + 1) {
      carouselPosition('first');
    }
  }, [
    api,
    currentIndex,
    groupedChildren.length,
    current,
    position,
    carouselPosition,
  ]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs"
        plugins={[Autoplay({ delay: 6000 })]}
      >
        <CarouselContent>
          {groupedChildren.map((group, index) => (
            <CarouselItem key={index}>
              <Card
                className={`h-[700px] flex items-center justify-center bg-${backgroundColor}`}
                style={{
                  backgroundColor: backgroundColor,
                }}
              >
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  {group}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-2">
        {groupedChildren.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-black' : 'bg-gray-300'}`}
            onClick={() => handleClickDot(index)}
          />
        ))}
      </div>
    </div>
  );
}
