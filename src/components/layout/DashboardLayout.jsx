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
        <header className='bg-black border-b border-orange-500/20 px-8 py-6'>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
        </header>

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