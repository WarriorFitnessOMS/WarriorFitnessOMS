import React from 'react'
import { Outlet  } from "react-router-dom";
import Navbar from "../publicWeb/Navbar";
import Footer from "../publicWeb/Footer";


const PublicLayout = () => {
  return (
    <>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
      
    </>
  );
};

export default PublicLayout
