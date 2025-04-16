import React from 'react'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Loginpage = () => {
  const navigate = useNavigate();

  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setEmail('');
    setPassword('');
    navigate('/')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 p-5">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-800"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-800"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition duration-300"
          >
            Submit
          </button>
        </form>
          <div className='flex item-center gap-2 justify-center mt-2'>
            <h3>Don't have an account?</h3>
            <Link to='/signup'><button className='text-blue-700 cursor-pointer font-semibold'>Create one</button></Link>
          </div>
      </div>
    </div>

  )
}

export default Loginpage;
