// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './Sections/NavItem';


const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  }

  return (
    <section className='h-12 relative z-10 pt-1 pb-3 border-b'>
      <div className='w-full'>
        <div className='text-gray-500 flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
          {/* logo */}

          <div className='flex items-center text-3xl font-log text-black font-logo'>
            <Link to="/" >
              Fragrance
            </Link>
          </div>

          {/* menu button */}
          <div className='text-2xl sm:hidden'>
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div>

          {/* big screen nav-items */}
          <div className='hidden sm:block'>
            <NavItem />
          </div>

        </div>

        {/* mobile nav-items */}
        <div className='block sm:hidden'>
          {menu && <NavItem mobile />}
        </div>
      </div>
    </section>
  )
}

export default Navbar