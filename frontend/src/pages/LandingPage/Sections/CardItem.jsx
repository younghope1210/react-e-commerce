// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';


const CardItem = ({ product }) => {
  return (
    <div
      className='rounded overflow-hidden relative shadow-lg flex flex-col gap-4 pb-6'
    >
       <div
          className="z-10 text-xs absolute top-0 left-0 bg-red-500 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
          new
      </div>
      <ImageSlider  
        images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p className='p-2 h-8'>{product.title}</p>
        <p className='p-2 h-8 text-xs text-red-500 '>{product.price}원</p>
       
        
      </Link>

    </div>
  )
}

export default CardItem