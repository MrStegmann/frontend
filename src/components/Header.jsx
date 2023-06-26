import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-full bg-red-900 p-5 mx-auto flex flex-row justify-between'>
        <h1 className='text-white font-bold text-xl'>Zombicide Random Cards</h1>
        <nav className='w-3/5 flex flex-row justify-end'>
            <Link to={"/spawn_zombie"} className='text-white'>Comenzar</Link>
        </nav>
    </div>
  )
}

export default Header