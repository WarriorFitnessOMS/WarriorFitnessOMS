/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  PlayCircle, 
  ChevronLeft, 
  ChevronRight, 
  History,
  Layout,
  Filter,
  Trophy
} from 'lucide-react'

const WorkoutPlansMember = () => {
  const [activeTab, setActiveTab] = useState('schedule') // 'schedule' or 'history'
  const [currentWeek, setCurrentWeek] = useState(1)
  const [selectedDay, setSelectedDay] = useState('Mon')

  // Mock Data: The Current Active Program
  const currentProgram = {
    name: "Hypertrophy Phase 1",
    coach: "Coach Sarah",
    totalWeeks: 8,
    difficulty: "Intermediate",
    schedule: {
      'Mon': { title: 'Upper Body Power', duration: '60 min', exercises: 6, status: 'completed' },
      'Tue': { title: 'Lower Body Strength', duration: '75 min', exercises: 5, status: 'active' },
      'Wed': { title: 'Active Recovery', duration: '30 min', exercises: 2, status: 'rest' },
      'Thu': { title: 'Push Hypertrophy', duration: '60 min', exercises: 7, status: 'upcoming' },
      'Fri': { title: 'Pull Hypertrophy', duration: '60 min', exercises: 6, status: 'upcoming' },
      'Sat': { title: 'Legs & Core', duration: '50 min', exercises: 8, status: 'upcoming' },
      'Sun': { title: 'Rest Day', duration: '0 min', exercises: 0, status: 'rest' }
    }
  }

  // Mock Data: Exercises for the selected day
  const dailyExercises = [
    { name: "Barbell Squats", sets: 4, reps: "6-8", rest: "120s", video: true },
    { name: "Romanian Deadlifts", sets: 3, reps: "8-10", rest: "90s", video: true },
    { name: "Leg Press", sets: 3, reps: "12-15", rest: "60s", video: false },
    { name: "Calf Raises", sets: 4, reps: "15-20", rest: "45s", video: false },
  ]

  // Mock Data: Past Completed Programs (History)
  const programHistory = [
    { id: 1, name: "Beginner Strength", date: "Dec 2024", completed: "100%", coach: "Coach Alex" },
    { id: 2, name: "Cardio Blast", date: "Nov 2024", completed: "85%", coach: "Coach Mike" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className='w-full min-h-screen bg-neutral-900 text-white pb-24 px-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* PAGE HEADER & TABS */}
      <motion.div variants={itemVariants} className='pt-6 mb-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-white'>My Plan</h1>
            <p className='text-gray-400 text-sm'>Manage your training schedule</p>
          </div>
          {/* View Toggle */}
          <div className='flex bg-neutral-800 p-1 rounded-lg border border-neutral-700'>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'schedule' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layout size={16} /> Schedule
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'history' ? 'bg-neutral-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <History size={16} /> History
            </button>
          </div>
        </div>
      </motion.div>

      {/* === SCHEDULE VIEW === */}
      {activeTab === 'schedule' && (
        <motion.div variants={containerVariants} initial='hidden' animate='visible'>
          
          {/* 1. WEEK NAVIGATOR (Solves "No Option to see past plans") */}
          <div className='flex items-center justify-between bg-neutral-800 p-4 rounded-xl border border-neutral-700 mb-6'>
             <button 
               onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
               className='p-2 hover:bg-neutral-700 rounded-lg text-gray-400 hover:text-white transition-colors'
             >
               <ChevronLeft size={20} />
             </button>
             
             <div className='text-center'>
               <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Current Program</p>
               <h2 className='text-lg font-bold text-white'>{currentProgram.name}</h2>
               <p className='text-orange-500 text-sm font-bold'>Week {currentWeek} <span className='text-gray-500 font-normal'>of {currentProgram.totalWeeks}</span></p>
             </div>

             <button 
               onClick={() => setCurrentWeek(Math.min(currentProgram.totalWeeks, currentWeek + 1))}
               className='p-2 hover:bg-neutral-700 rounded-lg text-gray-400 hover:text-white transition-colors'
             >
               <ChevronRight size={20} />
             </button>
          </div>

          {/* 2. DAY SELECTOR (Horizontal Scroll) */}
          <div className='flex gap-3 overflow-x-auto pb-4 mb-2 no-scrollbar'>
            {Object.keys(currentProgram.schedule).map((day) => {
              const info = currentProgram.schedule[day]
              const isSelected = selectedDay === day
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-w-[80px] flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                    isSelected 
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                      : 'bg-neutral-800 border-transparent text-gray-400 hover:bg-neutral-700'
                  }`}
                >
                  <span className='text-xs font-bold mb-1'>{day}</span>
                  {info.status === 'completed' && <div className='w-2 h-2 rounded-full bg-green-400' />}
                  {info.status === 'active' && <div className='w-2 h-2 rounded-full bg-white animate-pulse' />}
                  {info.status === 'rest' && <div className='w-2 h-2 rounded-full bg-gray-600' />}
                  {info.status === 'upcoming' && <div className='w-2 h-2 rounded-full bg-gray-600' />}
                </button>
              )
            })}
          </div>

          {/* 3. DAY DETAILS & EXERCISES */}
          <div className='bg-neutral-800 rounded-2xl border border-neutral-700 p-6 min-h-[300px]'>
             
             {/* Header for Day */}
             <div className='flex justify-between items-start mb-6 pb-6 border-b border-neutral-700'>
                <div>
                  <h3 className='text-2xl font-bold text-white'>{currentProgram.schedule[selectedDay].title}</h3>
                  <div className='flex gap-4 mt-2 text-sm text-gray-400'>
                    <span className='flex items-center gap-1'><Clock size={16} /> {currentProgram.schedule[selectedDay].duration}</span>
                    <span className='flex items-center gap-1'><Dumbbell size={16} /> {currentProgram.schedule[selectedDay].exercises} Exercises</span>
                  </div>
                </div>
                {/* Future Proofing: Main Action Button */}
                {currentProgram.schedule[selectedDay].status !== 'rest' && (
                  <button className='bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2'>
                    <PlayCircle size={18} /> Start
                  </button>
                )}
             </div>

             {/* Content */}
             {currentProgram.schedule[selectedDay].status === 'rest' ? (
               <div className='flex flex-col items-center justify-center py-10 text-center opacity-50'>
                 <div className='bg-neutral-700 p-4 rounded-full mb-4'>
                   <Clock size={40} className='text-gray-400' />
                 </div>
                 <h4 className='text-xl font-bold'>Rest & Recovery</h4>
                 <p className='text-sm mt-2'>Take it easy today. Your muscles need time to grow.</p>
               </div>
             ) : (
               <div className='space-y-4'>
                 {dailyExercises.map((ex, idx) => (
                   <div key={idx} className='flex items-center gap-4 p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-orange-500/30 transition-colors'>
                      <div className='w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-gray-500 font-bold border border-neutral-700'>
                        {idx + 1}
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-bold text-white'>{ex.name}</h4>
                        <p className='text-xs text-gray-400 mt-1'>
                          {ex.sets} Sets × {ex.reps} Reps • {ex.rest} Rest
                        </p>
                      </div>
                      {ex.video && (
                        <button className='text-orange-500 hover:text-orange-400'>
                          <PlayCircle size={24} />
                        </button>
                      )}
                   </div>
                 ))}
               </div>
             )}
          </div>
        </motion.div>
      )}

      {/* === HISTORY VIEW (Past Plans) === */}
      {activeTab === 'history' && (
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-4'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='font-bold text-lg'>Completed Programs</h3>
            <button className='text-orange-500 text-sm font-bold flex items-center gap-1'>
              <Filter size={14} /> Filter
            </button>
          </div>
          
          {programHistory.map((program) => (
            <motion.div 
              key={program.id} 
              variants={itemVariants}
              className='bg-neutral-800 p-5 rounded-xl border border-neutral-700 flex justify-between items-center hover:border-orange-500/50 transition-colors cursor-pointer'
            >
              <div>
                <h4 className='font-bold text-white text-lg'>{program.name}</h4>
                <p className='text-sm text-gray-400'>{program.coach} • {program.date}</p>
              </div>
              <div className='text-right'>
                <div className='flex items-center gap-1 text-green-500 font-bold mb-1'>
                  <Trophy size={16} /> {program.completed}
                </div>
                <button className='text-xs text-gray-500 underline hover:text-white'>View Report</button>
              </div>
            </motion.div>
          ))}
          
          {/* Empty State visual helper */}
          <div className='mt-8 p-8 border-2 border-dashed border-neutral-800 rounded-xl text-center text-gray-500'>
             <p className='text-sm'>More history will appear here as you complete plans.</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default WorkoutPlansMember