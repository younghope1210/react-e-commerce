// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunctions';
import { AiOutlineShoppingCart} from 'react-icons/ai';

const routes = [
  { to: '/login', name: 'Login', auth: false },
  { to: '/register', name: 'Join', auth: false },
  { to: '/product/upload', name: 'Upload', auth: true },
  { to: '/user/cart', name: 'Cart', auth: true, icon: <AiOutlineShoppingCart style={{ fontSize: '1.4rem' }} /> },
  { to: '/history', name: 'Order', auth: true },
  { to: '', name: 'Logout', auth: true },
]



// eslint-disable-next-line react/prop-types
const NavItem = ({ mobile }) => {

 const isAuth = useSelector(state => state.user?.isAuth);
 const cart = useSelector(state => state.user?.userData?.cart);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 // 로그아웃
 
 const handleLogout = () => {
  dispatch(logoutUser())
  .then(() => {
    navigate('/login');
  })
 
 }


 return (
  <ul className={`text-md justify-center w-full flex gap-4 ${mobile && "flex-col bg-white text-gray-500 h-full pd-2"} items-center`}>
    {routes.map(({ to, name, auth, icon }) => {
      if (isAuth !== auth) return null;

      if (name === 'Logout') {
        return <li key={name} className='py-2 text-center cursor-pointer'>
          <Link
            onClick={handleLogout}
          >
            {name}
          </Link>
        </li>
      } else if (icon) { // 아이콘이 있는 메뉴는
        return <li className='relative py-2 text-center cursor-pointer' key={name}>
          <Link to={to} >
            {icon}
            <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -right-3'>
            {cart?.length}
            </span>
          </Link>
        </li>
      } else {
        return <li key={name} className='py-2 text-center cursor-pointer'>
          <Link
            to={to}
          >
            {name}
          </Link>
        </li>
      }

    })}
  </ul>
)
}

export default NavItem