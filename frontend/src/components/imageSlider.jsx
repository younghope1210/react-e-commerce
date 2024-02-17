// eslint-disable-next-line no-unused-vars
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// npm install react-image-gallery react-responsive-carousel 설치
const ImageSlider = ({ images }) => {
    return (
        <Carousel autoPlay showThumbs={false} infiniteLoop>
            {images.map(image => (
                <div key={image}>
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                        alt={image}
                        className='w-full max-h-[150px] object-cover'
                    />
                </div>
            ))}

        </Carousel>
    )
}

export default ImageSlider