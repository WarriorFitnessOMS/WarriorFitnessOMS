/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Filter, Eye, FileText, RotateCw } from 'lucide-react'

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [methodFilter, setMethodFilter] = useState('All Methods')
  const [dateFrom, setDateFrom] = useState('11/01/2024')
  const [dateTo, setDateTo] = useState('11/30/2024')

  // Mock data for payments
  const paymentsData = [
    { id: '#PAY-1234', name: 'John Doe', date: 'Nov 4, 2024', amount: '$150.00', method: 'Credit Card', type: 'Session', status: 'Completed' },
    { id: '#PAY-1233', name: 'Sarah Lee', date: 'Nov 3, 2024', amount: '$299.00', method: 'Bank Transfer', type: 'Membership', status: 'Pending' },
    { id: '#PAY-1232', name: 'Omar Garcia', date: 'Nov 3, 2024', amount: '$85.00', method: 'Credit Card', type: 'Session', status: 'Completed' },
    { id: '#PAY-1231', name: 'Emma Johnson', date: 'Nov 2, 2024', amount: '$120.00', method: 'Cash', type: 'Session', status: 'Completed' },
    { id: '#PAY-1230', name: 'Michael Brown', date: 'Nov 1, 2024', amount: '$199.00', method: 'PayPal', type: 'Membership', status: 'Failed' },
    { id: '#PAY-1229', name: 'Lisa Anderson', date: 'Oct 31, 2024', amount: '$75.00', method: 'Credit Card', type: 'Session', status: 'Completed' },
    { id: '#PAY-1228', name: 'David Smith', date: 'Oct 30, 2024', amount: '$250.00', method: 'Bank Transfer', type: 'Membership', status: 'Completed' },
    { id: '#PAY-1227', name: 'Jessica Taylor', date: 'Oct 29, 2024', amount: '$150.00', method: 'Credit Card', type: 'Session', status: 'Pending' }
  ]

  const statsCards = [
    { amount: '$45,890', label: 'Total Revenue', change: '+12% from last month', icon: '💰' },
    { amount: '$8,420', label: 'This Month', change: '+8% from last month', icon: '📊' },
    { amount: '$1,250', label: 'Pending Payments', change: '5 transactions', icon: '⏳' }
  ]

  // Filter data based on search and filters
  const filteredData = paymentsData.filter(payment => {
    const matchesSearch = payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All Status' || payment.status === statusFilter
    const matchesMethod = methodFilter === 'All Methods' || payment.method === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400'
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'Failed':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <motion.div
      className='w-full min-h-screen bg-neutral-900 text-white pb-8'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* PAGE TITLE */}
      <motion.div variants={itemVariants} className='mb-8'>
        <h1 className='text-4xl font-bold text-orange-500'>Payments</h1>
        <p className='text-gray-400 text-sm mt-2'>Manage and track all payment transactions</p>
      </motion.div>

      {/* STATS CARDS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className='bg-neutral-800 rounded-lg p-6 border-l-4 border-orange-500'
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-orange-500 text-3xl font-bold'>{stat.amount}</p>
                <p className='text-white font-semibold text-sm mt-1'>{stat.label}</p>
                <p className='text-gray-400 text-xs mt-1'>{stat.change}</p>
              </div>
              <span className='text-3xl'>{stat.icon}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* FILTERS SECTION */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20 mb-8'>
        <div className='flex items-center gap-2 mb-6'>
          <Filter size={20} className='text-orange-500' />
          <h2 className='text-lg font-bold text-white'>Filters & Search</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          {/* SEARCH */}
          <div>
            <label className='text-gray-400 text-sm mb-2 block'>Search</label>
            <div className='relative'>
              <Search size={18} className='absolute left-3 top-3 text-gray-500' />
              <input
                type='text'
                placeholder='Search by client name, ID...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
              />
            </div>
          </div>

          {/* DATE FROM */}
          <div>
            <label className='text-gray-400 text-sm mb-2 block'>Date From</label>
            <input
              type='date'
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            />
          </div>

          {/* DATE TO */}
          <div>
            <label className='text-gray-400 text-sm mb-2 block'>Date To</label>
            <input
              type='date'
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            />
          </div>

          {/* STATUS FILTER */}
          <div>
            <label className='text-gray-400 text-sm mb-2 block'>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          {/* METHOD FILTER */}
          <div>
            <label className='text-gray-400 text-sm mb-2 block'>Payment Method</label>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
            >
              <option>All Methods</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Cash</option>
            </select>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className='flex gap-3 mt-6'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-all'
          >
            <Download size={16} />
            Export
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('All Status')
              setMethodFilter('All Methods')
            }}
            className='flex items-center gap-2 px-4 py-2 bg-neutral-700 text-gray-300 rounded-lg font-semibold text-sm hover:bg-neutral-600 transition-all'
          >
            <RotateCw size={16} />
            Reset
          </motion.button>
        </div>
      </motion.div>

      {/* TRANSACTIONS TABLE */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg border border-orange-500/20 overflow-hidden'>
        <div className='p-6 border-b border-orange-500/20'>
          <h2 className='text-lg font-bold text-white'>Recent Transactions</h2>
          <p className='text-gray-400 text-sm mt-1'>Showing {filteredData.length} of {paymentsData.length} transactions</p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-neutral-700/50'>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Transaction ID</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Client Name</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Date</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Amount</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Method</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Type</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Status</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-300'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((payment) => (
                  <tr
                    key={payment.id}
                    className='border-b border-neutral-700 hover:bg-neutral-700/50 transition-all'
                  >
                    <td className='py-4 px-6 text-sm font-semibold text-orange-500'>{payment.id}</td>
                    <td className='py-4 px-6 text-sm text-gray-300'>{payment.name}</td>
                    <td className='py-4 px-6 text-sm text-gray-400'>{payment.date}</td>
                    <td className='py-4 px-6 text-sm font-bold text-white'>{payment.amount}</td>
                    <td className='py-4 px-6 text-sm text-gray-400'>{payment.method}</td>
                    <td className='py-4 px-6 text-sm text-gray-400'>{payment.type}</td>
                    <td className='py-4 px-6 text-sm'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className='py-4 px-6'>
                      <div className='flex items-center gap-2'>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className='p-2 hover:bg-orange-500/20 rounded-lg transition-all text-orange-500'
                          title='View Details'
                        >
                          <Eye size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className='p-2 hover:bg-orange-500/20 rounded-lg transition-all text-orange-500'
                          title='View Receipt'
                        >
                          <FileText size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='8' className='py-12 text-center text-gray-400'>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* PAGINATION */}
      <motion.div variants={itemVariants} className='flex items-center justify-between mt-6 px-6'>
        <p className='text-sm text-gray-400'>
          Showing <span className='font-semibold text-white'>1</span> to{' '}
          <span className='font-semibold text-white'>{filteredData.length}</span> of{' '}
          <span className='font-semibold text-white'>{paymentsData.length}</span> results
        </p>
        <div className='flex gap-2'>
          <button className='px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-gray-300 hover:border-orange-500 transition-all text-sm'>
            Previous
          </button>
          <button className='px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold text-sm'>
            1
          </button>
          <button className='px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-gray-300 hover:border-orange-500 transition-all text-sm'>
            2
          </button>
          <button className='px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-gray-300 hover:border-orange-500 transition-all text-sm'>
            Next
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Payments