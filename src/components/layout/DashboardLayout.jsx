import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../dashboard/Sidebar'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const DashboardLayout = () => {
  return (
    <div className='flex h-screen bg-neutral-900'>
      {/* FIXED SIDEBAR - Left side */}
      <Sidebar />

      {/* MAIN CONTENT - Right side, takes remaining space */}
      <motion.div
        className='flex-1 flex flex-col overflow-hidden ml-72'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* HEADER */}

        {/* PAGE CONTENT */}
        <main className='flex-1 overflow-auto'>
          <div className='p-8'>
            <Outlet />
          </div>
        </main>
      </motion.div>
    </div>
  )
}

export default DashboardLayout