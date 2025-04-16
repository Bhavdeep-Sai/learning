import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Home, Loginpage, Signuppage} from './Routes'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/signup' element={<Signuppage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
