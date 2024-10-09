import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between sticky  lg:bg-white top-0 flex-shrink-1 z-10 p-5 pl-4' >
        <Link to='/'>
          <h1 className='lg:ml-[100px] bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent sm:ml-[20px] text-xl font-semibold' >
              MCA HUB
          </h1>
        </Link>
        <div className='flex'>
          <ul className="flex space-x-6 lg:mr-[100px] md:mr-[50px] mr-[5px]  font-medium text-blue-600">
            <Link to='/'>
              <li className='hover:brightness-50 hover:cursor-pointer'>Home</li>
            </Link>
            <Link to='/choose'><li className='hover:brightness-50 hover:cursor-pointer'>Login</li></Link>
            <Link to='/Adminregister'><li className='hover:brightness-50'>Register</li></Link >
            <Link to='/chooseasguest'><li className='hover:brightness-50'>Login as Guest</li></Link >
          </ul>
          <button></button>
        </div>
    </div>
  )
}

export default Navbar
