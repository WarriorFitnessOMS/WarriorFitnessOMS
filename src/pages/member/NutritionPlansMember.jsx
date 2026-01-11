/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Utensils, 
  Flame, 
  Droplet, 
  ChevronRight, 
  Clock, 
  ChefHat,
  Apple,
  Coffee,
  Sun,
  Moon,
  Info
} from 'lucide-react'

const NutritionPlansMember = () => {
  const [activeDay, setActiveDay] = useState('Mon')
  const [waterIntake, setWaterIntake] = useState(4)

  // Mock Data: Assigned Meal Plan (No Images)
  const mealPlan = {
    name: "Fat Loss & Muscle Maintain",
    calories: "2,400",
    protein: "180g",
    carbs: "220g",
    fats: "65g",
    schedule: {
      'Mon': [
        { id: 1, type: 'breakfast', name: "Oatmeal & Whey Protein", cals: 450, time: "08:00 AM", macros: "30g P • 50g C • 10g F" },
        { id: 2, type: 'lunch', name: "Grilled Chicken Salad", cals: 650, time: "01:00 PM", macros: "45g P • 20g C • 15g F" },
        { id: 3, type: 'snack', name: "Greek Yogurt & Berries", cals: 200, time: "04:30 PM", macros: "15g P • 25g C • 0g F" },
        { id: 4, type: 'dinner', name: "Salmon & Quinoa Bowl", cals: 550, time: "08:00 PM", macros: "35g P • 40g C • 20g F" },
      ]
    }
  }

  // Helper to get visual theme based on meal type
  const getMealTheme = (type) => {
    switch(type) {
      case 'breakfast': return { icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      case 'lunch': return { icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
      case 'dinner': return { icon: Moon, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
      default: return { icon: Apple, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
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
      <motion.div variants={itemVariants} className='pt-6 mb-6'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Nutrition</h1>
            <p className='text-gray-400 text-sm'>Fuel your body right</p>
          </div>
          <div className='bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-lg flex items-center gap-2'>
            <ChefHat size={16} className='text-gray-400' />
            <span className='text-sm font-bold text-gray-300'>{mealPlan.name}</span>
          </div>
        </div>

        {/* MACRO SUMMARY CARDS */}
        <div className='grid grid-cols-4 gap-2 mb-6'>
          <MacroCard label="Calories" value={mealPlan.calories} unit="kcal" color="orange" icon={Flame} />
          <MacroCard label="Protein" value={mealPlan.protein} unit="g" color="blue" />
          <MacroCard label="Carbs" value={mealPlan.carbs} unit="g" color="green" />
          <MacroCard label="Fats" value={mealPlan.fats} unit="g" color="yellow" />
        </div>
      </motion.div>

      {/* WATER TRACKER */}
      <motion.div variants={itemVariants} className='bg-blue-900/10 border border-blue-500/20 rounded-2xl p-4 mb-8 flex items-center justify-between'>
         <div>
            <h3 className='font-bold text-blue-400 flex items-center gap-2'>
              <Droplet size={18} className='fill-blue-500'/> Hydration
            </h3>
            <p className='text-xs text-blue-300/70'>Daily Goal: 8 Glasses</p>
         </div>
         <div className='flex items-center gap-1'>
            <button 
              onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
              className='w-8 h-8 rounded-full bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center text-blue-400 font-bold'
            >
              -
            </button>
            <div className='flex gap-1 mx-2'>
               {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-8 rounded-full transition-all ${i < waterIntake ? 'bg-blue-500' : 'bg-blue-900/40'}`} 
                  />
               ))}
            </div>
            <button 
              onClick={() => setWaterIntake(Math.min(8, waterIntake + 1))}
              className='w-8 h-8 rounded-full bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center text-blue-400 font-bold'
            >
              +
            </button>
         </div>
      </motion.div>

      {/* DAY SELECTOR */}
      <motion.div variants={itemVariants} className='flex gap-3 overflow-x-auto pb-4 mb-2 no-scrollbar'>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`min-w-[60px] py-3 rounded-xl font-bold text-sm transition-all ${
              activeDay === day 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'bg-neutral-800 text-gray-500 hover:bg-neutral-700'
            }`}
          >
            {day}
          </button>
        ))}
      </motion.div>

      {/* MEAL LIST (No Images) */}
      <div className='space-y-4'>
        {mealPlan.schedule['Mon']?.map((meal) => {
          const theme = getMealTheme(meal.type)
          const Icon = theme.icon
          
          return (
            <motion.div 
              key={meal.id}
              variants={itemVariants}
              className='bg-neutral-800 rounded-xl p-5 border border-neutral-700 hover:border-neutral-600 transition-colors'
            >
              <div className='flex items-start justify-between mb-3'>
                 {/* Meal Type Badge */}
                 <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${theme.bg} border ${theme.border}`}>
                    <Icon size={14} className={theme.color} />
                    <span className={`text-xs font-bold uppercase tracking-wide ${theme.color}`}>
                       {meal.type}
                    </span>
                 </div>
                 <span className='text-xs font-bold text-gray-400 flex items-center gap-1'>
                    <Clock size={14}/> {meal.time}
                 </span>
              </div>

              {/* Meal Info */}
              <div className='mb-3'>
                 <h3 className='font-bold text-white text-lg'>{meal.name}</h3>
                 <p className='text-xs text-gray-400 mt-1 flex items-center gap-2'>
                    <Info size={12} /> {meal.macros}
                 </p>
              </div>

              {/* Footer */}
              <div className='flex items-center justify-between pt-3 border-t border-neutral-700'>
                 <span className='font-bold text-white text-sm'>
                    {meal.cals} <span className='text-gray-500 font-normal'>kcal</span>
                 </span>
                 <button className='text-xs font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1'>
                    Details <ChevronRight size={14} />
                 </button>
              </div>
            </motion.div>
          )
        })}
      </div>

    </motion.div>
  )
}

// Sub-Component for Top Cards
const MacroCard = ({ label, value, unit, color, icon: Icon }) => {
  const colors = {
    orange: "text-orange-500",
    blue: "text-blue-500",
    green: "text-green-500",
    yellow: "text-yellow-500"
  }

  return (
    <div className='bg-neutral-800 rounded-xl p-3 border border-neutral-700 text-center'>
       <p className={`text-[10px] uppercase font-bold text-gray-500 mb-1 flex items-center justify-center gap-1`}>
          {Icon && <Icon size={10} className={colors[color]} />} {label}
       </p>
       <p className={`text-lg font-bold ${colors[color]}`}>{value}</p>
       <p className='text-[10px] text-gray-400'>{unit}</p>
    </div>
  )
}

export default NutritionPlansMember