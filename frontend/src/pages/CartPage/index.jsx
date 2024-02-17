// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, removeCartItem, payProducts } from '../../store/thunkFunctions';
import CartTable from './Sections/CartTable';

const CartPage = () => {

  const userData = useSelector(state => state.user?.userData);
  const cartDetail = useSelector(state => state.user?.cartDetail);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);


  useEffect(() => {
   
    let cartItemIds = [];

    // 유저데이터 안에 카트가 있고 카트에 담긴 상품이 0보다 크면
    if(userData?.cart && userData.cart.length > 0){

      userData.cart.forEach(item =>{
        
        cartItemIds.push(item.id); // 배열에 아이템 아이디 담아준다
      
      })

      const body = { // backend router에 보낼 body값

        cartItemIds,
        userCart: userData.cart

      }
      dispatch(getCartItems(body)); //cartItemIds 배열 디스패치로 리덕스에 보냄
    }

  }, [dispatch, userData])
  
  // 장바구니 담긴 상품 계산

  useEffect(() => {

    calculateTotal(cartDetail);

  }, [cartDetail]) // cartDetail의 data가 변할 때마다 리렌더링
  
  const calculateTotal = (cartItems) => {
    let sum = 0;
    cartItems.map(item => sum += item.price * item.quantity)
    setTotal(sum);
  }

// 장바구니 상품 지우기 버튼

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  }

  // 결제하기 버튼

const handlePaymentClick = () => {
  dispatch(payProducts({ cartDetail }))
}


  return (
    <section className='w-10/12 max-w-4xl mx-auto mb-auto'>
        <div className='text-center m-7'>
          <h2 className='text-2xl'>
            장바구니 페이지
          </h2>
        </div>
      
      {cartDetail?.length > 0 ? 
      
        <>
        <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem } />
          <div className='mt-10'>
            <p>
              <span className='font-bold'>합계:</span> {total} 원
            </p>
            <button
              className='px-4 py-2 mt-5 text-white bg-black hover:bg-gray-500 rounded-md  hover:bg-gray-700 transition duration-500 ease-in-out'
              onClick={handlePaymentClick}
            >
              결제하기
            </button>
          </div>
        </>
        :
        <p>담긴 상품이 없습니다.</p>
    }

    </section>
  )
}

export default CartPage