// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../store/thunkFunctions';
import LikeDislikes from './LikeDislikes';
import Subscriber from './Subscriber';
const ProductInfo = ({ product }) => {

    const dispatch = useDispatch();
    const handleClick = () => {

        dispatch(addToCart({ productId: product._id }))

    }


    return (
        <div className=' text-gray-600'>
            <p className='text-x text-bold pb-2 text-gray-500 flex justify-start'>
                {/* 관심구독 버튼 */}
                 <Subscriber />
                 {/* 좋아요 싫어요 버튼 */}
                    <span className='ml-auto'>
                        <LikeDislikes 
                            className='mx-auto my-0'
                            product={product}
                        />
                        
                    </span>
            </p>

            <ul className='border rounded-md p-4 '>
                <li><span className='font-semibold text-sm'>가격 :</span> {product.price} 원</li>
                <li className='pb-2 text-sm'><span className='font-semibold'>팔린 개수 :</span> {product.sold} 개</li>
                <li className=' py-3 border-t text-sm'><span className='font-semibold '>설명 :</span> {product.description}</li>
          
            </ul>



            <div className='flex justify-center mt-5'>
                <button
                    onClick={handleClick}
                    className=' px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700 transition duration-500 ease-in-out'>
                    장바구니에 담기
                </button>
            </div>


        </div>
    )
}

export default ProductInfo