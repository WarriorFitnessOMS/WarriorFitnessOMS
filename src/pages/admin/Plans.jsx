import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Check } from 'lucide-react'

const Plans = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Weekly Pass',
      price: 15,
      period: 'week',
      features: [
        'Full gym & equipment access',
        'Locker & shower facilities',
        'Join any open class (space permitting)',
        'No long-term commitment',
        'Great for travelers or trying us out'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Monthly Plan',
      price: 45,
      period: 'month',
      features: [
        'Unlimited gym & class access',
        'Locker & shower facilities',
        '1 free guest pass per month',
        'Cancel or upgrade anytime',
        'Perfect for beginners or flexible schedules'
      ],
      popular: false
    },
    {
      id: 3,
      name: '6-Month Plan',
      price: 240,
      period: 'save 10%',
      features: [
        'All Monthly benefits included',
        'Free fitness check every 2 months',
        'Priority booking for group classes',
        'Discounts on protein & supplements',
        'Great for building consistency & progress'
      ],
      popular: true
    },
    {
      id: 4,
      name: '1-Year Plan',
      price: 450,
      period: 'save 20%',
      features: [
        'All 6-Month benefits included',
        '2 free personal training sessions',
        'Exclusive member-only events',
        'Best value & biggest savings',
        'Perfect for committed fitness lovers'
      ],
      popular: false
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: '',
    features: [''],
    popular: false
  })

  const handleAddPlan = () => {
    setFormData({
      name: '',
      price: '',
      period: '',
      features: [''],
      popular: false
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleEditPlan = (plan) => {
    setFormData(plan)
    setEditingId(plan.id)
    setShowForm(true)
  }

  const handleSavePlan = () => {
    if (!formData.name || !formData.price || !formData.period) {
      alert('Please fill in all required fields')
      return
    }

    if (editingId) {
      setPlans(prev =>
        prev.map(plan =>
          plan.id === editingId ? { ...plan, ...formData } : plan
        )
      )
    } else {
      setPlans(prev => [
        ...prev,
        {
          ...formData,
          id: Math.max(...prev.map(p => p.id), 0) + 1,
          price: parseInt(formData.price)
        }
      ])
    }

    setShowForm(false)
    setFormData({
      name: '',
      price: '',
      period: '',
      features: [''],
      popular: false
    })
  }

  const handleDeletePlan = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(prev => prev.filter(plan => plan.id !== id))
    }
  }

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleFeatureChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f))
    }))
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
            <span className='text-orange-500'>Plans</span>
            <span className='text-white'> Management</span>
          </h1>
          <p className='text-gray-400 text-sm mt-2'>Create and manage membership plans for members</p>
        </div>
        <motion.button
          onClick={handleAddPlan}
          className='flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Plan
        </motion.button>
      </motion.div>

      {/* STATS */}
      <motion.div variants={itemVariants} className='bg-neutral-800 rounded-lg p-6 border border-orange-500/20 mb-8'>
        <p className='text-gray-400 text-sm font-semibold'>Total Plans</p>
        <p className='text-3xl font-bold text-white mt-2'>{plans.length}</p>
      </motion.div>

      {/* ADD/EDIT FORM MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto'
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-neutral-800 rounded-lg border border-orange-500/20 p-8 w-full max-w-2xl my-8'
            >
              <h2 className='text-2xl font-bold text-orange-500 mb-6'>
                {editingId ? 'Edit Plan' : 'Add New Plan'}
              </h2>

              <div className='space-y-4 max-h-96 overflow-y-auto pr-2'>
                {/* Plan Name */}
                <div>
                  <label className='text-gray-400 text-sm mb-2 block font-semibold'>Plan Name *</label>
                  <input
                    type='text'
                    placeholder='e.g., Monthly Plan'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                  />
                </div>

                {/* Price */}
                <div>
                  <label className='text-gray-400 text-sm mb-2 block font-semibold'>Price (in $) *</label>
                  <input
                    type='number'
                    placeholder='e.g., 45'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                  />
                </div>

                {/* Period */}
                <div>
                  <label className='text-gray-400 text-sm mb-2 block font-semibold'>Period *</label>
                  <input
                    type='text'
                    placeholder='e.g., month, week, save 10%'
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className='w-full px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                  />
                </div>

                {/* Popular Toggle */}
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    id='popular'
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className='w-4 h-4 rounded'
                  />
                  <label htmlFor='popular' className='text-gray-400 text-sm font-semibold'>
                    Mark as most popular plan
                  </label>
                </div>

                {/* Features */}
                <div>
                  <label className='text-gray-400 text-sm mb-2 block font-semibold'>Features</label>
                  <div className='space-y-2'>
                    {formData.features.map((feature, index) => (
                      <div key={index} className='flex gap-2'>
                        <input
                          type='text'
                          placeholder='Enter feature'
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className='flex-1 px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                        />
                        <motion.button
                          onClick={() => handleRemoveFeature(index)}
                          className='px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-sm font-semibold'
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          ✕
                        </motion.button>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    onClick={handleAddFeature}
                    className='mt-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 rounded-lg text-sm font-semibold'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    + Add Feature
                  </motion.button>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex gap-3 mt-8'>
                <motion.button
                  onClick={handleSavePlan}
                  className='flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Check size={18} />
                  {editingId ? 'Update Plan' : 'Create Plan'}
                </motion.button>
                <motion.button
                  onClick={() => setShowForm(false)}
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
      </AnimatePresence>

      {/* PLANS GRID */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`relative p-6 rounded-lg border-2 transition-all ${
              plan.popular
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-orange-500/30 bg-neutral-800'
            }`}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)' }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                <span className='bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                  POPULAR
                </span>
              </div>
            )}

            {/* Plan Header */}
            <h3 className='text-xl font-bold text-white mb-1'>{plan.name}</h3>
            <p className='text-gray-400 text-xs mb-3'>{plan.period}</p>

            {/* Price */}
            <div className='mb-4'>
              <span className='text-3xl font-bold text-orange-500'>${plan.price}</span>
            </div>

            {/* Features */}
            <ul className='space-y-2 mb-6'>
              {plan.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className='flex items-start gap-2 text-gray-300 text-xs'>
                  <Check size={14} className='text-orange-500 mt-0.5 flex-shrink-0' />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.features.length > 3 && (
                <li className='text-gray-500 text-xs italic'>+{plan.features.length - 3} more features</li>
              )}
            </ul>

            {/* Action Buttons */}
            <div className='flex gap-2'>
              <motion.button
                onClick={() => handleEditPlan(plan)}
                className='flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={14} />
                Edit
              </motion.button>
              <motion.button
                onClick={() => handleDeletePlan(plan.id)}
                className='flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 size={14} />
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Plans