import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between text-white px-5 bg-gray-700 h-15 item-center'>
                <div>
                    <h1 className='text-3xl flex items-center h-full font-bold'>E-Shopping</h1>
                </div>
                <div>
                    <ul className='flex gap-5 text-2xl font-semibold items-center h-full'>
                        <Link to='/login'><li>Login</li></Link>
                        <Link to='/signup'><li>Signup</li></Link>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
