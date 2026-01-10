/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AdminDashboard = () => {
  const [timePeriod, setTimePeriod] = useState('3M')

  // Revenue data
  const revenueData = [
    { month: 'Jan', revenue: 400000 },
    { month: 'Feb', revenue: 450000 },
    { month: 'Mar', revenue: 480000 },
    { month: 'Apr', revenue: 420000 },
    { month: 'May', revenue: 520000 },
    { month: 'Jun', revenue: 580000 },
    { month: 'Jul', revenue: 500000 },
    { month: 'Aug', revenue: 620000 },
    { month: 'Sep', revenue: 700000 },
    { month: 'Oct', revenue: 680000 },
    { month: 'Nov', revenue: 750000 },
    { month: 'Dec', revenue: 820000 }
  ]

  // Membership distribution data
  const membershipData = [
    { name: 'Premium', value: 45 },
    { name: 'Standard', value: 35 },
    { name: 'Basic', value: 20 }
  ]

  // Recent payments data
  const recentPayments = [
    { id: 1, member: 'John Doe', amount: '$99', date: '2024-01-20', status: 'Completed' },
    { id: 2, member: 'Jane Smith', amount: '$149', date: '2024-01-19', status: 'Completed' },
    { id: 3, member: 'Mike Johnson', amount: '$199', date: '2024-01-18', status: 'Pending' },
    { id: 4, member: 'Sarah Williams', amount: '$99', date: '2024-01-17', status: 'Completed' },
    { id: 5, member: 'Tom Brown', amount: '$149', date: '2024-01-16', status: 'Failed' }
  ]

  const statsCards = [
    { number: '188', label: 'Active Members', sub: '+2 from last month' },
    { number: '5', label: 'Coaches', sub: '+2 from last month' },
    { number: '$2,450', label: 'Monthly Revenue', sub: '+$450 this month' },
    { number: '12', label: 'Pending Approvals', sub: '3 new requests' }
  ]

  const timePeriods = ['3M', '6M', '12M', 'YTD']
  const COLORS = ['#ff6b35', '#ff8c42', '#ffa94d']

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
      <motion.div variants={itemVariants} className='flex justify-between items-start mb-8'>
        <div>
          <h1 className='text-3xl font-bold mb-1'>
            <span className='text-orange-500'>WELCOME BACK,</span>
            <span className='text-white'> Admin !</span>
          </h1>
          <p className='text-gray-400 text-sm'>Admin</p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='bg-orange-500 text-white font-bold text-sm px-2 py-1 rounded'>10</div>
          <div className='text-2xl'>🔔</div>
        </div>
      </motion.div>

      {/* STATS CARDS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            className='bg-neutral-800 rounded-lg p-4 border-l-4 border-orange-500 hover:bg-neutral-700 transition-all'
            whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(249, 115, 22, 0.15)' }}
          >
            <h3 className='text-2xl font-bold text-orange-500'>{stat.number}</h3>
            <p className='text-white font-semibold text-sm'>{stat.label}</p>
            <p className='text-xs text-gray-400 mt-1'>{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CHARTS SECTION */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        {/* BAR CHART - Larger */}
        <div className='lg:col-span-2 bg-neutral-800 rounded-lg p-6 border border-orange-500/20'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold text-orange-500'>Monthly Revenue Trends</h2>
            <div className='flex gap-2'>
              {timePeriods.map((period) => (
                <motion.button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                    timePeriod === period
                      ? 'bg-orange-500 text-white'
                      : 'bg-neutral-700 text-gray-400 hover:text-orange-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#444' />
              <XAxis dataKey='month' stroke='#999' tick={{ fontSize: 12 }} />
              <YAxis stroke='#999' tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #ff6b35',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Bar dataKey='revenue' fill='#ff6b35' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className='flex items-center gap-2 mt-6 pt-4 border-t border-orange-500/20'>
            <span className='text-lg'>📈</span>
            <div className='flex-1'>
              <p className='text-gray-300 font-semibold text-sm'>Strong Growth Trajectory</p>
              <p className='text-xs text-gray-400'>Revenue increased consistently over the past 8 months</p>
            </div>
            <span className='text-xl font-bold text-green-500'>+147%</span>
          </div>
        </div>

        {/* PIE CHART */}
        <div className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20'>
          <h2 className='text-xl font-bold text-orange-500 mb-6 text-center'>Membership Distribution</h2>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={membershipData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey='value'
              >
                {membershipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #ff6b35',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* LEGEND */}
          <div className='space-y-2 mt-6'>
            {membershipData.map((item, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className='text-sm text-gray-300'>{item.name}</span>
                <span className='ml-auto text-sm font-semibold text-gray-300'>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* RECENT PAYMENTS TABLE */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20'>
        <h2 className='text-xl font-bold text-orange-500 mb-4'>Recent Payments</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-orange-500/20'>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-300'>Member</th>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-300'>Amount</th>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-300'>Date</th>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-300'>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => (
                <tr key={payment.id} className='border-b border-neutral-700 hover:bg-neutral-700/50 transition-all'>
                  <td className='py-3 px-4 text-sm text-gray-300'>{payment.member}</td>
                  <td className='py-3 px-4 text-sm font-semibold text-orange-500'>{payment.amount}</td>
                  <td className='py-3 px-4 text-sm text-gray-400'>{payment.date}</td>
                  <td className='py-3 px-4 text-sm'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : payment.status === 'Pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* SMALL WIDGETS */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
        {/* ATTENDANCE */}
        <div className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20'>
          <h3 className='text-lg font-bold text-orange-500 mb-3'>Today's Attendance</h3>
          <div className='text-3xl font-bold text-white mb-2'>34</div>
          <p className='text-sm text-gray-400'>Members checked in</p>
          <div className='mt-4 w-full bg-neutral-700 h-2 rounded-full overflow-hidden'>
            <div className='bg-orange-500 h-full' style={{ width: '68%' }}></div>
          </div>
          <p className='text-xs text-gray-400 mt-2'>68% of members</p>
        </div>

        {/* COACH ACTIVITY */}
        <div className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20'>
          <h3 className='text-lg font-bold text-orange-500 mb-3'>Coach Activity</h3>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-300'>Plans Created</span>
              <span className='font-bold text-white'>12</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-300'>Videos Uploaded</span>
              <span className='font-bold text-white'>8</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-300'>Clients Trained</span>
              <span className='font-bold text-white'>45</span>
            </div>
          </div>
        </div>

        {/* ALERTS */}
        <div className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20'>
          <h3 className='text-lg font-bold text-orange-500 mb-3'>System Alerts</h3>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 p-2 bg-yellow-500/10 rounded text-xs'>
              <span>⚠️</span>
              <span className='text-yellow-400'>5 pending registrations</span>
            </div>
            <div className='flex items-center gap-2 p-2 bg-green-500/10 rounded text-xs'>
              <span>✅</span>
              <span className='text-green-400'>System running normally</span>
            </div>
            <div className='flex items-center gap-2 p-2 bg-orange-500/10 rounded text-xs'>
              <span>📢</span>
              <span className='text-orange-400'>New feature update available</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminDashboard