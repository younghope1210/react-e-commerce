// eslint-disable-next-line no-unused-vars
import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const Hero = () => {

  const slides = [
    { title: 'First item', description: 'Lorem ipsum'},
    { title: 'Second item', description: 'Lorem ipsum'}
  ];

  return (
    <div className='w-full'>
      <Slider>
        {slides.map((slide, index) => <div key={index}>
          <h2>{slide.title}</h2>
          <div>{slide.description}</div>
        </div>)}
      </Slider>
    </div>
  )
}

export default Hero