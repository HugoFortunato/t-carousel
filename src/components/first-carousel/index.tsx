import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function FirstCarousel() {
  return (
    <div className="flex min-h-screen items-center relative justify-center ">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-sm"
      >
        <div className="items-center absolute top-[-30px] right-[45px] flex z-10">
          <CarouselPrevious className="rounded-full p-2 " />
          <CarouselNext className="rounded-full p-2" />
        </div>

        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
