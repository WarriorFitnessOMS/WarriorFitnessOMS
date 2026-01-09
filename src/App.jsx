import React from 'react'
import Navbar from './components/Navbar'
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


const App = () => {
  return (
    <div className='bg-neutral-800 h-[200vh]'>
      <>
        <Navbar/>

        <Routes >
          <Route path ='/' element={ <Home/>} />

        </Routes>
      </>
    </div>
  )
}

export default App
