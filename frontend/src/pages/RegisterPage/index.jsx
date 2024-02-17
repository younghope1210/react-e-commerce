// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/thunkFunctions'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
 
  // npm install react-hook-form 설치하기

 const {
    register,
    handleSubmit, //  input의 value 들 'email, password, name'을 받아온다
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange' }) // onchange 이벤트가 발생할 때 유효성 체크를 한다 'bluer'등 옵션 설정 가능

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 회원가입 버튼 클릭시 
  const onSubmit = ({ email, password, name }) => {

    const body = {
      email,
      password,
      name,
      image: `https://via.placeholder.com/600x400?text=no+user+image`
    }

    dispatch(registerUser(body)); // backend로 보내기 전에 리덕스로 넘김
    reset();
    navigate('/login');
  }

  const userEmail = {
    required: "필수 필드입니다."
  }
  const userName = {
    required: "필수 필드입니다."
  }
  const userPassword = {
    required: '필수 필드입니다.',
    minLength: {
      value: 6,
      message: "최소 6자입니다."
    }
  }

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>
          회원가입
        </h1>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='text-sm font-semibold text-gray-800'
            >Email</label>
            <input
              type='email'
              id="email"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('email', userEmail)}
            />
            {/* 에러처리 */}
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
              htmlFor='name'
              className='text-sm font-semibold text-gray-800'
            >Name</label>
            <input
              type='text'
              id="name"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('name', userName)}
            />
            {/* 에러처리 */}
            {
              errors?.name &&
              <div>
                <span className='text-red-500'>
                  {errors.name.message}
                </span>
              </div>
            }
          </div>

          <div className='mb-2'>
            <label
              htmlFor='password'
              className='text-sm font-semibold text-gray-800'
            >Password</label>
            <input
              type='password'
              id="password"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('password', userPassword)}
            />
            {/* 에러처리 */}
            {
              errors?.password &&
              <div>
                <span className='text-red-500'>
                  {errors.password.message}
                </span>
              </div>
            }
          </div>

          <div className='mt-6'>
            <button type='submit' className='w-full px-4 py-2 text-white transition duration-500 ease-in-out bg-black rounded-md hover:bg-gray-700'>
              회원가입
            </button>
          </div>

          <p className='mt-8 text-xs font-light text-center text-gray-700'>
            아이디가 있다면?{" "}
            <a
              href='/login'
              className='font-medium hover:underline'
            >
              로그인
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default RegisterPage