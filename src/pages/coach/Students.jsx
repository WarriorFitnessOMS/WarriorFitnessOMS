/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  MoreVertical, 
  FileText, 
  Dumbbell,
  Filter,
  Target,
  Plus
} from 'lucide-react'

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  // Mock Data: List of assigned students
  const students = [
    { 
      id: 1, 
      name: "Mike Ross", 
      email: "mike@example.com",
      goal: "Muscle Gain",
      plan: "Hypertrophy Phase 1",
      planStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
    },
    { 
      id: 2, 
      name: "Sarah Smith", 
      email: "sarah@example.com",
      goal: "Fat Loss",
      plan: "Cardio Blast",
      planStatus: "Expiring Soon",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      id: 3, 
      name: "Emily Clark", 
      email: "emily@example.com",
      goal: "Endurance",
      plan: "None",
      planStatus: "No Plan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
    },
    { 
      id: 4, 
      name: "John Doe", 
      email: "john@example.com",
      goal: "Strength",
      plan: "5x5 Power",
      planStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop"
    },
  ]

  // Filter Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || 
                          (filterStatus === 'Active' && student.planStatus === 'Active') ||
                          (filterStatus === 'Needs Plan' && (student.planStatus === 'No Plan' || student.planStatus === 'Expiring Soon'))
    return matchesSearch && matchesFilter
  })

  // Helper for Status Colors
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Expiring Soon': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'No Plan': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className='w-full min-h-screen bg-neutral-900 text-white pb-12 px-6'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className='pt-8 mb-8'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-white'>My Students</h1>
            <p className='text-gray-400 mt-1'>Manage {students.length} active athletes</p>
          </div>
          
          {/* Search & Filter Bar */}
          <div className='flex gap-3 w-full md:w-auto'>
            <div className='relative flex-1 md:w-64'>
               <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={18} />
               <input 
                 type="text" 
                 placeholder="Search students..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className='w-full bg-neutral-800 border border-neutral-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-orange-500 outline-none transition-all'
               />
            </div>
            <button className='bg-neutral-800 border border-neutral-700 p-2.5 rounded-xl text-gray-400 hover:text-white hover:border-orange-500 transition-all'>
               <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-2 mt-6 overflow-x-auto no-scrollbar'>
           {['All', 'Active', 'Needs Plan'].map(tab => (
             <button
               key={tab}
               onClick={() => setFilterStatus(tab)}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                 filterStatus === tab 
                   ? 'bg-orange-500 text-white border-orange-500' 
                   : 'bg-transparent text-gray-500 border-neutral-700 hover:border-gray-500'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </motion.div>

      {/* STUDENTS GRID */}
      <motion.div 
        variants={containerVariants}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {filteredStudents.map((student) => (
          <motion.div 
            key={student.id} 
            variants={itemVariants}
            className='bg-neutral-800 rounded-2xl p-5 border border-neutral-700 hover:border-orange-500/50 transition-all group'
          >
            {/* Top Row: Avatar & Details */}
            <div className='flex justify-between items-start mb-4'>
               <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-700 group-hover:border-orange-500 transition-colors'>
                     <img src={student.avatar} alt={student.name} className='w-full h-full object-cover' />
                  </div>
                  <div>
                     <h3 className='font-bold text-white text-lg'>{student.name}</h3>
                     <p className='text-xs text-gray-400'>{student.email}</p>
                  </div>
               </div>
               <button className='text-gray-500 hover:text-white'>
                  <MoreVertical size={20} />
               </button>
            </div>

            {/* Goal Section (Now Full Width) */}
            <div className='bg-neutral-900/50 p-3 rounded-xl border border-neutral-800 mb-4 flex items-center gap-3'>
               <div className='w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-blue-500'>
                  <Target size={18} />
               </div>
               <div>
                  <p className='text-[10px] uppercase font-bold text-gray-500'>Main Goal</p>
                  <p className='text-sm font-bold text-white'>{student.goal}</p>
               </div>
            </div>

            {/* Plan Info */}
            <div className='mb-6'>
               <div className='flex justify-between text-xs mb-2'>
                  <span className='text-gray-400'>Assigned Plan</span>
                  <span className={`px-2 py-0.5 rounded font-bold border ${getStatusStyle(student.planStatus)}`}>
                     {student.planStatus}
                  </span>
               </div>
               <div className='flex items-center gap-2 text-sm font-bold text-white'>
                  <FileText size={16} className='text-orange-500' />
                  {student.plan !== "None" ? student.plan : "Not Assigned"}
               </div>
            </div>

            {/* Actions Button Row */}
            <div className='flex gap-3 pt-4 border-t border-neutral-700'>
               {/* 1. View Progress Button (Always visible) */}
               <button className='flex-1 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors'>
                  <Dumbbell size={16} /> View Progress
               </button>

               {/* 2. Assign Plan Button (Only if needed) */}
               {(student.planStatus === 'No Plan' || student.planStatus === 'Expiring Soon') && (
                  <button className='flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/20'>
                     <Plus size={16} /> Assign Plan
                  </button>
               )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Students