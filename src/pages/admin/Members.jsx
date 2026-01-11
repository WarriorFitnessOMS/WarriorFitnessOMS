import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Check } from 'lucide-react'

const Members = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [newMemberForm, setNewMemberForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    plan: 'Standard',
    validity: '1month'
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const [members, setMembers] = useState([
    {
      id: 'M001',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      plan: 'Premium',
      joinDate: '2024-06-15',
      expiryDate: '2025-06-15',
      status: 'active',
      todayAttendance: 'Present',
      attendanceHistory: [
        { date: '2024-01-10', status: 'Present' },
        { date: '2024-01-09', status: 'Absent' },
        { date: '2024-01-08', status: 'Present' }
      ]
    },
    {
      id: 'M002',
      fullName: 'Sarah Lee',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678',
      plan: 'Standard',
      joinDate: '2023-12-01',
      expiryDate: '2025-01-05',
      status: 'active',
      todayAttendance: 'Not Marked',
      attendanceHistory: [{ date: '2024-01-08', status: 'Present' }]
    },
    {
      id: 'M003',
      fullName: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      plan: 'Basic',
      joinDate: '2024-11-15',
      expiryDate: '2024-12-15',
      status: 'expired',
      todayAttendance: 'N/A',
      attendanceHistory: []
    },
    {
      id: 'M004',
      fullName: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 456-7890',
      plan: 'Premium',
      joinDate: '2024-05-20',
      expiryDate: '2025-02-10',
      status: 'active',
      todayAttendance: 'Present',
      attendanceHistory: [{ date: '2024-01-10', status: 'Present' }]
    },
    {
      id: 'M005',
      fullName: 'Robert Wilson',
      email: 'robert@example.com',
      phone: '+1 (555) 567-8901',
      plan: 'Standard',
      joinDate: '2024-08-10',
      expiryDate: '2025-01-20',
      status: 'suspended',
      todayAttendance: 'N/A',
      attendanceHistory: []
    }
  ])

  const filteredMembers = members.filter(member => {
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    const matchesSearch = 
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    expiring: members.filter(m => {
      const days = Math.ceil((new Date(m.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
      return m.status === 'active' && days <= 30 && days > 0
    }).length
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

  const handleMarkAttendance = (memberId) => {
    setMembers(prev => prev.map(member => {
      if (member.id === memberId && member.status === 'active') {
        const today = new Date().toISOString().split('T')[0]
        const alreadyMarked = member.attendanceHistory.some(a => a.date === today)
        
        if (!alreadyMarked) {
          return {
            ...member,
            todayAttendance: 'Present',
            attendanceHistory: [{ date: today, status: 'Present' }, ...member.attendanceHistory]
          }
        }
      }
      return member
    }))
  }

  const handleAddMember = () => {
    if (newMemberForm.fullName && newMemberForm.email && newMemberForm.phone) {
      const joinDate = new Date()
      const expiryDate = new Date()
      
      if (newMemberForm.validity === '1month') expiryDate.setMonth(expiryDate.getMonth() + 1)
      else if (newMemberForm.validity === '3months') expiryDate.setMonth(expiryDate.getMonth() + 3)
      else if (newMemberForm.validity === '6months') expiryDate.setMonth(expiryDate.getMonth() + 6)
      else if (newMemberForm.validity === '1year') expiryDate.setFullYear(expiryDate.getFullYear() + 1)

      const newMember = {
        id: `M${String(members.length + 1).padStart(3, '0')}`,
        fullName: newMemberForm.fullName,
        email: newMemberForm.email,
        phone: newMemberForm.phone,
        plan: newMemberForm.plan,
        joinDate: joinDate.toISOString().split('T')[0],
        expiryDate: expiryDate.toISOString().split('T')[0],
        status: 'active',
        todayAttendance: 'Not Marked',
        attendanceHistory: []
      }

      setMembers([newMember, ...members])
      setNewMemberForm({ fullName: '', email: '', phone: '', plan: 'Standard', validity: '1month' })
      setShowAddForm(false)
    }
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
      <motion.div variants={itemVariants} className='mb-8 pt-4 flex justify-between items-start'>
        <div>
          <h1 className='text-4xl font-bold'>
            <span className='text-orange-500'>Members</span>
            <span className='text-white'> Management</span>
          </h1>
          <p className='text-gray-400 text-sm mt-2'>Manage gym members, plans, and attendance</p>
        </div>
        <motion.button
          onClick={() => setShowAddForm(true)}
          className='flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Member
        </motion.button>
      </motion.div>

      {/* STATS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-blue-500'>
          <p className='text-blue-400 text-sm font-semibold'>Total Members</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.total}</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-green-500'>
          <p className='text-green-400 text-sm font-semibold'>Active Members</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.active}</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-yellow-500'>
          <p className='text-yellow-400 text-sm font-semibold'>Expiring Soon</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.expiring}</p>
        </div>
      </motion.div>

      {/* SEARCH & FILTER */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='text-gray-400 text-sm mb-2 block font-semibold'>Search</label>
            <input
              type='text'
              placeholder='Search by name, ID, or phone...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            />
          </div>
          <div>
            <label className='text-gray-400 text-sm mb-2 block font-semibold'>Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            >
              <option value='all'>All Members</option>
              <option value='active'>Active</option>
              <option value='expired'>Expired</option>
              <option value='suspended'>Suspended</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* ADD MEMBER MODAL */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-neutral-800 rounded-lg border border-orange-500/20 p-8 w-full max-w-md'
          >
            <h2 className='text-2xl font-bold text-orange-500 mb-6'>Add New Member</h2>
            <div className='space-y-4'>
              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Full Name</label>
                <input
                  type='text'
                  placeholder='Enter full name'
                  value={newMemberForm.fullName}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, fullName: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                />
              </div>
              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Email</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                />
              </div>
              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Phone</label>
                <input
                  type='tel'
                  placeholder='Enter phone number'
                  value={newMemberForm.phone}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                />
              </div>
              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Plan</label>
                <select
                  value={newMemberForm.plan}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, plan: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                >
                  <option value='Basic'>Basic</option>
                  <option value='Standard'>Standard</option>
                  <option value='Premium'>Premium</option>
                </select>
              </div>
              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Validity</label>
                <select
                  value={newMemberForm.validity}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, validity: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                >
                  <option value='1month'>1 Month</option>
                  <option value='3months'>3 Months</option>
                  <option value='6months'>6 Months</option>
                  <option value='1year'>1 Year</option>
                </select>
              </div>
            </div>
            <div className='flex gap-3 mt-6'>
              <motion.button
                onClick={handleAddMember}
                disabled={!newMemberForm.fullName || !newMemberForm.email || !newMemberForm.phone}
                className='flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-semibold'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Member
              </motion.button>
              <motion.button
                onClick={() => setShowAddForm(false)}
                className='flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* MEMBERS TABLE */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg border border-orange-500/20 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-orange-500/20 bg-neutral-700/50'>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Member</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>ID</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Plan</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Expiry</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Status</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className='border-b border-neutral-700 hover:bg-neutral-700/50'>
                  <td className='py-4 px-6 text-sm'>
                    <p className='text-white font-semibold'>{member.fullName}</p>
                    <p className='text-gray-400 text-xs'>{member.email}</p>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-300'>{member.id}</td>
                  <td className='py-4 px-6 text-sm'>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${getPlanColor(member.plan)}`}>
                      {member.plan}
                    </span>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-300'>{member.expiryDate}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Members