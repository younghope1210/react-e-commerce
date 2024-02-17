// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import CardItem from './Sections/CardItem'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import Hero from './Sections/Hero'
import SearchInput from './Sections/SearchInput'
import axiosInstance from '../../utils/axios'

import { categorys, prices } from '../../utils/filterData'


const LandingPage = () => {

  const limit = 4; // 진열되는 상품이 보여지는 처음 디폴트값
  const [searchTerm, setSearchTerm] = useState(''); 
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  // const [OpenReply, setOpenReply] = useState(false)
  const [filters, setFilters] = useState({

    categorys: [],
    price: []

  });



  useEffect(() => {

    fetchProducts({ skip, limit });
  
  }, []) // 컴포넌트가 마운트된 다음 한번만 렌더링 될 수 있게 빈값으로 설정

const fetchProducts = async({skip, limit, loadMore = false, filters = {}, searchTerm = ""}) => {

  const params = {
    skip,
    limit,
    filters,
    searchTerm
  }
   try {

    const response = await axiosInstance.get(`/products`, { params });

// 상품이 4개이상 있을 경우 더보기 버튼을 눌렀을 때 가려져있던 상품을 더 보여준다
    if(loadMore) { // backend에서 보낸 loadMore 이 true일 경우
      setProducts([...products, ...response.data.products]); // 기존 상품과 보이지 않던 상품 나열
    } else {
      setProducts(response.data.products);
    }
    setHasMore(response.data.hasMore);


  } catch(error){

    console.error(error);
  }
}


// 상품 더보기 버튼 클릭시 

const handleLoadMore = () => {

  const body = {
    skip: skip + limit, // 티폴트로 보여지는 값 4 + 더보기 버튼 클릭시 뿌려지는 값
    limit,
    loadMore: true,
    filters,
    searchTerm
  }
  fetchProducts(body);
  setSkip(skip + limit); // 버튼이 클릭될 때마다 4,8,12 ... 보여지는 상품이 늘어나도록
}

// 나라별 카테고리 체크와 가격별로 검색하는 기능 

const handleFilters = (newFilteredData, checkCategory) => {

  const newFilters = {...filters}; // 불변성을 지키기 위해 spread로 얕은 복사
  newFilters[checkCategory] = newFilteredData;

  if(checkCategory === "price"){  // price 명을 가졌다면
    const priceValues = handlePrice(newFilteredData);
    newFilters[checkCategory] = priceValues;

  }

  showFilteredResults(newFilters);
  setFilters(newFilters);
}


const handlePrice = (value) => {

  let array = [];

  for(let key in prices){
    if(prices[key]._id === parseInt(value, 10)){ // value의 값이 숫자가 아니라면 숫자로 변경
      array = prices[key].array;
    }
  }

    return array;
}


const showFilteredResults = (filters) => {

  const body = {
    skip: 0,
    limit,
    filters,
    searchTerm
  }
  fetchProducts(body);
  setSkip(0);
}

// 검색창 처리

const handleSearchTerm = (event) => {

  const body = {
    skip: 0,
    limit,
    filters,
    searchTerm: event.target.value
  }
  setSkip(0);
  setSearchTerm(event.target.value);
  fetchProducts(body);

}


// function onHandleChange() {

//   setOpenReply(!OpenReply);

// }



  return (

  
    <section>
      <div>
        {/* 메인 슬라이드 배너 */}
        <Hero />   
      </div>
     
        
    <div className='w-10/12 max-w-5xl mx-auto mb-auto  md:text-xs lg:text-sm'>
      
      {/* Filter */}
      <div className='flex border-[1px] border-gray-200  text-gray-400 font-sans py-2 mt-5'>
      
        <div className='w-1/2 gap-3'>

            <CheckBox categorys={categorys} checkedCategorys={filters.categorys}
              onFilters={filters => handleFilters(filters, "categorys")}
          />
         
        </div>

        <div className='w-1/2'>
       
          <RadioBox prices={prices} checkedPrice={filters.price}
            onFilters={filters => handleFilters(filters, "price")}
          />
      
        </div>
      </div>


       {/* Search */}
       <div className='flex justify-end'>

       <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />

      </div>
      
       {/* Card */}
       <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 '>
        {products.map(product => (
            <CardItem product={product} key={product._id} />
        ))}
    
      </div>
      {/* LoadMore 상품 더보기 버튼 */}
       {hasMore &&
          <div className='flex justify-center mt-2'>
            <button
              className='px-2 py-2 mt- text-white bg-red-500 text-xs hover:bg-gray-500 rounded-lg transition duration-500 ease-in-out'
              onClick={handleLoadMore}
            >
              더보기 + 
            </button>
          </div>
       }   
      

      </div>
    </section>
  )
}

export default LandingPage