import React from 'react'
import Navbar from './components/Navbar'
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className='bg-neutral-800 min-h-screen'>
      <>
        <Navbar/>

        <Routes >
          <Route path ='/' element={ <Home/>} />
          <Route path ='/register' element={ <Register/>} />
        </Routes>

        <Footer/>
      </>
    </div>
  )
}

export default App
