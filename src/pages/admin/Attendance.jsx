import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Check, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react'

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)) // January 2026

  const [members, setMembers] = useState([
    {
      id: 'M001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      plan: 'Premium',
      status: 'active',
      todayAttendance: 'Not Marked',
      history: [
        { date: '2026-01-10', status: 'Present' },
        { date: '2026-01-09', status: 'Present' },
        { date: '2026-01-08', status: 'Absent' },
        { date: '2026-01-07', status: 'Present' },
        { date: '2026-01-06', status: 'Present' },
        { date: '2026-01-03', status: 'Present' },
        { date: '2026-01-02', status: 'Absent' },
        { date: '2026-01-01', status: 'Present' }
      ]
    },
    {
      id: 'M002',
      name: 'Sarah Lee',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678',
      plan: 'Standard',
      status: 'active',
      todayAttendance: 'Not Marked',
      history: [
        { date: '2026-01-10', status: 'Present' },
        { date: '2026-01-09', status: 'Absent' },
        { date: '2026-01-08', status: 'Present' },
        { date: '2026-01-07', status: 'Absent' },
        { date: '2026-01-06', status: 'Present' },
        { date: '2026-01-05', status: 'Present' },
        { date: '2026-01-02', status: 'Present' }
      ]
    },
    {
      id: 'M003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      plan: 'Basic',
      status: 'expired',
      todayAttendance: 'N/A',
      history: [
        { date: '2026-01-05', status: 'Present' },
        { date: '2026-01-04', status: 'Present' },
        { date: '2026-01-03', status: 'Absent' }
      ]
    },
    {
      id: 'M004',
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 456-7890',
      plan: 'Premium',
      status: 'active',
      todayAttendance: 'Present',
      history: [
        { date: '2026-01-10', status: 'Present' },
        { date: '2026-01-09', status: 'Present' },
        { date: '2026-01-08', status: 'Present' },
        { date: '2026-01-07', status: 'Present' },
        { date: '2026-01-06', status: 'Present' },
        { date: '2026-01-05', status: 'Present' },
        { date: '2026-01-03', status: 'Present' },
        { date: '2026-01-02', status: 'Present' },
        { date: '2026-01-01', status: 'Present' }
      ]
    },
    {
      id: 'M005',
      name: 'Robert Wilson',
      email: 'robert@example.com',
      phone: '+1 (555) 567-8901',
      plan: 'Standard',
      status: 'suspended',
      todayAttendance: 'N/A',
      history: [
        { date: '2026-01-08', status: 'Present' },
        { date: '2026-01-07', status: 'Absent' },
        { date: '2026-01-05', status: 'Present' }
      ]
    }
  ])

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  )

  const stats = {
    total: members.filter(m => m.status === 'active').length,
    marked: members.filter(m => m.todayAttendance === 'Present').length,
    notMarked: members.filter(m => m.status === 'active' && m.todayAttendance === 'Not Marked').length
  }

  const handleMarkAttendance = (memberId) => {
    setMembers(prev =>
      prev.map(member => {
        if (member.id === memberId && member.status === 'active') {
          return { ...member, todayAttendance: 'Present' }
        }
        return member
      })
    )
  }

  const handleViewHistory = (member) => {
    setSelectedMember(member)
    setShowHistory(true)
    setCurrentMonth(new Date(2026, 0, 1))
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Premium':
        return 'bg-orange-500/20 text-orange-300'
      case 'Standard':
        return 'bg-blue-500/20 text-blue-300'
      case 'Basic':
        return 'bg-gray-500/20 text-gray-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400'
      case 'expired':
        return 'bg-red-500/20 text-red-400'
      case 'suspended':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const getAttendanceForDate = (date) => {
    if (!selectedMember) return null
    const dateStr = date.toISOString().split('T')[0]
    return selectedMember.history.find(h => h.date === dateStr)
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className='aspect-square'></div>)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const attendance = getAttendanceForDate(date)
      
      days.push(
        <div
          key={day}
          className={`aspect-square border border-neutral-600 rounded-lg flex flex-col items-center justify-center p-2 ${
            attendance
              ? attendance.status === 'Present'
                ? 'bg-green-500/20 border-green-500'
                : 'bg-red-500/20 border-red-500'
              : 'bg-neutral-700/30'
          }`}
        >
          <span className='text-sm font-semibold text-white'>{day}</span>
          {attendance && (
            <span className={`text-xs mt-1 ${
              attendance.status === 'Present' ? 'text-green-400' : 'text-red-400'
            }`}>
              {attendance.status === 'Present' ? '✓' : '✗'}
            </span>
          )}
        </div>
      )
    }
    
    return days
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.div
      className='w-full min-h-screen bg-neutral-900 text-white pb-8 px-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className='mb-8 pt-4'>
        <h1 className='text-4xl font-bold'>
          <span className='text-orange-500'>Members</span>
          <span className='text-white'> Attendance</span>
        </h1>
        <p className='text-gray-400 text-sm mt-2'>Mark member attendance for today</p>
      </motion.div>

      {/* STATS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-blue-500'>
          <p className='text-blue-400 text-sm font-semibold'>Active Members</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.total}</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-green-500'>
          <p className='text-green-400 text-sm font-semibold'>Marked Present</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.marked}</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-yellow-500'>
          <p className='text-yellow-400 text-sm font-semibold'>Not Marked</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.notMarked}</p>
        </div>
      </motion.div>

      {/* SEARCH */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20 mb-8'>
        <label className='text-gray-400 text-sm mb-2 block font-semibold'>Search Member</label>
        <div className='relative'>
          <Search size={18} className='absolute left-3 top-3 text-gray-500' />
          <input
            type='text'
            placeholder='Search by name, ID, or phone...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
          />
        </div>
      </motion.div>

      {/* ATTENDANCE TABLE */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg border border-orange-500/20 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-orange-500/20 bg-neutral-700/50'>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Member</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>ID</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Plan</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Status</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Today</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>History</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className='border-b border-neutral-700 hover:bg-neutral-700/50'>
                  <td className='py-4 px-6 text-sm'>
                    <p className='text-white font-semibold'>{member.name}</p>
                    <p className='text-gray-400 text-xs'>{member.email}</p>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-300'>{member.id}</td>
                  <td className='py-4 px-6 text-sm'>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${getPlanColor(member.plan)}`}>
                      {member.plan}
                    </span>
                  </td>
                  <td className='py-4 px-6 text-sm'>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${getStatusColor(member.status)}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className='py-4 px-6 text-sm'>
                    <motion.button
                      onClick={() => handleMarkAttendance(member.id)}
                      disabled={member.status !== 'active' || member.todayAttendance === 'Present'}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                        member.status !== 'active' || member.todayAttendance === 'Present'
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={member.status !== 'active' ? 'Only active members' : member.todayAttendance === 'Present' ? 'Already marked' : 'Mark attendance'}
                    >
                      <Check size={18} />
                      {member.todayAttendance === 'Present' ? 'Marked' : 'Mark'}
                    </motion.button>
                  </td>
                  <td className='py-4 px-6 text-sm'>
                    <motion.button
                      onClick={() => handleViewHistory(member)}
                      className='px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Clock size={18} />
                      View
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CALENDAR MODAL */}
      {showHistory && selectedMember && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4' onClick={() => setShowHistory(false)}>
          <motion.div
            className='bg-neutral-800 rounded-lg border border-orange-500/20 max-w-2xl w-full max-h-[90vh] overflow-hidden'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='bg-neutral-700/50 p-6 border-b border-orange-500/20 flex justify-between items-start'>
              <div>
                <h2 className='text-xl font-bold text-white'>{selectedMember.name}</h2>
                <p className='text-gray-400 text-sm mt-1'>Monthly Attendance Calendar</p>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <X size={24} />
              </button>
            </div>

            {/* Calendar Controls */}
            <div className='p-6 border-b border-neutral-700'>
              <div className='flex items-center justify-between'>
                <button
                  onClick={previousMonth}
                  className='p-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white'
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className='text-lg font-bold text-white'>
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={nextMonth}
                  className='p-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white'
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className='p-6 overflow-y-auto max-h-[calc(90vh-220px)]'>
              {/* Day headers */}
              <div className='grid grid-cols-7 gap-2 mb-2'>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className='text-center text-gray-400 text-sm font-semibold py-2'>
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className='grid grid-cols-7 gap-2'>
                {renderCalendar()}
              </div>

              {/* Legend */}
              <div className='mt-6 flex gap-4 justify-center'>
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 rounded bg-green-500/20 border border-green-500'></div>
                  <span className='text-sm text-gray-400'>Present</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 rounded bg-red-500/20 border border-red-500'></div>
                  <span className='text-sm text-gray-400'>Absent</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 rounded bg-neutral-700/30 border border-neutral-600'></div>
                  <span className='text-sm text-gray-400'>No Record</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default Attendance