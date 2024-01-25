// eslint-disable-next-line no-unused-vars
import React from 'react'

const CheckBox = ({categorys, checkedCategorys, onFilters}) => {

  const handleToggle = (categoryId) => {

    // 현재 누른 checkbox가 이미 누른 checkbox 인지 체크
    const currentIndex = checkedCategorys.indexOf(categoryId);

    const newChecked = [...checkedCategorys];

    if (currentIndex === -1) { // 아직 체크가 되어 있지 않으면
        newChecked.push(categoryId);
    } else {
        newChecked.splice(currentIndex, 1); // 체크되어 있다면 체크해제
    }
    onFilters(newChecked);

}

  return (
    <div 
      className='p-2 mb-3'
    >
      
      {categorys?.map(category => (
                <div key={category._id}>
                    <input
                        type='checkbox'
                        onChange={() => handleToggle(category._id)}
                        checked={checkedCategorys.indexOf(category._id) === -1 ? false : true}
                    />{" "}
                    <label>{category.name}</label>
                </div>
            ))}
        </div>
  )
}

export default CheckBox