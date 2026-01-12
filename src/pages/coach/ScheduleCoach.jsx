/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  MoreVertical, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  User,
  Search
} from 'lucide-react'

const ScheduleCoach = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  // Mock Data: Sessions for the day
  // Some are 'past' (need attendance), some are 'upcoming'
  const [sessions, setSessions] = useState([
    {
      id: 1,
      time: "08:00 AM",
      client: "Mike Ross",
      type: "PT Session",
      location: "Main Gym Floor",
      status: "pending_attendance", // This session happened, but coach hasn't marked it yet
      duration: "60 min"
    },
    {
      id: 2,
      time: "10:00 AM",
      client: "Group Class",
      type: "HIIT Circuit",
      location: "Studio B",
      status: "completed", // Already marked as Present
      attendanceStatus: "present",
      attendees: 12,
      duration: "45 min"
    },
    {
      id: 3,
      time: "02:00 PM",
      client: "Sarah Smith",
      type: "Consultation",
      location: "Office 1",
      status: "upcoming", // In the future
      duration: "30 min"
    },
    {
      id: 4,
      time: "04:30 PM",
      client: "John Doe",
      type: "PT Session",
      location: "Weight Room",
      status: "upcoming",
      duration: "60 min"
    }
  ])

  // New Session Form
  const [newSession, setNewSession] = useState({ client: '', type: 'PT Session', time: '', duration: '60 min' })

  // Handlers
  const handleMarkAttendance = (id, status) => {
    setSessions(sessions.map(s => 
      s.id === id ? { ...s, status: 'completed', attendanceStatus: status } : s
    ))
  }

  const handleAddSession = (e) => {
    e.preventDefault()
    const session = {
      id: Date.now(),
      ...newSession,
      status: 'upcoming',
      location: 'Main Gym Floor'
    }
    setSessions([...sessions, session].sort((a, b) => a.time.localeCompare(b.time)))
    setIsAddModalOpen(false)
    setNewSession({ client: '', type: 'PT Session', time: '', duration: '60 min' })
  }

  // --- Date Strip Helper ---
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      dates.push(d)
    }
    return dates
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
            <h1 className='text-3xl font-bold text-white'>Schedule & Attendance</h1>
            <p className='text-gray-400 mt-1'>Manage your sessions and track student presence</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all'
          >
            <Plus size={20} /> Add Session
          </button>
        </div>

        {/* DATE SELECTOR STRIP */}
        <div className='flex gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar'>
          {generateDates().map((date, idx) => {
             const isSelected = date.getDate() === selectedDate.getDate()
             return (
               <button 
                 key={idx}
                 onClick={() => setSelectedDate(date)}
                 className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-2xl border transition-all ${
                   isSelected 
                     ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                     : 'bg-neutral-800 border-neutral-700 text-gray-500 hover:border-gray-500'
                 }`}
               >
                 <span className='text-xs font-bold uppercase'>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                 <span className='text-2xl font-bold'>{date.getDate()}</span>
               </button>
             )
          })}
        </div>
      </motion.div>

      {/* PENDING ATTENDANCE ALERT */}
      {sessions.some(s => s.status === 'pending_attendance') && (
        <motion.div variants={itemVariants} className='mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-3 text-yellow-500'>
          <AlertCircle size={24} />
          <div>
            <p className='font-bold text-sm'>Attendance Required</p>
            <p className='text-xs opacity-80'>You have sessions from earlier today that need marking.</p>
          </div>
        </motion.div>
      )}

      {/* TIMELINE LIST */}
      <motion.div variants={itemVariants} className='space-y-4'>
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className={`relative pl-4 md:pl-0 md:flex gap-6 group ${
               session.status === 'pending_attendance' ? 'opacity-100' : 'opacity-100'
            }`}
          >
            {/* Time Column (Desktop) */}
            <div className='hidden md:block w-24 text-right pt-4'>
               <p className='font-bold text-white'>{session.time}</p>
               <p className='text-xs text-gray-500'>{session.duration}</p>
            </div>

            {/* Session Card */}
            <div className={`flex-1 rounded-2xl border p-5 transition-all ${
               session.status === 'pending_attendance' 
                 ? 'bg-neutral-800 border-yellow-500/50 shadow-[0_0_15px_-3px_rgba(234,179,8,0.15)]' // Highlight pending
                 : 'bg-neutral-800 border-neutral-700'
            }`}>
               <div className='flex justify-between items-start mb-3'>
                  <div className='md:hidden mb-2'>
                     <span className='font-bold text-white'>{session.time}</span>
                     <span className='text-xs text-gray-500 ml-2'>({session.duration})</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                        session.type === 'PT Session' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 'text-purple-400 bg-purple-400/10 border-purple-400/20'
                     }`}>
                        {session.type}
                     </span>
                  </div>
                  <button className='text-gray-500 hover:text-white'>
                     <MoreVertical size={18} />
                  </button>
               </div>

               <div className='flex justify-between items-end'>
                  <div>
                     <h3 className='font-bold text-xl text-white mb-1 flex items-center gap-2'>
                        {session.client}
                        {session.attendees && <span className='text-xs font-normal text-gray-500'>({session.attendees} attendees)</span>}
                     </h3>
                     <p className='text-xs text-gray-400 flex items-center gap-1'>
                        <MapPin size={12} /> {session.location}
                     </p>
                  </div>

                  {/* ACTION AREA: The Logic Magick */}
                  <div>
                     {session.status === 'upcoming' && (
                        <span className='text-xs font-bold text-gray-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-700'>
                           Scheduled
                        </span>
                     )}

                     {session.status === 'pending_attendance' && (
                        <div className='flex gap-2'>
                           <button 
                             onClick={() => handleMarkAttendance(session.id, 'present')}
                             className='flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors'
                           >
                             <CheckCircle2 size={14} /> Present
                           </button>
                           <button 
                             onClick={() => handleMarkAttendance(session.id, 'absent')}
                             className='flex items-center gap-1 bg-neutral-700 hover:bg-red-500 hover:text-white text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors'
                           >
                             <XCircle size={14} /> Absent
                           </button>
                        </div>
                     )}

                     {session.status === 'completed' && (
                        <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border ${
                           session.attendanceStatus === 'present' 
                             ? 'text-green-500 bg-green-500/10 border-green-500/20' 
                             : 'text-red-500 bg-red-500/10 border-red-500/20'
                        }`}>
                           {session.attendanceStatus === 'present' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                           {session.attendanceStatus === 'present' ? 'Marked Present' : 'Marked Absent'}
                        </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ADD SESSION MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-neutral-800 w-full max-w-md rounded-2xl border border-neutral-700 p-6'
              onClick={e => e.stopPropagation()}
            >
              <h3 className='font-bold text-xl mb-4'>Schedule New Session</h3>
              <form onSubmit={handleAddSession} className='space-y-4'>
                 <div>
                    <label className='text-xs font-bold text-gray-400 uppercase'>Client Name</label>
                    <input 
                      required
                      type="text" 
                      className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white mt-1 outline-none focus:border-orange-500'
                      value={newSession.client}
                      onChange={e => setNewSession({...newSession, client: e.target.value})}
                      placeholder="e.g. Mike Ross"
                    />
                 </div>
                 <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='text-xs font-bold text-gray-400 uppercase'>Time</label>
                      <input 
                        required
                        type="time" 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white mt-1 outline-none focus:border-orange-500'
                        value={newSession.time}
                        onChange={e => setNewSession({...newSession, time: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className='text-xs font-bold text-gray-400 uppercase'>Type</label>
                      <select 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white mt-1 outline-none focus:border-orange-500'
                        value={newSession.type}
                        onChange={e => setNewSession({...newSession, type: e.target.value})}
                      >
                         <option>PT Session</option>
                         <option>Consultation</option>
                         <option>Check-in</option>
                      </select>
                    </div>
                 </div>
                 <button 
                   type="submit" 
                   className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl mt-2 transition-all'
                 >
                    Confirm Booking
                 </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ScheduleCoach