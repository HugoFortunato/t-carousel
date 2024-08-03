import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Children, useEffect, useState } from 'react';

export type CarouselTypes = {
  index: number;
  backgroundColor?: string;
  children: React.ReactNode;

  setMaxDots: (dots: number, index: number) => void;
  handleCarouselUpdate: (index: number, currentIndex: number) => void;
};
function chunkArray(array: any, size: any) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

export default function SecondCarousel({
  children,
  setMaxDots,
  index,
  handleCarouselUpdate,
}: CarouselTypes) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerCard = 6;
  const groupedChildren = chunkArray(Children.toArray(children), itemsPerCard);

  useEffect(() => {
    if (api) {
      api.on('select', () => {
        const newIndex = api.selectedScrollSnap();
        setCurrentIndex(newIndex);
        handleCarouselUpdate(index, newIndex);
      });
    }
  }, [api, handleCarouselUpdate, index]);

  useEffect(() => {
    setMaxDots(groupedChildren.length, index);
  }, [groupedChildren.length, setMaxDots, index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedChildren.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [groupedChildren.length]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent>
          {groupedChildren.map((group, dotIndex) => (
            <CarouselItem key={dotIndex}>
              <Card className={'h-[700px] flex items-center justify-center'}>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  {group}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-2">
        {groupedChildren.map((_, dotIndex) => (
          <button
            key={dotIndex}
            className={`w-2 h-2 mx-1 rounded-full ${currentIndex === dotIndex ? 'bg-black' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
