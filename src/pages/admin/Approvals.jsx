/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, X, Mail, Phone, Calendar, User, AlertCircle, Heart, Dumbbell, Clock } from 'lucide-react'

const Approvals = () => {
  const [expandedId, setExpandedId] = useState(null)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')

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

  const getExperienceBadgeColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-500/20 text-blue-300'
      case 'Intermediate':
        return 'bg-purple-500/20 text-purple-300'
      case 'Advanced':
        return 'bg-orange-500/20 text-orange-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  const hasHealthConcerns = (req) => {
    return req.currentConditions[0] !== 'None' || req.medications !== 'None' || req.allergies !== 'None' || req.pastSurgeries !== 'None'
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
      className='w-full min-h-screen bg-neutral-900 text-white pb-8 px-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className='mb-8 pt-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold'>
              <span className='text-orange-500'>Registration</span>
              <span className='text-white'> Requests</span>
            </h1>
            <p className='text-gray-400 text-sm mt-2'>Review and approve new member applications</p>
          </div>
          <div className='text-right'>
            <p className='text-3xl font-bold text-orange-500'>{filteredRequests.length}</p>
            <p className='text-gray-400 text-sm'>Showing</p>
          </div>
        </div>
      </motion.div>

      {/* STATS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        {[
          { label: 'Pending', count: requests.filter(r => r.status === 'pending').length, color: 'yellow', icon: '⏳' },
          { label: 'Approved', count: requests.filter(r => r.status === 'approved').length, color: 'green', icon: '✅' },
          { label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length, color: 'red', icon: '❌' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className={`bg-neutral-800 rounded-lg p-5 border-l-4 border-${stat.color}-500 hover:bg-neutral-700/50 transition-all`}
            whileHover={{ y: -2 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className={`text-${stat.color}-400 text-sm`}>{stat.label}</p>
                <p className='text-3xl font-bold text-white mt-1'>{stat.count}</p>
              </div>
              <span className='text-3xl'>{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* FILTERS & SEARCH */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='text-gray-400 text-sm mb-2 block font-semibold'>Search</label>
            <input
              type='text'
              placeholder='Search by name or email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all'
            />
          </div>

          <div>
            <label className='text-gray-400 text-sm mb-2 block font-semibold'>Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all'
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
              className='bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-orange-500/40 transition-all'
              layout
            >
              {/* REQUEST HEADER */}
              <motion.button
                onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                className='w-full p-6 flex items-center justify-between hover:bg-neutral-700/50 transition-all'
              >
                <div className='flex items-center gap-4 flex-1 text-left'>
                  {/* AVATAR */}
                  <div className='w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0'>
                    {request.fullName.charAt(0)}
                  </div>

                  {/* INFO */}
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-1'>
                      <p className='text-white font-semibold text-lg'>{request.fullName}</p>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getExperienceBadgeColor(request.experienceLevel)}`}>
                        {request.experienceLevel}
                      </span>
                      {hasHealthConcerns(request) && (
                        <AlertCircle size={16} className='text-yellow-400' />
                      )}
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-400'>
                      <Mail size={14} />
                      <span>{request.email}</span>
                      <span className='text-gray-600'>•</span>
                      <Dumbbell size={14} />
                      <span>{request.fitnessGoal}</span>
                    </div>
                  </div>

                  {/* STATUS & DATE */}
                  <div className='flex flex-col items-end gap-2'>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <span className='text-xs text-gray-500 flex items-center gap-1'>
                      <Clock size={12} />
                      {request.submittedAt}
                    </span>
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
                        <h3 className='text-orange-500 font-bold mb-4 flex items-center gap-2'>
                          <User size={18} />
                          Personal Information
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Full Name</p>
                            <p className='text-white mt-1'>{request.fullName}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Email</p>
                            <p className='text-white mt-1 break-all'>{request.email}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Phone</p>
                            <p className='text-white mt-1'>{request.phone}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Date of Birth</p>
                            <p className='text-white mt-1'>{request.dateOfBirth}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Gender</p>
                            <p className='text-white mt-1'>{request.gender}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Submitted</p>
                            <p className='text-white mt-1'>{request.submittedAt}</p>
                          </div>
                        </div>
                      </div>

                      {/* FITNESS INFO */}
                      <div>
                        <h3 className='text-orange-500 font-bold mb-4 flex items-center gap-2'>
                          <Dumbbell size={18} />
                          Fitness Profile
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Fitness Goal</p>
                            <p className='text-white mt-1'>{request.fitnessGoal}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Experience Level</p>
                            <p className='text-white mt-1'>{request.experienceLevel}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Gym Experience</p>
                            <p className='text-white mt-1'>{request.pastGymExperience}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Workout Frequency</p>
                            <p className='text-white mt-1'>{request.workoutFrequency}</p>
                          </div>
                        </div>
                      </div>

                      {/* HEALTH INFO */}
                      <div>
                        <h3 className='text-orange-500 font-bold mb-4 flex items-center gap-2'>
                          <Heart size={18} />
                          Health Information
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className={`rounded-lg p-4 ${request.currentConditions[0] !== 'None' ? 'bg-yellow-500/20 border border-yellow-500/40' : 'bg-neutral-700/50'}`}>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Current Conditions</p>
                            <p className={`mt-1 ${request.currentConditions[0] !== 'None' ? 'text-yellow-300 font-semibold' : 'text-white'}`}>
                              {request.currentConditions.join(', ')}
                            </p>
                          </div>
                          <div className={`rounded-lg p-4 ${request.medications !== 'None' ? 'bg-yellow-500/20 border border-yellow-500/40' : 'bg-neutral-700/50'}`}>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Medications</p>
                            <p className={`mt-1 ${request.medications !== 'None' ? 'text-yellow-300 font-semibold' : 'text-white'}`}>
                              {request.medications || 'None'}
                            </p>
                          </div>
                          <div className={`rounded-lg p-4 ${request.allergies !== 'None' ? 'bg-yellow-500/20 border border-yellow-500/40' : 'bg-neutral-700/50'}`}>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Allergies</p>
                            <p className={`mt-1 ${request.allergies !== 'None' ? 'text-yellow-300 font-semibold' : 'text-white'}`}>
                              {request.allergies || 'None'}
                            </p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Sleep Hours/Night</p>
                            <p className='text-white mt-1'>{request.sleepHours} hours</p>
                          </div>
                        </div>
                      </div>

                      {/* EMERGENCY CONTACT */}
                      <div>
                        <h3 className='text-orange-500 font-bold mb-4 flex items-center gap-2'>
                          <Phone size={18} />
                          Emergency Contact
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Name</p>
                            <p className='text-white mt-1'>{request.emergencyContactName}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Phone</p>
                            <p className='text-white mt-1'>{request.emergencyContactPhone}</p>
                          </div>
                          <div className='bg-neutral-700/50 rounded-lg p-4'>
                            <p className='text-gray-400 text-xs font-semibold uppercase'>Relationship</p>
                            <p className='text-white mt-1'>{request.relationship}</p>
                          </div>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      {request.status === 'pending' && (
                        <div className='flex gap-3 pt-6 border-t border-neutral-700'>
                          <motion.button
                            onClick={() => handleApprove(request.id)}
                            className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/30'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Check size={18} />
                            Approve Member
                          </motion.button>
                          <motion.button
                            onClick={() => handleReject(request.id)}
                            className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-red-500/30'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <X size={18} />
                            Reject Request
                          </motion.button>
                        </div>
                      )}

                      {request.status === 'approved' && (
                        <div className='pt-6 border-t border-neutral-700 space-y-4'>
                          <div className='flex items-center gap-2 bg-green-500/10 rounded-lg p-4 border border-green-500/30'>
                            <Check size={20} className='text-green-400' />
                            <p className='text-green-400 font-semibold'>Approved – Complete Setup</p>
                          </div>
                          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                            <motion.button
                              className='flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/30'
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <User size={18} />
                              Create Account
                            </motion.button>
                            <motion.button
                              className='flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/30'
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Dumbbell size={18} />
                              Assign Plan
                            </motion.button>
                            <motion.button
                              className='flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-emerald-500/30'
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Check size={18} />
                              Payment Received
                            </motion.button>
                          </div>
                        </div>
                      )}

                      {request.status === 'rejected' && (
                        <div className='flex items-center gap-2 pt-6 border-t border-neutral-700 bg-red-500/10 rounded-lg p-4'>
                          <X size={20} className='text-red-400' />
                          <p className='text-red-400 font-semibold'>This request has been rejected</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-neutral-800 rounded-lg p-12 text-center border border-neutral-700'
          >
            <p className='text-gray-400 text-lg'>No requests found</p>
            <p className='text-gray-500 text-sm mt-2'>Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Approvals