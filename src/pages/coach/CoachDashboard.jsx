/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  ClipboardList, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Dumbbell,
  Trophy,
  ArrowRight,
  ChevronRight
} from 'lucide-react'

const CoachDashboard = () => {
  // Mock Data: Simple Counters
  const stats = {
    totalStudents: 18,
    activePlans: 15,
    sessionsToday: 4
  }

  // Mock Data: Action Items (Things the coach MUST do)
  const actionItems = [
    { id: 1, task: "Assign plan to New Member (John D.)", priority: "high" },
    { id: 2, task: "Renew Sarah's expired plan", priority: "medium" },
  ]

  // Mock Data: Recent Activity Feed (New "Useful" Feature)
  const recentActivity = [
    { id: 1, student: "Mike Ross", action: "Completed 'Leg Day'", time: "10 mins ago", type: "workout" },
    { id: 2, student: "Sarah Smith", action: "Hit a New PR: Deadlift 100kg", time: "2 hours ago", type: "pr" },
    { id: 3, student: "Emily Clark", action: "Logged weight: 65kg (-1kg)", time: "5 hours ago", type: "checkin" },
  ]

  // Mock Data: Today's Schedule
  const schedule = [
    { time: "09:00 AM", client: "Emily Clark", type: "PT Session", status: "completed" },
    { time: "02:00 PM", client: "Sarah Smith", type: "Consultation", status: "upcoming" },
    { time: "04:30 PM", client: "Mike Ross", type: "Check-in", status: "upcoming" },
  ]

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
        <h1 className='text-3xl font-bold'>
          <span className='text-white'>Coach</span>
          <span className='text-orange-500'> Dashboard</span>
        </h1>
        <p className='text-gray-400 mt-1'>Overview of your students and daily tasks</p>
      </motion.div>

      {/* 1. SIMPLE STAT CARDS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center justify-between'>
          <div>
             <p className='text-gray-400 text-xs font-bold uppercase'>My Students</p>
             <h3 className='text-3xl font-bold text-white'>{stats.totalStudents}</h3>
          </div>
          <div className='p-3 bg-blue-500/10 rounded-lg text-blue-500'>
             <Users size={24} />
          </div>
        </div>

        <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center justify-between'>
          <div>
             <p className='text-gray-400 text-xs font-bold uppercase'>Active Plans</p>
             <h3 className='text-3xl font-bold text-white'>{stats.activePlans}</h3>
          </div>
          <div className='p-3 bg-green-500/10 rounded-lg text-green-500'>
             <ClipboardList size={24} />
          </div>
        </div>

        <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center justify-between'>
          <div>
             <p className='text-gray-400 text-xs font-bold uppercase'>Sessions Today</p>
             <h3 className='text-3xl font-bold text-white'>{stats.sessionsToday}</h3>
          </div>
          <div className='p-3 bg-orange-500/10 rounded-lg text-orange-500'>
             <Calendar size={24} />
          </div>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        
        {/* LEFT COLUMN: TASKS & ACTIVITY */}
        <div className='space-y-6'>
          
          {/* 2. ACTION ITEMS (Priority) */}
          <motion.div variants={itemVariants} className='bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden'>
             <div className='p-5 border-b border-neutral-700 flex justify-between items-center'>
               <h3 className='font-bold text-white flex items-center gap-2'>
                 <AlertCircle size={20} className='text-orange-500' /> Action Required
               </h3>
               {actionItems.length > 0 && (
                 <span className='bg-red-500/20 text-red-500 text-xs font-bold px-2 py-0.5 rounded'>{actionItems.length}</span>
               )}
             </div>
             <div className='divide-y divide-neutral-700'>
               {actionItems.map(item => (
                 <div key={item.id} className='p-4 hover:bg-neutral-700/30 flex justify-between items-center group cursor-pointer'>
                    <div className='flex items-center gap-3'>
                       <div className={`w-2 h-2 rounded-full ${
                          item.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                       }`} />
                       <span className='text-sm text-gray-200 group-hover:text-white transition-colors'>{item.task}</span>
                    </div>
                    <ChevronRight size={16} className='text-gray-500 group-hover:text-white' />
                 </div>
               ))}
               {actionItems.length === 0 && (
                 <div className='p-6 text-center text-gray-500'>
                   <CheckCircle2 size={32} className='mx-auto mb-2 opacity-50' />
                   <p>No pending actions.</p>
                 </div>
               )}
             </div>
          </motion.div>

          {/* 3. RECENT ACTIVITY FEED (Replaces Quick Links) */}
          <motion.div variants={itemVariants} className='bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden'>
             <div className='p-5 border-b border-neutral-700'>
               <h3 className='font-bold text-white flex items-center gap-2'>
                 <Trophy size={20} className='text-yellow-500' /> Live Activity Feed
               </h3>
             </div>
             <div className='p-4 space-y-4'>
               {recentActivity.map(activity => (
                 <div key={activity.id} className='flex gap-3'>
                    <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      activity.type === 'pr' ? 'bg-yellow-500/10 text-yellow-500' : 
                      activity.type === 'workout' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                       {activity.type === 'pr' ? <Trophy size={14} /> : 
                        activity.type === 'workout' ? <Dumbbell size={14} /> : <CheckCircle2 size={14} />}
                    </div>
                    <div>
                       <p className='text-sm text-white font-bold'>{activity.student}</p>
                       <p className='text-xs text-gray-400'>{activity.action}</p>
                       <p className='text-[10px] text-gray-600 mt-1'>{activity.time}</p>
                    </div>
                 </div>
               ))}
             </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: SCHEDULE */}
        <motion.div variants={itemVariants} className='h-full'>
          {/* 4. TODAY'S SCHEDULE */}
          <div className='bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden h-full'>
             <div className='p-5 border-b border-neutral-700 flex justify-between items-center'>
                <h3 className='font-bold text-white flex items-center gap-2'>
                  <Clock size={20} className='text-blue-500' /> Today's Schedule
                </h3>
                <span className='text-xs text-gray-500 font-bold uppercase'>{new Date().toLocaleDateString()}</span>
             </div>
             
             <div className='p-4 space-y-3'>
                {schedule.map((item, idx) => (
                   <div key={idx} className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                      item.status === 'completed' 
                        ? 'bg-neutral-900/30 border-neutral-800 opacity-60' 
                        : 'bg-neutral-900/80 border-neutral-700'
                   }`}>
                      <div className={`px-3 py-1.5 rounded text-xs font-mono font-bold border ${
                        item.status === 'completed' 
                          ? 'bg-neutral-800 text-gray-500 border-neutral-700 decoration-line-through' 
                          : 'bg-neutral-800 text-orange-500 border-neutral-700'
                      }`}>
                         {item.time}
                      </div>
                      <div className='flex-1'>
                         <p className={`font-bold text-sm ${item.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                            {item.client}
                         </p>
                         <p className='text-xs text-gray-500'>{item.type}</p>
                      </div>
                      {item.status !== 'completed' && (
                        <button className='p-2 hover:bg-green-500/20 text-gray-500 hover:text-green-500 rounded-full transition-colors'>
                           <CheckCircle2 size={18} />
                        </button>
                      )}
                   </div>
                ))}
                
                {/* Empty slots visual */}
                <div className='p-4 border border-dashed border-neutral-700 rounded-lg text-center'>
                   <p className='text-xs text-gray-500'>No more sessions scheduled for today.</p>
                   <button className='mt-2 text-xs font-bold text-orange-500 hover:text-orange-400'>
                      + Add Appointment
                   </button>
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default CoachDashboard