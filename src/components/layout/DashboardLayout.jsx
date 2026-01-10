import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../dashboard/Sidebar'


const DashboardLayout = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout
