import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

const Coaches = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  const [newCoach, setNewCoach] = useState({
    name: '',
    phone: '',
    email: '',
    specialization: 'Weight Training',
    availability: 'Morning'
  })

  const [coaches, setCoaches] = useState([
    {
      id: 'C001',
      name: 'Alex Turner',
      phone: '+1 (555) 123-4567',
      email: 'alex@gym.com',
      specialization: 'Weight Training',
      availability: '6:00 AM - 12:00 PM',
      assignedMembers: 18,
      status: 'active'
    },
    {
      id: 'C002',
      name: 'Emily Clark',
      phone: '+1 (555) 234-5678',
      email: 'emily@gym.com',
      specialization: 'Yoga',
      availability: '5:00 PM - 9:00 PM',
      assignedMembers: 10,
      status: 'active'
    },
    {
      id: 'C003',
      name: 'Mark Lee',
      phone: '+1 (555) 345-6789',
      email: 'mark@gym.com',
      specialization: 'Cardio',
      availability: '6:00 AM - 9:00 PM',
      assignedMembers: 15,
      status: 'inactive'
    },
    {
      id: 'C004',
      name: 'Sarah Johnson',
      phone: '+1 (555) 456-7890',
      email: 'sarah@gym.com',
      specialization: 'CrossFit',
      availability: '6:00 AM - 12:00 PM',
      assignedMembers: 12,
      status: 'active'
    }
  ])

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = 
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || coach.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: coaches.length,
    active: coaches.filter(c => c.status === 'active').length
  }

  const handleAddCoach = () => {
    if (!newCoach.name || !newCoach.phone || !newCoach.email) return

    const coach = {
      id: `C${String(coaches.length + 1).padStart(3, '0')}`,
      name: newCoach.name,
      phone: newCoach.phone,
      email: newCoach.email,
      specialization: newCoach.specialization,
      availability: newCoach.availability,
      assignedMembers: 0,
      status: 'active'
    }

    setCoaches([coach, ...coaches])
    setShowAddForm(false)
    setNewCoach({
      name: '',
      phone: '',
      email: '',
      specialization: 'Weight Training',
      availability: 'Morning'
    })
  }

  const toggleStatus = (id) => {
    setCoaches(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
          : c
      )
    )
  }

  const deleteCoach = (id) => {
    setCoaches(prev => prev.filter(c => c.id !== id))
  }

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-500/20 text-green-400'
      : 'bg-red-500/20 text-red-400'
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
            <span className='text-orange-500'>Coaches</span>
            <span className='text-white'> Management</span>
          </h1>
          <p className='text-gray-400 text-sm mt-2'>Manage gym coaches and their assignments</p>
        </div>
        <motion.button
          onClick={() => setShowAddForm(true)}
          className='flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Coach
        </motion.button>
      </motion.div>

      {/* STATS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-blue-500'>
          <p className='text-blue-400 text-sm font-semibold'>Total Coaches</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.total}</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-green-500'>
          <p className='text-green-400 text-sm font-semibold'>Active Coaches</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.active}</p>
        </div>
      </motion.div>

      {/* SEARCH & FILTER */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='text-gray-400 text-sm mb-2 block font-semibold'>Search</label>
            <div className='relative'>
              <Search size={18} className='absolute left-3 top-3 text-gray-500' />
              <input
                type='text'
                placeholder='Search by name or specialization...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
              />
            </div>
          </div>
          <div>
            <label className='text-gray-400 text-sm mb-2 block font-semibold'>Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            >
              <option value='all'>All Coaches</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* COACHES TABLE */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg border border-orange-500/20 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-orange-500/20 bg-neutral-700/50'>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Coach</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Specialization</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Availability</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Members</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Status</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoaches.map((coach) => (
                <tr key={coach.id} className='border-b border-neutral-700 hover:bg-neutral-700/50'>
                  <td className='py-4 px-6 text-sm'>
                    <p className='text-white font-semibold'>{coach.name}</p>
                    <p className='text-gray-400 text-xs'>{coach.email}</p>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-300'>{coach.specialization}</td>
                  <td className='py-4 px-6 text-sm text-gray-300'>{coach.availability}</td>
                  <td className='py-4 px-6 text-sm text-gray-300'>{coach.assignedMembers}</td>
                  <td className='py-4 px-6 text-sm'>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${getStatusColor(coach.status)}`}>
                      {coach.status.charAt(0).toUpperCase() + coach.status.slice(1)}
                    </span>
                  </td>
                  <td className='py-4 px-6 text-sm flex items-center gap-2'>
                    <motion.button
                      onClick={() => toggleStatus(coach.id)}
                      className={`px-4 py-2 rounded text-xs font-semibold min-w-24 text-center ${
                        coach.status === 'active'
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {coach.status === 'active' ? 'Deactivate' : 'Activate'}
                    </motion.button>
                    <motion.button
                      onClick={() => deleteCoach(coach.id)}
                      className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 min-w-24'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 size={14} />
                      Delete
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ADD COACH MODAL */}
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
            <h2 className='text-2xl font-bold text-orange-500 mb-6'>Add New Coach</h2>

            <div className='space-y-4'>
              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Full Name</label>
                <input
                  type='text'
                  placeholder='Enter coach name'
                  value={newCoach.name}
                  onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                />
              </div>

              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Email</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={newCoach.email}
                  onChange={(e) => setNewCoach({ ...newCoach, email: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                />
              </div>

              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Phone</label>
                <input
                  type='tel'
                  placeholder='Enter phone number'
                  value={newCoach.phone}
                  onChange={(e) => setNewCoach({ ...newCoach, phone: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                />
              </div>

              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Specialization</label>
                <select
                  value={newCoach.specialization}
                  onChange={(e) => setNewCoach({ ...newCoach, specialization: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                >
                  <option value='Weight Training'>Weight Training</option>
                  <option value='Cardio'>Cardio</option>
                  <option value='Yoga'>Yoga</option>
                  <option value='CrossFit'>CrossFit</option>
                  <option value='Pilates'>Pilates</option>
                </select>
              </div>

              <div>
                <label className='text-gray-400 text-sm mb-2 block font-semibold'>Availability</label>
                <input
                  type='text'
                  placeholder='e.g., 6:00 AM - 12:00 PM'
                  value={newCoach.availability}
                  onChange={(e) => setNewCoach({ ...newCoach, availability: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                />
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              <motion.button
                onClick={handleAddCoach}
                disabled={!newCoach.name || !newCoach.email || !newCoach.phone}
                className='flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-semibold'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Coach
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
    </motion.div>
  )
}

export default Coaches