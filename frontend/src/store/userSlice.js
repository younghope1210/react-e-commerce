import { createSlice } from "@reduxjs/toolkit"
import { registerUser, loginUser, authUser, logoutUser, addToCart,  getCartItems, removeCartItem, payProducts } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
    useData: {
        id: '',
        email:'',
        name: '',
        role: 0,
        image: '',
    },
    isAuth: false,
    isLoading: false,
    error:''
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>  {
        builder
        // 회원가입
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
             })
             .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                toast.info('축하합니다! 회원가입이 완료되었습니다!');
             })
             .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
             })

          // 로그인
          
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true; // 로그인 상태이면 true
                localStorage.setItem('accessToken', action.payload.accessToken); // key값
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            
        // 유저 인증체크
          
        .addCase(authUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(authUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.isAuth = true;
        })
        .addCase(authUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuth =  false;
            localStorage.removeItem('accessToken');
        })
        

        // 로그아웃
             
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.userData = initialState.userData;
            state.isAuth = false;
            localStorage.removeItem('accessToken'); // key값
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        
        // 제품 상세페이지 장바구니 담기 버튼 누를 때 
                    
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData.cart = action.payload;
            toast.info('장바구니에 추가되었습니다.');
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })


        // 장바구니 페이지 데이터 가져오기
                
        .addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartDetail = action.payload;
        })
        .addCase(getCartItems.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })


        // 장바구니 상품삭제

        .addCase(removeCartItem.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(removeCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartDetail = action.payload.productInfo;
            state.userData.cart = action.payload.cart;
            toast.info('상품이 제거되었습니다.');
        })
        .addCase(removeCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        .addCase(payProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(payProducts.fulfilled, (state) => {
            state.isLoading = false;
            state.cartDetail = [];
            state.userData.cart = [];
            toast.info('성공적으로 상품을 구매했습니다.');
        })
        .addCase(payProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
       
    }

})

export default userSlice.reducer;