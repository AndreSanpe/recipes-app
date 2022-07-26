/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

/* Install pure-react-carousel using -> npm i pure-react-carousel */
// FONTE: https://tailwinduikit.com/components/E-commerce/Components/carousels

export default function Index({ recomend }) {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center w-full h-full sm:py-8 px-4 pb-4">
        {/* Carousel for mobile and Small size Devices */}
        <CarouselProvider className="block md:hidden" naturalSlideWidth={ 100 } isIntrinsicHeight totalSlides={ 6 } visibleSlides={ 1 } step={ 1 } infinite>
          <div className="w-full relative flex items-center justify-center px-3">
            <ButtonBack role="button" aria-label="slide backward" className="z-1 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
              <svg width={ 8 } height={ 14 } viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="black" strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div id="slider" className="h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                  {/* map */}
                  {
                    recomend.map((el, index) => (
                      <Slide index={ 0 } key={ index }>
                        <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                          <img
                            src={ el.strMealThumb }
                            alt={ el.strMeal }
                            className="object-cover object-center w-full rounded-md"
                          />
                        </div>
                      </Slide>
                    ))

                  }
                </div>
              </Slider>
            </div>
            <ButtonNext role="button" aria-label="slide forward" className="z-0 absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
              <svg width={ 8 } height={ 14 } viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="black" strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
}
