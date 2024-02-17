// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch} from 'react-redux'
import { loginUser } from '../../store/thunkFunctions'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange' })


  // 리덕스에서 관리

const dispatch = useDispatch();
const navigate = useNavigate();

const onSubmit = ({ email, password }) => {

  const body = {
    email: email,
    password: password,
  }

  dispatch(loginUser(body)); // backend로 보내기 전에 리덕스로 넘김

  reset();
  navigate('/');
}

// 유효성 체크

const userEmail = {
  required: "필수적으로 입력하셔야 합니다."
}


const userPassword = {
  required: "필수적으로 입력하셔야 합니다.",
  minLength: {
  value: 6,
  message: "최소 6자이상입니다."
  }
}

  return (
    <section 
      className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'
    >
      <div 
        className='p-6 bg-white rounded-md shadow-md'
      >
        <h2 className='text-3xl font-semibold text-center'>
           로그인
        </h2>
        
        <form 
          className='mt-6'
          onSubmit={handleSubmit(onSubmit)}   
        >
          <div className='mb-2'>
            <label 
            htmlFor='email'
            className='text-sm font-semibold text-gray-800'
            >
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('email', userEmail)}
          />
          {
            errors?.email &&
              <div>
                <span className='text-red-500'>
                  {errors.email.message}
                </span>
              </div>
          }
          </div>
         
          <div className='mb-2'>
            <label 
            htmlFor='password'
            className='text-sm font-semibold text-gray-800'
            >
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('password', userPassword)}
          />
          {
            errors?.password &&
              <div>
                <span className='text-red-500'>
                  {errors.password.message}
                </span>
              </div>
          }
          </div>
          <div
            className='mt-6'
          >
            <button 
              type="submit"
              className='w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-500 ease-in-out'
            > 
              로그인
            </button>
          </div>
          <p className='mt-8 text-xs font-light text-center text-gray-700'>
          아이디가 없다면? {" "}
           <a
            href='/register'
            className='font-medium hover:underline'
           >
               회원가입
           </a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default LoginPage