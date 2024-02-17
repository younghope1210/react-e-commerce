// eslint-disable-next-line no-unused-vars
import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../../components/FileUpload'



// 카테고리 옵션

const categorys = [

  { key: 1, value: "france" },
  { key: 2, value: "germany" },
  { key: 3, value: "italy" },
  { key: 4, value: "america" },
  { key: 5, value: "korea" },
  { key: 6, value: "spain" },
  { key: 7, value: "united kingdom" }

]



const UploadProductPage = () => {

const [product, setProduct] = useState({

  title:'',
  description: '',
  price: 0,
  categorys: 1,
  images: []

})
// name, value 값이 새롭게 발생할 때 

const handleChange = (e) => {

  const { name, value } = e.target;
  setProduct((prevState) => ({

      ...prevState,
      [name]:value

  }))

} 


// 상품 이미지 업로드

const handleImages = (newImages) => {
  setProduct((prevState) => ({
    ...prevState,
    images: newImages
  }))
}



// 로그인한 후 상품페이지를 업로드하는 유저 정보 리덕스 스토어에서 가져오기 

const userData = useSelector(state => state.user?.userData);
const navigate = useNavigate();

// 상품 업로드 버튼 클릭시 상세정보 서버에 전달

const handleSubmit = async (event) => {
  event.preventDefault();

  // const { title, description,price, images, categorys } = product;

  const body = {
    writer: userData.id,
    ...product
  }

  try {
    await axiosInstance.post('/products', body);
    navigate('/'); // 메인페이지로 이동
  } catch (error) {
    console.error(error);
  }

}


  return (
    <section className='w-10/12 max-w-4xl mx-auto mb-auto'>
      <div>
        <h1 
          className='text-3xl text-center mt-5'
        > 
          상품 업로드 
        </h1>
      </div>
      {/* 상품 업로드 양식 */}
      <form 
        className='mt-6'
        onSubmit={handleSubmit}
      >

      {/* 상품 이미지 업로드 */}
      <FileUpload images={product.images} onImageChange={handleImages} />

       <div className='mt-4'>
          <lable htmlFor='title'>상품명</lable>
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="title"
            id="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>

        <div className='mt-4'>
          <lable htmlFor='description'>상품 설명</lable>
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <div className='mt-4'>
          <lable htmlFor='price'>가격</lable>
          <input 
            type="number"
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className='mt-4'>
          <lable htmlFor='category'>카테고리</lable>
          <select
            className='w-full px-4 mt-2 h-10 bg-white border rounded-md'
            name="categorys"
            id="categorys"
            value={product.categorys}
            onChange={handleChange}
          >
            {categorys.map(item => (
              <option
                key={item.key} 
                value={item.key}>
                {item.value}
              </option>
            ))}
            
          </select>          
        </div>

        <div
          className='flex justify-center mt-5'
        >
          <button
            className='px-6 py-3 mt-5 text-white bg-black rounded-md hover:bg-gray-500'
            type='submit'
          >
            상품 업로드 
          </button>
        </div>

      </form>

    </section>
  )
}

export default UploadProductPage