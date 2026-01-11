/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Flame, 
  Calendar, 
  Trophy, 
  ArrowRight, 
  Dumbbell, 
  Clock,
  TrendingUp 
} from 'lucide-react'
import { 
  BarChart, // Changed from AreaChart
  Bar,      // Changed from Area
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const MemberDashboard = () => {
  // Mock Data - Replace with API calls later
  const activityData = [
    { day: 'Mon', calories: 320, duration: 45 },
    { day: 'Tue', calories: 450, duration: 60 },
    { day: 'Wed', calories: 0, duration: 0 },
    { day: 'Thu', calories: 500, duration: 75 },
    { day: 'Fri', calories: 380, duration: 50 },
    { day: 'Sat', calories: 600, duration: 90 },
    { day: 'Sun', calories: 0, duration: 0 },
  ]

  const todayWorkout = {
    title: "Upper Body Power",
    duration: "60 min",
    exercises: 8,
    coach: "Coach Alex",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className='w-full min-h-screen bg-neutral-900 text-white pb-20'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER SECTION */}
      <motion.div variants={itemVariants} className='mb-8 pt-4 flex justify-between items-end'>
        <div>
          <h1 className='text-3xl font-bold'>
            <span className='text-white'>Hello, </span>
            <span className='text-orange-500'>John!</span>
          </h1>
          <p className='text-gray-400 text-sm mt-1'>Let's crush your goals today 💪</p>
        </div>
        <div className='bg-neutral-800 px-4 py-2 rounded-full border border-orange-500/30 flex items-center gap-2'>
          <Flame size={18} className='text-orange-500 fill-orange-500' />
          <span className='font-bold text-white'>12 Day Streak</span>
        </div>
      </motion.div>

      {/* QUICK STATS GRID */}
      <motion.div variants={itemVariants} className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        {/* Stat 1 */}
        <div className='bg-neutral-800 p-4 rounded-xl border border-neutral-700 relative overflow-hidden group hover:border-orange-500/50 transition-colors'>
          <div className='absolute -right-4 -top-4 bg-orange-500/10 w-24 h-24 rounded-full group-hover:bg-orange-500/20 transition-colors' />
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-orange-500/20 rounded-lg text-orange-500'>
              <Dumbbell size={20} />
            </div>
            <span className='text-gray-400 text-sm'>Workouts</span>
          </div>
          <p className='text-2xl font-bold text-white'>14</p>
          <p className='text-xs text-green-400'>+2 this week</p>
        </div>

        {/* Stat 2 */}
        <div className='bg-neutral-800 p-4 rounded-xl border border-neutral-700 relative overflow-hidden group hover:border-blue-500/50 transition-colors'>
          <div className='absolute -right-4 -top-4 bg-blue-500/10 w-24 h-24 rounded-full group-hover:bg-blue-500/20 transition-colors' />
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-blue-500/20 rounded-lg text-blue-500'>
              <Activity size={20} />
            </div>
            <span className='text-gray-400 text-sm'>Calories</span>
          </div>
          <p className='text-2xl font-bold text-white'>12,540</p>
          <p className='text-xs text-blue-400'>Kcal burned</p>
        </div>

        {/* Stat 3 */}
        <div className='bg-neutral-800 p-4 rounded-xl border border-neutral-700 relative overflow-hidden group hover:border-purple-500/50 transition-colors'>
          <div className='absolute -right-4 -top-4 bg-purple-500/10 w-24 h-24 rounded-full group-hover:bg-purple-500/20 transition-colors' />
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-purple-500/20 rounded-lg text-purple-500'>
              <Clock size={20} />
            </div>
            <span className='text-gray-400 text-sm'>Minutes</span>
          </div>
          <p className='text-2xl font-bold text-white'>450</p>
          <p className='text-xs text-purple-400'>Active mins</p>
        </div>

        {/* Stat 4 */}
        <div className='bg-neutral-800 p-4 rounded-xl border border-neutral-700 relative overflow-hidden group hover:border-green-500/50 transition-colors'>
          <div className='absolute -right-4 -top-4 bg-green-500/10 w-24 h-24 rounded-full group-hover:bg-green-500/20 transition-colors' />
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-green-500/20 rounded-lg text-green-500'>
              <TrendingUp size={20} />
            </div>
            <span className='text-gray-400 text-sm'>Weight</span>
          </div>
          <p className='text-2xl font-bold text-white'>85 kg</p>
          <p className='text-xs text-green-400'>-2kg this month</p>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* MAIN CONTENT - LEFT COL */}
        <div className='lg:col-span-2 space-y-8'>
          
          {/* TODAY'S WORKOUT CARD */}
          <motion.div variants={itemVariants} className='relative h-64 rounded-2xl overflow-hidden group cursor-pointer'>
            <div className='absolute inset-0 bg-gradient-to-r from-black/90 to-transparent z-10' />
            <img 
              src={todayWorkout.image} 
              alt="Workout" 
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
            <div className='absolute z-20 top-0 left-0 p-8 h-full flex flex-col justify-center'>
              <span className='inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4 w-fit'>
                TODAY'S PLAN
              </span>
              <h2 className='text-3xl font-bold text-white mb-2'>{todayWorkout.title}</h2>
              <div className='flex items-center gap-4 text-gray-300 text-sm mb-6'>
                <span className='flex items-center gap-1'><Clock size={16}/> {todayWorkout.duration}</span>
                <span className='flex items-center gap-1'><Dumbbell size={16}/> {todayWorkout.exercises} Exercises</span>
                <span className='text-orange-400'>{todayWorkout.difficulty}</span>
              </div>
              <button className='bg-white text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 w-fit hover:bg-gray-200 transition-colors'>
                Start Workout <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* ACTIVITY CHART (UPDATED TO BAR CHART) */}
          <motion.div variants={itemVariants} className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-bold'>Activity Overview</h3>
              <select className='bg-neutral-700 text-sm px-3 py-1 rounded-lg border-none outline-none'>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className='h-[250px] w-full'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: '#333', opacity: 0.4 }}
                  />
                  <Bar 
                    dataKey="calories" 
                    fill="#f97316" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* SIDEBAR - RIGHT COL */}
        <div className='space-y-6'>
          
          {/* ACTIVE CHALLENGE */}
          <motion.div variants={itemVariants} className='bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-orange-500/30'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-bold flex items-center gap-2'>
                <Trophy size={18} className='text-yellow-500' /> 
                Active Challenge
              </h3>
              <span className='text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded'>Rank #5</span>
            </div>
            <p className='text-sm text-gray-400 mb-4'>90-Day Transformation</p>
            <div className='w-full bg-neutral-700 h-2 rounded-full mb-2'>
              <div className='bg-yellow-500 h-full rounded-full' style={{ width: '65%' }} />
            </div>
            <div className='flex justify-between text-xs text-gray-500'>
              <span>Day 45</span>
              <span>Day 90</span>
            </div>
          </motion.div>

          {/* UPCOMING CLASSES */}
          <motion.div variants={itemVariants} className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700'>
            <h3 className='font-bold mb-4 flex items-center gap-2'>
              <Calendar size={18} className='text-orange-500'/> 
              Upcoming Classes
            </h3>
            <div className='space-y-4'>
              <div className='flex gap-4 items-center'>
                <div className='bg-neutral-700 p-3 rounded-lg text-center min-w-[60px]'>
                  <span className='block text-xs text-orange-500 font-bold'>OCT</span>
                  <span className='block text-xl font-bold'>24</span>
                </div>
                <div>
                  <h4 className='font-bold text-sm'>HIIT Blast</h4>
                  <p className='text-xs text-gray-400'>17:00 • Coach Sarah</p>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='bg-neutral-700 p-3 rounded-lg text-center min-w-[60px]'>
                  <span className='block text-xs text-orange-500 font-bold'>OCT</span>
                  <span className='block text-xl font-bold'>26</span>
                </div>
                <div>
                  <h4 className='font-bold text-sm'>Yoga Flow</h4>
                  <p className='text-xs text-gray-400'>09:00 • Coach Emily</p>
                </div>
              </div>
            </div>
            <button className='w-full mt-4 text-center text-sm text-orange-500 hover:text-orange-400 font-semibold'>
              View Schedule
            </button>
          </motion.div>

          {/* NUTRITION SUMMARY */}
          <motion.div variants={itemVariants} className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700'>
             <div className='flex justify-between items-center mb-4'>
                <h3 className='font-bold'>Nutrition</h3>
                <span className='text-xs text-green-400'>On Track</span>
             </div>
             <div className='flex justify-between items-center text-center'>
                <div>
                  <div className='w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center mb-1'>
                    <span className='text-xs font-bold'>120g</span>
                  </div>
                  <span className='text-xs text-gray-400'>Protein</span>
                </div>
                <div>
                  <div className='w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center mb-1'>
                    <span className='text-xs font-bold'>250g</span>
                  </div>
                  <span className='text-xs text-gray-400'>Carbs</span>
                </div>
                <div>
                  <div className='w-16 h-16 rounded-full border-4 border-yellow-500 flex items-center justify-center mb-1'>
                    <span className='text-xs font-bold'>65g</span>
                  </div>
                  <span className='text-xs text-gray-400'>Fats</span>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}

export default MemberDashboard