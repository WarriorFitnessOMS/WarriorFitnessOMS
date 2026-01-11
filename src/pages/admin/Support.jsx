/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Send } from 'lucide-react'

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedTicket, setExpandedTicket] = useState(null)
  const [adminResponse, setAdminResponse] = useState({})

  const [tickets, setTickets] = useState([
    {
      id: 'TKT001',
      memberName: 'John Doe',
      memberId: 'M001',
      email: 'john@example.com',
      subject: 'Cannot login to account',
      category: 'Membership',
      priority: 'High',
      status: 'Open',
      description: 'I am unable to login to my gym account. Getting error message.',
      dateSubmitted: '2024-01-10 2:30 PM',
      responses: ['Password reset sent to your email. Please check spam folder.']
    },
    {
      id: 'TKT002',
      memberName: 'Sarah Lee',
      memberId: 'M002',
      email: 'sarah@example.com',
      subject: 'Payment failed',
      category: 'Payment',
      priority: 'High',
      status: 'In Progress',
      description: 'My payment was charged twice. Need refund immediately.',
      dateSubmitted: '2024-01-10 1:15 PM',
      responses: ['We are investigating your payment issue. Will update soon.']
    },
    {
      id: 'TKT003',
      memberName: 'Mike Johnson',
      memberId: 'M003',
      email: 'mike@example.com',
      subject: 'Attendance not recorded',
      category: 'Attendance',
      priority: 'Medium',
      status: 'Open',
      description: 'My attendance for last week was not recorded properly.',
      dateSubmitted: '2024-01-09 4:45 PM',
      responses: []
    },
    {
      id: 'TKT004',
      memberName: 'Emily Davis',
      memberId: 'M004',
      email: 'emily@example.com',
      subject: 'Request membership upgrade',
      category: 'Membership',
      priority: 'Low',
      status: 'Resolved',
      description: 'I want to upgrade from Standard to Premium plan.',
      dateSubmitted: '2024-01-08 10:20 AM',
      responses: ['Your membership has been upgraded successfully.']
    },
    {
      id: 'TKT005',
      memberName: 'Robert Wilson',
      memberId: 'M005',
      email: 'robert@example.com',
      subject: 'App not working properly',
      category: 'Other',
      priority: 'Medium',
      status: 'In Progress',
      description: 'The mobile app crashes when I try to book a session.',
      dateSubmitted: '2024-01-07 6:00 PM',
      responses: ['Our tech team is looking into this. Please update the app.']
    }
  ])

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-400'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'Low':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Payment':
        return 'bg-blue-500/20 text-blue-300'
      case 'Membership':
        return 'bg-purple-500/20 text-purple-300'
      case 'Attendance':
        return 'bg-orange-500/20 text-orange-300'
      case 'Other':
        return 'bg-gray-500/20 text-gray-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-500/20 text-red-400'
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400'
      case 'Resolved':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    )
  }

  const handleAddResponse = (ticketId) => {
    const response = adminResponse[ticketId]
    if (!response || !response.trim()) return

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? {
              ...ticket,
              responses: [...ticket.responses, response]
            }
          : ticket
      )
    )

    setAdminResponse({ ...adminResponse, [ticketId]: '' })
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
          <span className='text-orange-500'>Support</span>
          <span className='text-white'> Tickets</span>
        </h1>
        <p className='text-gray-400 text-sm mt-2'>Manage member support tickets and issues</p>
      </motion.div>

      {/* STATS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-red-500'>
          <p className='text-red-400 text-sm font-semibold'>Open Tickets</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.open}</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-blue-500'>
          <p className='text-blue-400 text-sm font-semibold'>In Progress</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.inProgress}</p>
        </div>
        <div className='bg-neutral-800 rounded-lg p-6 border-l-4 border-green-500'>
          <p className='text-green-400 text-sm font-semibold'>Resolved</p>
          <p className='text-3xl font-bold text-white mt-2'>{stats.resolved}</p>
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
                placeholder='Search by member, ID, or subject...'
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
              <option value='all'>All Tickets</option>
              <option value='Open'>Open</option>
              <option value='In Progress'>In Progress</option>
              <option value='Resolved'>Resolved</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* TICKETS LIST */}
      <motion.div variants={itemVariants} className='space-y-4'>
        {filteredTickets.map(ticket => (
          <motion.div
            key={ticket.id}
            className='bg-neutral-800 rounded-lg border border-orange-500/20 overflow-hidden'
            layout
          >
            {/* TICKET HEADER */}
            <motion.button
              onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
              className='w-full p-6 flex items-center justify-between hover:bg-neutral-700/50 transition-all'
            >
              <div className='flex items-center gap-4 flex-1 text-left'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <span className='text-white font-semibold text-lg'>{ticket.id}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className='text-white font-semibold'>{ticket.subject}</p>
                  <p className='text-gray-400 text-sm mt-1'>
                    {ticket.memberName} ({ticket.memberId}) • {ticket.dateSubmitted}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedTicket === ticket.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className='text-orange-500' />
              </motion.div>
            </motion.button>

            {/* EXPANDED DETAILS */}
            <AnimatePresence>
              {expandedTicket === ticket.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='border-t border-orange-500/20 overflow-hidden'
                >
                  <div className='p-6 bg-neutral-800/50 space-y-6'>
                    {/* TICKET INFO */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <p className='text-gray-400 text-sm font-semibold'>Category</p>
                        <span className={`px-3 py-1 rounded text-xs font-bold ${getCategoryColor(ticket.category)} inline-block mt-1`}>
                          {ticket.category}
                        </span>
                      </div>
                      <div>
                        <p className='text-gray-400 text-sm font-semibold'>Member Email</p>
                        <p className='text-white mt-1'>{ticket.email}</p>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                      <p className='text-gray-400 text-sm font-semibold mb-2'>Description</p>
                      <p className='text-gray-300 text-sm bg-neutral-700/50 p-3 rounded'>
                        {ticket.description}
                      </p>
                    </div>

                    {/* RESPONSES */}
                    <div>
                      <p className='text-gray-400 text-sm font-semibold mb-3'>Admin Responses</p>
                      <div className='space-y-3 mb-4'>
                        {ticket.responses.length > 0 ? (
                          ticket.responses.map((response, idx) => (
                            <div key={idx} className='bg-green-500/10 border border-green-500/30 p-3 rounded'>
                              <p className='text-green-400 text-xs font-semibold mb-1'>Admin Response</p>
                              <p className='text-gray-300 text-sm'>{response}</p>
                            </div>
                          ))
                        ) : (
                          <p className='text-gray-500 text-sm'>No responses yet</p>
                        )}
                      </div>

                      {/* ADD RESPONSE */}
                      <div className='flex gap-2'>
                        <input
                          type='text'
                          placeholder='Type response...'
                          value={adminResponse[ticket.id] || ''}
                          onChange={(e) => setAdminResponse({ ...adminResponse, [ticket.id]: e.target.value })}
                          className='flex-1 px-3 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                        />
                        <motion.button
                          onClick={() => handleAddResponse(ticket.id)}
                          className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold flex items-center gap-2'
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Send size={16} />
                          Send
                        </motion.button>
                      </div>
                    </div>

                    {/* STATUS CHANGE */}
                    <div>
                      <p className='text-gray-400 text-sm font-semibold mb-2'>Change Status</p>
                      <div className='flex gap-2'>
                        {['Open', 'In Progress', 'Resolved'].map(status => (
                          <motion.button
                            key={status}
                            onClick={() => handleStatusChange(ticket.id, status)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                              ticket.status === status
                                ? 'bg-orange-500 text-white'
                                : 'bg-neutral-700 hover:bg-neutral-600 text-gray-300'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {status}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Support