import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";


// 회원가입 
export const registerUser = createAsyncThunk(

    "user/registerUser",
   async(body, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/register`,
                body
            )
            return response.data;
        } catch(error) {
            console.log(error);
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
                body
            )
            return response.data;
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
            return response.data;
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
            return response.data;
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
                body
            );
            return response.data;
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }


)

// 장바구니 페이지 데이터 요청
export const getCartItems = createAsyncThunk(
    "user/getCartItems",
    async ({ cartItemIds, userCart }, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/products/${cartItemIds}?type=array`);

// cartItem에 해당하는 정보들을 Product Collection에서 가져온 후 Quantity 정보 넣어준다
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })

            return response.data;

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

            response.data.cart.forEach(cartItem => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id){
                        response.data.productInfo[index].quantity =cartItem.quantity;
                    }
                })
            })

            return response.data;
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
                body
            )
            return response.data;
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message );
        }   
   }


)
