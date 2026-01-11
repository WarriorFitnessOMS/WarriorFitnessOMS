/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Download, 
  CreditCard, 
  Calendar, 
  Zap,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react'

const Membership = () => {
  // Mock Data
  const currentPlan = {
    name: "Premium Member",
    price: "$45.00",
    frequency: "Monthly",
    status: "Active",
    nextBilling: "June 15, 2025",
    daysLeft: 12,
    cardLast4: "4242",
    cardBrand: "Visa"
  }

  const billingHistory = [
    { id: "INV-2024-001", date: "May 15, 2025", amount: "$45.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2024-002", date: "Apr 15, 2025", amount: "$45.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2024-003", date: "Mar 15, 2025", amount: "$45.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2024-004", date: "Feb 15, 2025", amount: "$45.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2024-005", date: "Jan 15, 2025", amount: "$45.00", status: "Paid", method: "Visa •••• 4242" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
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
      <motion.div variants={itemVariants} className='py-8 flex justify-between items-end border-b border-neutral-800 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Membership Management</h1>
          <p className='text-gray-400 mt-1'>View your subscription status and billing history</p>
        </div>
        <button className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition-colors'>
          Upgrade Plan
        </button>
      </motion.div>

      {/* TOP METRICS ROW (FULL WIDTH) */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        
        {/* Metric 1: Plan Status */}
        <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center justify-between group hover:border-orange-500/50 transition-colors'>
          <div>
            <p className='text-gray-400 text-xs font-bold uppercase tracking-wider mb-1'>Current Plan</p>
            <h3 className='text-2xl font-bold text-white'>{currentPlan.name}</h3>
            <div className='flex items-center gap-2 mt-2'>
              <span className='bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded border border-green-500/20 font-bold uppercase'>
                {currentPlan.status}
              </span>
            </div>
          </div>
          <div className='p-3 bg-neutral-700/50 rounded-lg text-orange-500 group-hover:bg-orange-500/10 transition-colors'>
            <Shield size={28} />
          </div>
        </div>

        {/* Metric 2: Cost */}
        <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center justify-between group hover:border-blue-500/50 transition-colors'>
          <div>
            <p className='text-gray-400 text-xs font-bold uppercase tracking-wider mb-1'>Recurring Cost</p>
            <h3 className='text-2xl font-bold text-white'>{currentPlan.price}</h3>
            <p className='text-xs text-gray-500 mt-2'>Billed {currentPlan.frequency}</p>
          </div>
          <div className='p-3 bg-neutral-700/50 rounded-lg text-blue-500 group-hover:bg-blue-500/10 transition-colors'>
            <CreditCard size={28} />
          </div>
        </div>

        {/* Metric 3: Next Billing */}
        <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center justify-between group hover:border-purple-500/50 transition-colors'>
          <div>
            <p className='text-gray-400 text-xs font-bold uppercase tracking-wider mb-1'>Next Billing</p>
            <h3 className='text-2xl font-bold text-white'>{currentPlan.nextBilling}</h3>
            <div className='flex items-center gap-1 mt-2 text-xs text-purple-400'>
              <Clock size={12} />
              <span>Auto-renewal enabled</span>
            </div>
          </div>
          <div className='p-3 bg-neutral-700/50 rounded-lg text-purple-500 group-hover:bg-purple-500/10 transition-colors'>
            <Calendar size={28} />
          </div>
        </div>

         {/* Metric 4: Usage / Days Left */}
         <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center justify-between group hover:border-green-500/50 transition-colors'>
          <div>
            <p className='text-gray-400 text-xs font-bold uppercase tracking-wider mb-1'>Cycle Ends In</p>
            <h3 className='text-2xl font-bold text-white'>{currentPlan.daysLeft} Days</h3>
            <div className='w-24 h-1.5 bg-neutral-700 rounded-full mt-3 overflow-hidden'>
               <div className='h-full bg-green-500 w-[60%]' />
            </div>
          </div>
          <div className='p-3 bg-neutral-700/50 rounded-lg text-green-500 group-hover:bg-green-500/10 transition-colors'>
            <TrendingUp size={28} />
          </div>
        </div>
      </motion.div>

      {/* CONTENT GRID */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        {/* LEFT: PAYMENT DETAILS */}
        <motion.div variants={itemVariants} className='lg:col-span-1 space-y-6'>
          <div className='bg-neutral-800 p-6 rounded-xl border border-neutral-700'>
            <h3 className='font-bold text-white mb-6 flex items-center gap-2'>
              <CreditCard size={20} className='text-orange-500'/> Payment Method
            </h3>
            
            {/* Card Preview */}
            <div className='bg-linear-to-br from-neutral-700 to-neutral-800 p-5 rounded-xl border border-neutral-600 mb-6 relative overflow-hidden'>
               <div className='absolute top-0 right-0 p-4 opacity-10'>
                 <Zap size={100} />
               </div>
               <div className='flex justify-between items-start mb-8'>
                 <span className='font-bold italic text-gray-400'>{currentPlan.cardBrand}</span>
                 <span className='bg-white/10 px-2 py-1 rounded text-[10px] text-white'>DEFAULT</span>
               </div>
               <p className='text-lg font-mono text-white mb-2'>•••• •••• •••• {currentPlan.cardLast4}</p>
               <div className='flex justify-between text-xs text-gray-400'>
                 <span>Card Holder</span>
                 <span>Expires 12/28</span>
               </div>
            </div>

            <button className='w-full py-3 border border-neutral-600 rounded-lg text-sm font-bold text-gray-300 hover:bg-neutral-700 hover:text-white transition-all'>
               Update Payment Method
            </button>
          </div>
        </motion.div>

        {/* RIGHT: BILLING HISTORY TABLE (WIDE) */}
        <motion.div variants={itemVariants} className='lg:col-span-2'>
          <div className='bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden'>
             <div className='p-6 border-b border-neutral-700 flex justify-between items-center'>
                <h3 className='font-bold text-white'>Billing History</h3>
                <button className='text-sm text-orange-500 hover:text-orange-400 font-semibold'>Download All</button>
             </div>
             
             <div className='overflow-x-auto'>
                <table className='w-full text-left text-sm'>
                   <thead className='bg-neutral-900/50 text-gray-400 font-bold uppercase text-xs'>
                      <tr>
                         <th className='p-5'>Invoice ID</th>
                         <th className='p-5'>Date</th>
                         <th className='p-5'>Amount</th>
                         <th className='p-5'>Status</th>
                         <th className='p-5 text-right'>Action</th>
                      </tr>
                   </thead>
                   <tbody className='divide-y divide-neutral-700'>
                      {billingHistory.map((item) => (
                         <tr key={item.id} className='hover:bg-neutral-700/30 transition-colors'>
                            <td className='p-5 font-mono text-gray-300'>{item.id}</td>
                            <td className='p-5 text-white'>{item.date}</td>
                            <td className='p-5 text-white font-bold'>{item.amount}</td>
                            <td className='p-5'>
                               <span className='bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold border border-green-500/20'>
                                  {item.status}
                               </span>
                            </td>
                            <td className='p-5 text-right'>
                               <button className='p-2 hover:bg-neutral-700 rounded-full text-gray-400 hover:text-white transition-colors'>
                                  <Download size={18} />
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Membership