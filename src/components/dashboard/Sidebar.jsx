/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard,
  CreditCard,
  ClipboardClock,
  Dumbbell,
  Users,
  Headphones,
  CalendarDays,
  ClipboardCheck,
  Settings
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const roleLinks = {
    admin: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Payments",
        path: "/admin/payments",
        icon: CreditCard,
      },
      {
        label: "Membership Requests",
        path: "/admin/membership-requests",
        icon: ClipboardClock,
      },
      {
        label: "Members",
        path: "/admin/members",
        icon: Users,
      },
      {
        label: "Coaches",
        path: "/admin/coaches",
        icon: Dumbbell,
      },
      {
        label: "Attendance",
        path: "/admin/attendance",
        icon: ClipboardCheck,
      },
      {
        label: "Schedule",
        path: "/admin/schedule",
        icon: CalendarDays,
      },
      {
        label: "Support",
        path: "/admin/support",
        icon: Headphones,
      },
      {
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
    coach: [
      { label: "Dashboard", path: "/coach/dashboard", icon: "📊" },
      { label: "My Students", path: "/coach/students", icon: "👥" },
      { label: "Workouts", path: "/coach/workouts", icon: "💪" },
      { label: "Videos", path: "/coach/videos", icon: "🎥" }
    ],
    member: [
      { label: "Dashboard", path: "/member/dashboard", icon: "📊" },
      { label: "My Workouts", path: "/member/workouts", icon: "💪" },
      { label: "Progress", path: "/member/progress", icon: "📈" },
      { label: "Challenges", path: "/member/challenges", icon: "🎯" }
    ]
  }

  const linksToRender = user ? roleLinks[user.role] || [] : []
  const isActive = (path) => location.pathname === path

  return (
    <motion.aside
      className='fixed left-0 top-0 h-screen w-72 py-6 bg-black border-r border-orange-500/20 flex flex-col z-40'
      initial={{ x: -288 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* LOGO SECTION */}
      <div className='p-6 border-b border-orange-500/20'>
        <div className='flex items-center gap-3'>
          <div className='w-14 h-14 flex items-center justify-center'>
            <img 
              src={assets.logo} 
              alt="Warrior Fitness" 
              className=''
            />
          </div>
          <div>
            <h2 className='text-3xl font-BabesNeue text-red-500'>WARRIOR</h2>
            <p className='text-3xl font-BabesNeue text-white '>FITNESS</p>
          </div>
        </div>
      </div>

      {/* USER INFO */}
      <div className='px-6 py-4 border-b border-orange-500/20'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-linear-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold'>
            {user?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className='text-xs font-semibold text-white'>{user?.username}</p>
            <p className='text-xs text-gray-400'>{user?.username || 'no'}</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className='flex-1 overflow-y-auto p-4 space-y-2'>
        {linksToRender.map((link) => {
        const Icon = link.icon

        return (
          <motion.div
            key={link.path}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={link.path}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                  : 'text-gray-300 hover:text-orange-500 hover:bg-orange-500/10'
              }`}
            >
               <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          </motion.div>
        )})}
      </nav>

      {/* FOOTER */}
      <div className='p-4 border-t border-orange-500/20 space-y-3'>
        <div className='text-xs text-center text-gray-500 px-4'>
          <p>© 2025 Warrior Fitness</p>
          <p>v1.0.0</p>
          <p>All rights reserved. </p>
        </div>
        <motion.button
          onClick={logout}
          className='w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-all font-medium'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  )
}

export default Sidebar