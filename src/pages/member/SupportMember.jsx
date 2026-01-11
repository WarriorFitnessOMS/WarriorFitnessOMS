/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react'

const SupportMember = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [expandedTicket, setExpandedTicket] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  // Mock Data: Tickets belonging to THIS member
  const [myTickets, setMyTickets] = useState([
    {
      id: 'TKT-001',
      subject: 'Cannot login to account',
      category: 'Membership',
      priority: 'High',
      status: 'Resolved',
      date: '2024-01-10',
      description: 'I am unable to login to my gym account. Getting error message 404.',
      responses: [
        { sender: 'Admin', text: 'Password reset sent to your email. Please check spam folder.', date: '2024-01-11' }
      ]
    },
    {
      id: 'TKT-002',
      subject: 'Payment failed for Jan',
      category: 'Payment',
      priority: 'High',
      status: 'In Progress',
      date: '2024-01-12',
      description: 'My card was declined but I have funds. Please help.',
      responses: [
        { sender: 'Admin', text: 'We are investigating with the payment provider.', date: '2024-01-12' }
      ]
    }
  ])

  // New Ticket Form State
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Membership',
    priority: 'Medium',
    description: ''
  })

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const newTicket = {
      id: `TKT-00${myTickets.length + 1}`,
      ...formData,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      responses: []
    }
    setMyTickets([newTicket, ...myTickets])
    setIsFormOpen(false)
    setFormData({ subject: '', category: 'Membership', priority: 'Medium', description: '' })
  }

  // Helper for Colors (Matches your Admin UI)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'In Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Resolved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400';
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
      className='w-full min-h-screen bg-neutral-900 text-white pb-24 px-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className='pt-6 mb-8 flex justify-between items-end'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Support</h1>
          <p className='text-gray-400 text-sm mt-1'>We are here to help you</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all'
        >
          <Plus size={20} /> <span className='hidden md:inline'>New Ticket</span>
        </button>
      </motion.div>

      {/* FILTER TABS */}
      <motion.div variants={itemVariants} className='flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar'>
        {['All', 'Open', 'In Progress', 'Resolved'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
              filterStatus === status 
                ? 'bg-neutral-800 border-orange-500 text-white' 
                : 'bg-transparent border-neutral-700 text-gray-500 hover:border-neutral-500'
            }`}
          >
            {status}
          </button>
        ))}
      </motion.div>

      {/* TICKET LIST */}
      <div className='space-y-4'>
        {myTickets
          .filter(t => filterStatus === 'All' || t.status === filterStatus)
          .map((ticket) => (
          <motion.div 
            key={ticket.id}
            variants={itemVariants}
            className='bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden'
          >
            {/* Ticket Header (Always Visible) */}
            <div 
              onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
              className='p-4 cursor-pointer hover:bg-neutral-700/30 transition-colors'
            >
              <div className='flex justify-between items-start mb-2'>
                <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border w-fit ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </div>
                <span className='text-xs text-gray-500'>{ticket.date}</span>
              </div>
              
              <div className='flex justify-between items-center'>
                <h3 className='font-bold text-white text-lg'>{ticket.subject}</h3>
                {expandedTicket === ticket.id ? <ChevronUp size={20} className='text-gray-500'/> : <ChevronDown size={20} className='text-gray-500'/>}
              </div>
              <p className='text-xs text-gray-400 mt-1'>ID: {ticket.id} • {ticket.category}</p>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedTicket === ticket.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className='border-t border-neutral-700 bg-neutral-900/30'
                >
                  <div className='p-4 space-y-4'>
                    {/* User's Original Message */}
                    <div className='bg-neutral-700/30 p-3 rounded-lg border border-neutral-700'>
                      <p className='text-xs text-gray-500 font-bold mb-1 uppercase'>My Description</p>
                      <p className='text-sm text-gray-300 leading-relaxed'>{ticket.description}</p>
                    </div>

                    {/* Admin Responses */}
                    {ticket.responses.length > 0 ? (
                      <div className='space-y-3'>
                         {ticket.responses.map((res, idx) => (
                           <div key={idx} className='flex gap-3'>
                              <div className='w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xs shrink-0'>
                                AD
                              </div>
                              <div>
                                <div className='bg-neutral-800 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-neutral-700'>
                                   <p className='text-sm text-white'>{res.text}</p>
                                </div>
                                <p className='text-[10px] text-gray-500 mt-1 ml-1'>{res.date}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                    ) : (
                      <div className='flex items-center gap-2 text-gray-500 text-sm italic p-2'>
                        <Clock size={16} /> Waiting for support team response...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {myTickets.length === 0 && (
          <div className='text-center py-12 text-gray-500'>
            <MessageSquare size={48} className='mx-auto mb-4 opacity-20'/>
            <p>No tickets found.</p>
          </div>
        )}
      </div>

      {/* CREATE TICKET MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-neutral-800 w-full max-w-md rounded-2xl border border-neutral-700 overflow-hidden shadow-2xl'
              onClick={e => e.stopPropagation()}
            >
              <div className='p-4 border-b border-neutral-700 flex justify-between items-center'>
                <h3 className='font-bold text-lg'>New Support Ticket</h3>
                <button onClick={() => setIsFormOpen(false)} className='text-gray-500 hover:text-white'>
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className='p-4 space-y-4'>
                <div>
                   <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Subject</label>
                   <input 
                     required
                     type="text" 
                     placeholder="Brief summary of issue"
                     className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                     value={formData.subject}
                     onChange={e => setFormData({...formData, subject: e.target.value})}
                   />
                </div>
                
                <div className='grid grid-cols-2 gap-4'>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Category</label>
                      <select 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Membership</option>
                        <option>Payment</option>
                        <option>Attendance</option>
                        <option>Technical</option>
                        <option>Other</option>
                      </select>
                   </div>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Priority</label>
                      <select 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.priority}
                        onChange={e => setFormData({...formData, priority: e.target.value})}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                   </div>
                </div>

                <div>
                   <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Description</label>
                   <textarea 
                     required
                     rows="4"
                     placeholder="Please describe your issue in detail..."
                     className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none resize-none'
                     value={formData.description}
                     onChange={e => setFormData({...formData, description: e.target.value})}
                   ></textarea>
                </div>

                <button 
                  type="submit"
                  className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all'
                >
                  <Send size={18} /> Submit Ticket
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SupportMember