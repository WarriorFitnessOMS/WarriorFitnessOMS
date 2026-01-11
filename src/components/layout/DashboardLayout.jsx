import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import Sidebar from '../dashboard/Sidebar'
import { Outlet } from 'react-router-dom'


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-screen bg-neutral-900 overflow-hidden'>
      {/* ==================  DESKTOP SIDEBAR =================== */}
      <div className='hidden lg:block w-72 flex-shrink-0'>
        <Sidebar />  {/* <- REPLACE: Use your actual Sidebar component */}
      </div>

      {/* ================== OVERLAY + MOBILE SIDEBAR - ==================== */}
      <AnimatePresence mode='wait'>
        {sidebarOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className='lg:hidden fixed inset-0 bg-black/70 z-30'
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.3 }}
              className='lg:hidden fixed left-0 top-0 h-screen w-72 z-40'
            >
              <Sidebar />  {/* <- REPLACE: Use your actual Sidebar component */}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================  MAIN CONTENT AREA =================== */}
      <motion.div
        className='flex-1 flex flex-col overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ==================   MOBILE HEADER ===================== */}
        <div className='lg:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-orange-500/20 flex items-center px-4 z-20'>
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='flex items-center gap-2 px-3 py-2 rounded-lg text-orange-500 hover:bg-orange-500/10'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
          <h1 className='flex-1 text-center text-white font-bold'>Warrior Fitness</h1>
        </div>

        {/* Page Content - Scrollable area */}
        <main className='flex-1 overflow-auto pt-16 lg:pt-0'>
          <div className='p-4 md:p-6 lg:p-8'>

            <Outlet /> 
          </div>
        </main>
      </motion.div>
    </div>
  )
}

export default DashboardLayout