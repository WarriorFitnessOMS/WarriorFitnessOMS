/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Utensils, 
  Trash2, 
  Edit2, 
  X,
  Save,
  Flame,
  PieChart,
  Apple
} from 'lucide-react'

const NutritionPlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Mock Data: Existing Nutrition Templates
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      name: "Aggressive Fat Loss", 
      type: "Weight Loss", 
      calories: 1800, 
      macros: { p: "40%", c: "30%", f: "30%" },
      students: 5
    },
    { 
      id: 2, 
      name: "Clean Bulk", 
      type: "Muscle Gain", 
      calories: 3200, 
      macros: { p: "30%", c: "50%", f: "20%" },
      students: 12
    },
    { 
      id: 3, 
      name: "Maintenance & Recovery", 
      type: "General Health", 
      calories: 2400, 
      macros: { p: "30%", c: "40%", f: "30%" },
      students: 8
    },
  ])

  // Form State
  const initialFormState = { name: '', type: 'Weight Loss', calories: '', p: '', c: '', f: '' }
  const [formData, setFormData] = useState(initialFormState)

  // Handlers
  const handleDelete = (id) => {
    if (window.confirm("Delete this nutrition plan?")) {
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
    setFormData({
      name: plan.name,
      type: plan.type,
      calories: plan.calories,
      p: plan.macros.p.replace('%', ''),
      c: plan.macros.c.replace('%', ''),
      f: plan.macros.f.replace('%', '')
    })
    setIsModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const newPlanData = {
      name: formData.name,
      type: formData.type,
      calories: formData.calories,
      macros: { p: `${formData.p}%`, c: `${formData.c}%`, f: `${formData.f}%` },
      students: selectedPlan ? selectedPlan.students : 0
    }

    if (selectedPlan) {
      setPlans(plans.map(p => p.id === selectedPlan.id ? { ...newPlanData, id: p.id } : p))
    } else {
      setPlans([{ ...newPlanData, id: Date.now() }, ...plans])
    }
    setIsModalOpen(false)
  }

  // Filter Logic
  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className='text-3xl font-bold text-white'>Nutrition Plans</h1>
            <p className='text-gray-400 mt-1'>Manage meal templates and macro targets</p>
          </div>
          
          <div className='flex gap-3 w-full md:w-auto'>
            {/* Search */}
            <div className='relative flex-1 md:w-64'>
               <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={18} />
               <input 
                 type="text" 
                 placeholder="Search templates..." 
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
               <Plus size={20} /> <span className='hidden md:inline'>Create Template</span>
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
            className='bg-neutral-800 rounded-2xl p-5 border border-neutral-700 hover:border-orange-500/50 transition-all group'
          >
            {/* Header */}
            <div className='flex justify-between items-start mb-4'>
               <div className='w-12 h-12 rounded-xl bg-neutral-700/50 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all'>
                  <Utensils size={24} />
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

            {/* Title & Calories */}
            <h3 className='font-bold text-xl text-white mb-1'>{plan.name}</h3>
            <div className='flex items-center gap-2 mb-4'>
               <span className='px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-neutral-700 text-gray-300 border border-neutral-600'>
                  {plan.type}
               </span>
               <span className='flex items-center gap-1 text-sm font-bold text-orange-500'>
                  <Flame size={14} /> {plan.calories} kcal
               </span>
            </div>

            {/* Macro Split Visual */}
            <div className='bg-neutral-900/50 rounded-xl p-3 border border-neutral-800 mb-4'>
               <div className='flex justify-between items-center mb-2'>
                  <span className='text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1'>
                     <PieChart size={12} /> Macro Split
                  </span>
               </div>
               <div className='flex gap-1 h-2 w-full rounded-full overflow-hidden mb-2'>
                  <div className='bg-blue-500 h-full' style={{ width: plan.macros.p }} />
                  <div className='bg-green-500 h-full' style={{ width: plan.macros.c }} />
                  <div className='bg-yellow-500 h-full' style={{ width: plan.macros.f }} />
               </div>
               <div className='flex justify-between text-xs text-gray-400'>
                  <span className='flex items-center gap-1'><div className='w-2 h-2 rounded-full bg-blue-500'/> {plan.macros.p} P</span>
                  <span className='flex items-center gap-1'><div className='w-2 h-2 rounded-full bg-green-500'/> {plan.macros.c} C</span>
                  <span className='flex items-center gap-1'><div className='w-2 h-2 rounded-full bg-yellow-500'/> {plan.macros.f} F</span>
               </div>
            </div>

            {/* Footer */}
            <div className='pt-3 border-t border-neutral-700 flex justify-between items-center'>
               <span className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                  {plan.students} Assigned
               </span>
               <span className='text-xs font-bold text-gray-400 hover:text-white cursor-pointer'>
                  View Schedule →
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
                <h3 className='font-bold text-xl'>{selectedPlan ? 'Edit Template' : 'Create Nutrition Plan'}</h3>
                <button onClick={() => setIsModalOpen(false)} className='text-gray-500 hover:text-white'>
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className='p-6 space-y-4'>
                <div>
                   <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Template Name</label>
                   <input 
                     required
                     type="text" 
                     className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                     placeholder="e.g. Low Carb Maintenance"
                   />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Goal Type</label>
                      <select 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                      >
                         <option>Weight Loss</option>
                         <option>Muscle Gain</option>
                         <option>General Health</option>
                         <option>Keto / Low Carb</option>
                      </select>
                   </div>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Daily Calories</label>
                      <div className='relative'>
                         <input 
                           required
                           type="number" 
                           className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                           value={formData.calories}
                           onChange={e => setFormData({...formData, calories: e.target.value})}
                           placeholder="2000"
                         />
                         <span className='absolute right-3 top-3 text-xs text-gray-500 font-bold'>kcal</span>
                      </div>
                   </div>
                </div>

                {/* Macro Inputs */}
                <div className='bg-neutral-900/50 p-4 rounded-xl border border-neutral-800'>
                   <p className='text-xs font-bold text-gray-400 uppercase mb-3'>Macro Targets (%)</p>
                   <div className='flex gap-4'>
                      <div>
                         <label className='block text-[10px] text-blue-400 mb-1'>Protein</label>
                         <input 
                           type="number" 
                           className='w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white text-center focus:border-blue-500 outline-none'
                           value={formData.p}
                           onChange={e => setFormData({...formData, p: e.target.value})}
                           placeholder="30"
                         />
                      </div>
                      <div>
                         <label className='block text-[10px] text-green-400 mb-1'>Carbs</label>
                         <input 
                           type="number" 
                           className='w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white text-center focus:border-green-500 outline-none'
                           value={formData.c}
                           onChange={e => setFormData({...formData, c: e.target.value})}
                           placeholder="40"
                         />
                      </div>
                      <div>
                         <label className='block text-[10px] text-yellow-400 mb-1'>Fats</label>
                         <input 
                           type="number" 
                           className='w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white text-center focus:border-yellow-500 outline-none'
                           value={formData.f}
                           onChange={e => setFormData({...formData, f: e.target.value})}
                           placeholder="30"
                         />
                      </div>
                   </div>
                </div>

                <div className='p-4 bg-neutral-900/50 rounded-xl border border-dashed border-neutral-700 text-center'>
                   <p className='text-sm text-gray-400 mb-2'>Meal Schedule</p>
                   <p className='text-xs text-gray-600 mb-3'>Add specific meals (Breakfast, Lunch...) after saving the macro targets.</p>
                   <button type="button" className='text-xs font-bold text-orange-500 border border-orange-500/30 px-3 py-1.5 rounded hover:bg-orange-500 hover:text-white transition-colors'>
                      Configure Meals
                   </button>
                </div>

                <button 
                  type="submit"
                  className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-2'
                >
                  <Save size={18} /> {selectedPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default NutritionPlans