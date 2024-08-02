'use client';

import SecondCarousel from '@/components/second-carousel';
import ThirdCarousel from '@/components/third-carousel';
import React from 'react';

export default function Home() {
  const [backgroundColor, setBackgroundColor] = React.useState<string>('');
  const carouselPosition = (position: string) => {
    if (position === 'first') {
      setBackgroundColor('#FFF');
    } else if (position === 'last') {
      setBackgroundColor('#05154F');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-5">
        <SecondCarousel position="first" carouselPosition={carouselPosition}>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>

          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>

          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>

          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </SecondCarousel>

        <SecondCarousel position="first" carouselPosition={carouselPosition}>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </SecondCarousel>

        <SecondCarousel
          position="last"
          carouselPosition={carouselPosition}
          backgroundColor={backgroundColor}
        >
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </SecondCarousel>
      </div>
    </>
  );
}
