// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import axios from "axios";
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Comment from './Sections/Comment';




const DetailProductPage = () => {


// App.js 의 라우트 <Route path="/product/:productId"/> 에서 id값 가져온다
  const { productId } =  useParams();

  const [product, setProduct] = useState(null);
  const [Comments, setComments] = useState([])

  // 상품 가져오기  
    const getHandler = () => {
      return axiosInstance.get(`/products/${productId}?type=single`).then((res) => setProduct(res.data[0]))
    }
  
    const postHandler = () => {

              // 코멘트에 대한 body
              const variableComment = {

                productId: productId
            }
    
 // 코멘트 가져오기 
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
 
// 불러들일 상품이 없을 경우 null 처리  
if(!product) return null;

  return (
    <section className='w-10/12 max-w-5xl mx-auto mb-auto'>
      <div className=''>
        <h2 className='py-8 text-2xl text-center'>
           {product.title}
           </h2>
     
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