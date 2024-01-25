// eslint-disable-next-line no-unused-vars
import React from 'react'

const SearchInput = ({searchTerm, onSearch}) => {
  return (
    
    <input 
      className='my-4 p-1 border border-gray-300 rounded-md'
      type='text'
      placeholder='상품검색'
      onChange={onSearch}
      value={searchTerm}
    />
    
  )
}

export default SearchInput