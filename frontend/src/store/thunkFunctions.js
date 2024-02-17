import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";


// 회원가입 
export const registerUser = createAsyncThunk(

    "user/registerUser",
   async(body, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/register`,
                body // dispatch로 받아온 body 값
            )
            return response.data; // backend에서 받아온 payload
        } catch(error) {
            console.log(error);
            // backend에서 보내온 거부된 값 처리
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }
)

// 로그인

export const loginUser = createAsyncThunk(

    "user/loginUser",
   async(body, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/login`,
                body // dispatch로 받아온 body 값
            )
            return response.data; // backend에서 받아온 payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }

)

// 유저 인증체크

export const authUser = createAsyncThunk(

    "user/authuser",
   async(_, thunkAPI) => {
        try{
            const response = await axiosInstance.get(
                `/users/auth`,
            )
            return response.data; // backend에서 받아온 payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }


)

// 로그아웃 

export const logoutUser = createAsyncThunk(

    "user/logoutUser",
   async(_, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/logout`,
            )
            return response.data; // backend에서 받아온 payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }


)

// 제품 상세 페이지 장바구니 버튼 클릭했을 시 cart에 상품데이터 추가

export const addToCart = createAsyncThunk(

    "user/addToCart",
   async(body, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/cart `,
                body // dispatch로 받아온 body 값
            );
            return response.data; // backend에서 받아온 payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }


)

// 장바구니 페이지 데이터 요청

// 몽고db 데이터 users documents의 cart의 quantity가 products에도 있어야
// 장바구니 페이지에서 중복된 상품 수량을 나타낼 수 있다 

export const getCartItems = createAsyncThunk(
    "user/getCartItems",
 //Destructuring 해서 cartItemIds, userCart 등 개별적인 변수에 할당하게 한다    
    async ({ cartItemIds, userCart }, thunkAPI) => {
        try {
            // products 데이터를 요청해서 가져온 후  
            const response = await axiosInstance.get(
                `/products/${cartItemIds}?type=array`);

// cartItem에 해당하는 정보들을 Product Collection에서 가져온 후 Quantity 정보 넣어준다
            userCart.forEach(cartItem => {
                // response.data = 요청한 products 데이터 받아와서 
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })

            return response.data; // backend에서 받아온 payload

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)


// 장바구니 상품 삭제하기

export const removeCartItem = createAsyncThunk(

    "user/removeCartItem",
   async(productId, thunkAPI) => {
        try{
            const response = await axiosInstance.delete(
                `/users/cart?productId=${productId}`
            );
//cart와 productInfo 정보를 조합해서 새롭게 cartDetail을 만든다
            response.data.cart.forEach(cartItem => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id){
                        response.data.productInfo[index].quantity =cartItem.quantity;
                    }
                })
            })

            return response.data; // backend에서 받아온 payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }


)

// 결제하기

export const payProducts = createAsyncThunk(
    "user/payProducts",
   async(body, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/payment`,
                body // dispatch(payProducts({ cartDetail }))
            )
            return response.data; // backend에서 받아온 payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }


)
