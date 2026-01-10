import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, X, Mail, Phone, Calendar, User } from 'lucide-react'

const Approvals = () => {
  const [expandedId, setExpandedId] = useState(null)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock registration requests from public form
  const [requests, setRequests] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      fitnessGoal: 'Muscle Gain',
      experienceLevel: 'Beginner',
      currentConditions: ['None'],
      pastSurgeries: 'None',
      medications: 'None',
      allergies: 'None',
      pastGymExperience: 'Never trained',
      workoutFrequency: '3-4 days/week',
      dietaryRestrictions: 'None',
      sleepHours: '7',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '+1 (555) 987-6543',
      relationship: 'Spouse',
      submittedAt: '2024-11-20',
      status: 'pending'
    },
    {
      id: 2,
      fullName: 'Sarah Lee',
      email: 'sarah.lee@example.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1995-08-22',
      gender: 'Female',
      fitnessGoal: 'Weight Loss',
      experienceLevel: 'Intermediate',
      currentConditions: ['High Blood Pressure'],
      pastSurgeries: 'Knee surgery 2022',
      medications: 'Lisinopril',
      allergies: 'Penicillin',
      pastGymExperience: 'Trained 1-2 years ago',
      workoutFrequency: '5-6 days/week',
      dietaryRestrictions: 'Gluten-free',
      sleepHours: '8',
      emergencyContactName: 'Mike Lee',
      emergencyContactPhone: '+1 (555) 876-5432',
      relationship: 'Brother',
      submittedAt: '2024-11-19',
      status: 'pending'
    },
    {
      id: 3,
      fullName: 'Omar Garcia',
      email: 'omar.garcia@example.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1988-03-10',
      gender: 'Male',
      fitnessGoal: 'Strength Training',
      experienceLevel: 'Advanced',
      currentConditions: ['None'],
      pastSurgeries: 'None',
      medications: 'None',
      allergies: 'None',
      pastGymExperience: 'Actively training',
      workoutFrequency: 'Daily',
      dietaryRestrictions: 'Vegan',
      sleepHours: '9',
      emergencyContactName: 'Rosa Garcia',
      emergencyContactPhone: '+1 (555) 765-4321',
      relationship: 'Mother',
      submittedAt: '2024-11-18',
      status: 'approved'
    }
  ])

  // Filter requests
  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter
    const matchesSearch = req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleApprove = (id) => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ))
    setExpandedId(null)
  }

  const handleReject = (id) => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ))
    setExpandedId(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.div
      className='w-full min-h-screen bg-neutral-900 text-white pb-8'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className='mb-8'>
        <h1 className='text-4xl font-bold text-orange-500'>Registration Requests</h1>
        <p className='text-gray-400 text-sm mt-2'>Review and approve/reject new member registration requests</p>
      </motion.div>

      {/* STATS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-yellow-500'>
          <p className='text-yellow-400 text-3xl font-bold'>{requests.filter(r => r.status === 'pending').length}</p>
          <p className='text-white font-semibold text-sm mt-1'>Pending Requests</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-green-500'>
          <p className='text-green-400 text-3xl font-bold'>{requests.filter(r => r.status === 'approved').length}</p>
          <p className='text-white font-semibold text-sm mt-1'>Approved</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-red-500'>
          <p className='text-red-400 text-3xl font-bold'>{requests.filter(r => r.status === 'rejected').length}</p>
          <p className='text-white font-semibold text-sm mt-1'>Rejected</p>
        </div>
      </motion.div>

      {/* FILTERS */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* SEARCH */}
          <div>
            <label className='text-gray-400 text-sm mb-2 block'>Search by name or email</label>
            <input
              type='text'
              placeholder='Search requests...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            />
          </div>

          {/* STATUS FILTER */}
          <div>
            <label className='text-gray-400 text-sm mb-2 block'>Filter by status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            >
              <option value='all'>All Requests</option>
              <option value='pending'>Pending</option>
              <option value='approved'>Approved</option>
              <option value='rejected'>Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* REQUESTS LIST */}
      <motion.div variants={itemVariants} className='space-y-4'>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              className='bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden'
              layout
            >
              {/* REQUEST HEADER */}
              <motion.button
                onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                className='w-full p-6 flex items-center justify-between hover:bg-neutral-700/50 transition-all'
              >
                <div className='flex items-center gap-4 flex-1'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold'>
                    {request.fullName.charAt(0)}
                  </div>
                  <div className='text-left flex-1'>
                    <p className='text-white font-semibold'>{request.fullName}</p>
                    <p className='text-gray-400 text-sm'>{request.email}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === request.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className='ml-4'
                >
                  <ChevronDown size={20} className='text-orange-500' />
                </motion.div>
              </motion.button>

              {/* EXPANDED DETAILS */}
              <AnimatePresence>
                {expandedId === request.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='border-t border-neutral-700 overflow-hidden'
                  >
                    <div className='p-6 bg-neutral-800/50 space-y-6'>
                      {/* PERSONAL INFO */}
                      <div>
                        <h3 className='text-orange-500 font-bold mb-4'>Personal Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='flex items-center gap-3'>
                            <User size={18} className='text-orange-500' />
                            <div>
                              <p className='text-gray-400 text-sm'>Full Name</p>
                              <p className='text-white'>{request.fullName}</p>
                            </div>
                          </div>
                          <div className='flex items-center gap-3'>
                            <Mail size={18} className='text-orange-500' />
                            <div>
                              <p className='text-gray-400 text-sm'>Email</p>
                              <p className='text-white'>{request.email}</p>
                            </div>
                          </div>
                          <div className='flex items-center gap-3'>
                            <Phone size={18} className='text-orange-500' />
                            <div>
                              <p className='text-gray-400 text-sm'>Phone</p>
                              <p className='text-white'>{request.phone}</p>
                            </div>
                          </div>
                          <div className='flex items-center gap-3'>
                            <Calendar size={18} className='text-orange-500' />
                            <div>
                              <p className='text-gray-400 text-sm'>Date of Birth</p>
                              <p className='text-white'>{request.dateOfBirth}</p>
                            </div>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Gender</p>
                            <p className='text-white'>{request.gender}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Submitted On</p>
                            <p className='text-white'>{request.submittedAt}</p>
                          </div>
                        </div>
                      </div>

                      {/* FITNESS INFO */}
                      <div>
                        <h3 className='text-orange-500 font-bold mb-4'>Fitness Profile</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div>
                            <p className='text-gray-400 text-sm'>Fitness Goal</p>
                            <p className='text-white'>{request.fitnessGoal}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Experience Level</p>
                            <p className='text-white'>{request.experienceLevel}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Gym Experience</p>
                            <p className='text-white'>{request.pastGymExperience}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Workout Frequency</p>
                            <p className='text-white'>{request.workoutFrequency}</p>
                          </div>
                        </div>
                      </div>

                      {/* HEALTH INFO */}
                      <div>
                        <h3 className='text-orange-500 font-bold mb-4'>Health Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div>
                            <p className='text-gray-400 text-sm'>Current Conditions</p>
                            <p className='text-white'>{request.currentConditions.join(', ')}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Medications</p>
                            <p className='text-white'>{request.medications || 'None'}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Allergies</p>
                            <p className='text-white'>{request.allergies || 'None'}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Sleep Hours/Night</p>
                            <p className='text-white'>{request.sleepHours} hours</p>
                          </div>
                        </div>
                      </div>

                      {/* EMERGENCY CONTACT */}
                      <div>
                        <h3 className='text-orange-500 font-bold mb-4'>Emergency Contact</h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                          <div>
                            <p className='text-gray-400 text-sm'>Name</p>
                            <p className='text-white'>{request.emergencyContactName}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Phone</p>
                            <p className='text-white'>{request.emergencyContactPhone}</p>
                          </div>
                          <div>
                            <p className='text-gray-400 text-sm'>Relationship</p>
                            <p className='text-white'>{request.relationship}</p>
                          </div>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      {request.status === 'pending' && (
                        <div className='flex gap-4 pt-6 border-t border-neutral-700'>
                          <motion.button
                            onClick={() => handleApprove(request.id)}
                            className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Check size={18} />
                            Approve
                          </motion.button>
                          <motion.button
                            onClick={() => handleReject(request.id)}
                            className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X size={18} />
                            Reject
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className='bg-neutral-800 rounded-lg p-12 text-center'>
            <p className='text-gray-400'>No requests found</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Approvals