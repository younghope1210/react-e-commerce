// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import axios from "axios";
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Comment from './Sections/Comment';

// import { useSelector } from 'react-redux';

const DetailProductPage = () => {

 // 리덕스 안의 state에서 user 정보 가져옴
  // const userData = useSelector(state => state.user?.userData);
  const { productId } =  useParams();

  const [product, setProduct] = useState(null);
  const [Comments, setComments] = useState([])


    const getHandler = () => {
      return axiosInstance.get(`/products/${productId}?type=single`).then((res) => setProduct(res.data[0]))
    }
  
    const postHandler = () => {

              // 코멘트에 대한 body
              const variableComment = {
                commentId: productId 
            }
    

      return axiosInstance.post('/comments/getComment', variableComment ).then((res) => setComments(res.data.reviews))
    }
  
    useEffect(() => {
      axios.all([getHandler(), postHandler()]).then(
        axios.spread((a, b) => {
          console.log(a, b)
        }),
      )
    }, [])
  
 

  
     // comment.js에서 보내는 값 받기

     const refreshFunction = (newComment) => {

      setComments(Comments.concat(newComment))

  }
  
if(!product) return null;

  return (
    <section>
      <div className='text-center'>
        <h1 className='py-8 text-2xl'>{product.title}</h1>
           
      </div>

      <div className='flex gap-4'>
        <div className='w-1/2'>
          {/* ProductImage */}
          <ProductImage product={product} />
          
        </div>
        <div className='w-1/2'>
          {/* ProductInfo */}
          <ProductInfo product={product} />
          
        </div>
      </div>

 {/* 리뷰 코멘트 부분 */}

    <div className='py-8 text-2xl'>
      <Comment product={product} refreshFunction={refreshFunction} commentLists={Comments} commentId={productId} />
    </div>

    </section>
  )
}

export default DetailProductPage