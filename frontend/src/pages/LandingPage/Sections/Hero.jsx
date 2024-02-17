// eslint-disable-next-line no-unused-vars
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Hero = () => {
  return (
    <div
    className='w-full mx-auto mb-auto'
    >

     <Carousel autoPlay showThumbs={false} infiniteLoop>
                  <div>
                  <img
                        src='https://res.cloudinary.com/seoyoung/image/upload/v1706524077/banner_d36geq.jpg'
                        alt='visual'
                        className='w-full object-cover'
                    />
                  </div>

                  <div>
                  <img
                        src='https://res.cloudinary.com/seoyoung/image/upload/v1706523662/banner3_vucrxl.jpg'
                        alt='visual'
                        className='w-full object-cover'
                    />
                  </div>

                   <div>
                  <img
                        src='https://res.cloudinary.com/seoyoung/image/upload/v1706522653/banner2_z2vwau.jpg'
                        alt='visual'
                        className='w-full object-cover'
                    />
                  </div>
                    
        </Carousel>
      </div>
  )
}

export default Hero