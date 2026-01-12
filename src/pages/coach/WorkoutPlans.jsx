/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Calendar, 
  Clock, 
  BarChart, 
  Trash2, 
  Edit2, 
  X,
  Save,
  Dumbbell
} from 'lucide-react'

const WorkoutPlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null) // For Edit Mode

  // Mock Data: Existing Plans in Database
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      name: "Hypertrophy Phase 1", 
      goal: "Muscle Gain", 
      duration: "8 Weeks", 
      difficulty: "Intermediate", 
      students: 12,
      daysPerWeek: 5
    },
    { 
      id: 2, 
      name: "Fat Loss shred", 
      goal: "Weight Loss", 
      duration: "4 Weeks", 
      difficulty: "Beginner", 
      students: 8,
      daysPerWeek: 4
    },
    { 
      id: 3, 
      name: "Powerlifting Peaking", 
      goal: "Strength", 
      duration: "12 Weeks", 
      difficulty: "Advanced", 
      students: 3,
      daysPerWeek: 4
    },
  ])

  // New Plan Form State
  const initialFormState = { name: '', goal: '', duration: '', difficulty: 'Beginner', daysPerWeek: 3 }
  const [formData, setFormData] = useState(initialFormState)

  // Handlers
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(p => p.id !== id))
    }
  }

  const openCreateModal = () => {
    setSelectedPlan(null)
    setFormData(initialFormState)
    setIsModalOpen(true)
  }

  const openEditModal = (plan) => {
    setSelectedPlan(plan)
    setFormData(plan)
    setIsModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (selectedPlan) {
      // Update logic
      setPlans(plans.map(p => p.id === selectedPlan.id ? { ...formData, id: p.id } : p))
    } else {
      // Create logic
      const newPlan = { ...formData, id: Date.now(), students: 0 }
      setPlans([newPlan, ...plans])
    }
    setIsModalOpen(false)
  }

  // Filter Logic
  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    plan.goal.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
      className='w-full min-h-screen bg-neutral-900 text-white pb-12 px-6'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className='pt-8 mb-8'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Workout Plans</h1>
            <p className='text-gray-400 mt-1'>Create and manage your training templates</p>
          </div>
          
          <div className='flex gap-3 w-full md:w-auto'>
            {/* Search */}
            <div className='relative flex-1 md:w-64'>
               <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={18} />
               <input 
                 type="text" 
                 placeholder="Search plans..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className='w-full bg-neutral-800 border border-neutral-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-orange-500 outline-none transition-all'
               />
            </div>
            {/* Create Button */}
            <button 
              onClick={openCreateModal}
              className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all'
            >
               <Plus size={20} /> <span className='hidden md:inline'>Create Plan</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* PLANS GRID */}
      <motion.div 
        variants={containerVariants}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {filteredPlans.map((plan) => (
          <motion.div 
            key={plan.id} 
            variants={itemVariants}
            className='bg-neutral-800 rounded-2xl p-5 border border-neutral-700 hover:border-orange-500/50 transition-all group relative'
          >
            {/* Plan Header */}
            <div className='flex justify-between items-start mb-4'>
               <div className='w-12 h-12 rounded-xl bg-neutral-700/50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all'>
                  <Dumbbell size={24} />
               </div>
               <div className='flex gap-2'>
                  <button 
                    onClick={() => openEditModal(plan)}
                    className='p-2 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors'
                  >
                     <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(plan.id)}
                    className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors'
                  >
                     <Trash2 size={18} />
                  </button>
               </div>
            </div>

            {/* Plan Info */}
            <h3 className='font-bold text-xl text-white mb-1'>{plan.name}</h3>
            <p className='text-sm text-gray-400 mb-4'>{plan.goal}</p>

            <div className='grid grid-cols-2 gap-2 mb-4'>
               <div className='flex items-center gap-2 text-xs text-gray-300 bg-neutral-900/50 p-2 rounded-lg border border-neutral-800'>
                  <Clock size={14} className='text-blue-500' /> {plan.duration}
               </div>
               <div className='flex items-center gap-2 text-xs text-gray-300 bg-neutral-900/50 p-2 rounded-lg border border-neutral-800'>
                  <BarChart size={14} className='text-purple-500' /> {plan.difficulty}
               </div>
            </div>

            {/* Footer */}
            <div className='pt-4 border-t border-neutral-700 flex justify-between items-center'>
               <span className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                  {plan.students} Students Active
               </span>
               <span className='text-xs font-bold text-white bg-neutral-700 px-2 py-1 rounded'>
                  {plan.daysPerWeek} Days/Week
               </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-neutral-800 w-full max-w-lg rounded-2xl border border-neutral-700 overflow-hidden shadow-2xl'
              onClick={e => e.stopPropagation()}
            >
              <div className='p-6 border-b border-neutral-700 flex justify-between items-center'>
                <h3 className='font-bold text-xl'>{selectedPlan ? 'Edit Plan' : 'Create New Plan'}</h3>
                <button onClick={() => setIsModalOpen(false)} className='text-gray-500 hover:text-white'>
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className='p-6 space-y-4'>
                <div>
                   <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Plan Name</label>
                   <input 
                     required
                     type="text" 
                     className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                     placeholder="e.g. Summer Shred"
                   />
                </div>
                
                <div className='grid grid-cols-2 gap-4'>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Goal</label>
                      <select 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.goal}
                        onChange={e => setFormData({...formData, goal: e.target.value})}
                      >
                         <option value="">Select Goal...</option>
                         <option value="Muscle Gain">Muscle Gain</option>
                         <option value="Weight Loss">Weight Loss</option>
                         <option value="Strength">Strength</option>
                         <option value="Endurance">Endurance</option>
                      </select>
                   </div>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Difficulty</label>
                      <select 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.difficulty}
                        onChange={e => setFormData({...formData, difficulty: e.target.value})}
                      >
                         <option>Beginner</option>
                         <option>Intermediate</option>
                         <option>Advanced</option>
                      </select>
                   </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Duration</label>
                      <input 
                        type="text" 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.duration}
                        onChange={e => setFormData({...formData, duration: e.target.value})}
                        placeholder="e.g. 8 Weeks"
                      />
                   </div>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Days Per Week</label>
                      <input 
                        type="number" 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.daysPerWeek}
                        onChange={e => setFormData({...formData, daysPerWeek: e.target.value})}
                        placeholder="e.g. 4"
                      />
                   </div>
                </div>
                
                {/* Simplified Schedule Placeholder */}
                <div className='p-4 bg-neutral-900/50 rounded-xl border border-dashed border-neutral-700 text-center mt-4'>
                   <p className='text-sm text-gray-400 mb-2'>Detailed Schedule Builder</p>
                   <p className='text-xs text-gray-600 mb-3'>Add exercises to days (Mon-Sun) after creating the plan shell.</p>
                   <button type="button" className='text-xs font-bold text-orange-500 border border-orange-500/30 px-3 py-1.5 rounded hover:bg-orange-500 hover:text-white transition-colors'>
                      Configure Exercises
                   </button>
                </div>

                <button 
                  type="submit"
                  className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-4'
                >
                  <Save size={18} /> {selectedPlan ? 'Save Changes' : 'Create Plan'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default WorkoutPlans