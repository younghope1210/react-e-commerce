// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import Hero from './Sections/Hero'
import CardItem from './Sections/CardItem'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchInput from './Sections/SearchInput'
import axiosInstance from '../../utils/axios'

import { categorys, prices } from '../../utils/filterData'


const LandingPage = () => {

  const limit = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({

    categorys: [],
    price: []

  });



  useEffect(() => {
    fetchProducts({ skip, limit });
  }, [])

const fetchProducts = async({skip, limit, loadMore = false, filters = {}, searchTerm = ""}) => {

  const params = {
    skip,
    limit,
    filters,
    searchTerm
  }
   try {

    const response = await axiosInstance.get(`/products`, { params });


    if(loadMore) {
      setProducts([...products, ...response.data.products]);
    } else {
      setProducts(response.data.products);
    }

    setHasMore(response.data.hasMore);


  } catch(error){

    console.error(error);
  }
}

const handleLoadMore = () => {

  const body = {
    skip: skip + limit,
    limit,
    loadMore: true,
    filters,
    searchTerm
  }
  fetchProducts(body);
  setSkip(skip + limit);
}


const handleFilters = (newFilteredData, checkCategory) => {

  const newFilters = {...filters};
  newFilters[checkCategory] = newFilteredData;

  if(checkCategory === "price"){  
    const priceValues = handlePrice(newFilteredData);
    newFilters[checkCategory] = priceValues;

  }

  showFilteredResults(newFilters);
  setFilters(newFilters);
}


const handlePrice = (value) => {

  let array = [];

  for(let key in prices){
    if(prices[key]._id === parseInt(value, 10)){
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


  return (
    <section
    
    >
      {/* 메인 슬라이드 배너 */}
      <div>

           <Hero />
      </div>
   

      {/* Filter */}
      <div className='flex border-[1px] border-gray-200 rounded-lg text-gray-400 font-sans'>

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
       <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
        {products.map(product => (
            <CardItem product={product} key={product._id} />
        ))}
    
      </div>
      {/* LoadMore 상품 더보기 버튼 */}
       {hasMore &&
          <div className='flex justify-center mt-5'>
            <button
              className='px-4 py-2 mt-5 text-white bg-black hover:bg-gray-500 rounded-lg'
              onClick={handleLoadMore}
            >
              More + 
            </button>
          </div>
       }   
      


    </section>
  )
}

export default LandingPage