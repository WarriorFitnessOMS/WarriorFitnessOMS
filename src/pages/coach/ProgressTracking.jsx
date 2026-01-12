/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  Calendar, 
  ChevronDown,
  User,
  Ruler,
  Scale
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

const ProgressTracking = () => {
  const [selectedStudent, setSelectedStudent] = useState(1)
  const [timeRange, setTimeRange] = useState('1M')

  // Mock Data: Students List
  const students = [
    { id: 1, name: "Mike Ross", goal: "Muscle Gain", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" },
    { id: 2, name: "Sarah Smith", goal: "Fat Loss", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, name: "John Doe", goal: "Strength", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop" },
  ]

  // Mock Data: Progress Logs (Would come from DB based on selectedStudent)
  const progressData = {
    stats: {
      startWeight: "88 kg",
      currentWeight: "84.5 kg",
      change: "-3.5 kg",
      workoutsCompleted: 24,
      adherence: "92%"
    },
    weightHistory: [
      { date: 'Jan 1', weight: 88, bodyFat: 24 },
      { date: 'Jan 8', weight: 87.2, bodyFat: 23.5 },
      { date: 'Jan 15', weight: 86.5, bodyFat: 23 },
      { date: 'Jan 22', weight: 85.8, bodyFat: 22.5 },
      { date: 'Feb 1', weight: 84.5, bodyFat: 21 },
    ],
    measurements: [
      { part: "Waist", start: "98 cm", current: "94 cm", change: "-4 cm", status: "good" },
      { part: "Chest", start: "105 cm", current: "103 cm", change: "-2 cm", status: "good" },
      { part: "Arms", start: "36 cm", current: "37.5 cm", change: "+1.5 cm", status: "great" },
    ]
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
      className='w-full min-h-screen bg-neutral-900 text-white pb-12 px-6'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER & STUDENT SELECTOR */}
      <motion.div variants={itemVariants} className='pt-8 mb-8'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Progress Tracking</h1>
            <p className='text-gray-400 mt-1'>Analyze student performance and body metrics</p>
          </div>

          {/* Student Dropdown */}
          <div className='relative w-full md:w-72'>
             <div className='absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none'>
                <User size={18} />
             </div>
             <select 
               value={selectedStudent}
               onChange={(e) => setSelectedStudent(Number(e.target.value))}
               className='w-full bg-neutral-800 border border-neutral-700 text-white text-sm rounded-xl py-3 pl-10 pr-10 appearance-none outline-none focus:border-orange-500 cursor-pointer font-bold'
             >
               {students.map(s => (
                 <option key={s.id} value={s.id}>{s.name} - {s.goal}</option>
               ))}
             </select>
             <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'>
                <ChevronDown size={18} />
             </div>
          </div>
        </div>
      </motion.div>

      {/* QUICK STATS ROW */}
      <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
         <StatCard label="Current Weight" value={progressData.stats.currentWeight} sub={`Started at ${progressData.stats.startWeight}`} icon={Scale} color="blue" />
         <StatCard label="Total Change" value={progressData.stats.change} sub="Since starting plan" icon={TrendingDown} color="green" />
         <StatCard label="Workouts Done" value={progressData.stats.workoutsCompleted} sub="This month" icon={Activity} color="orange" />
         <StatCard label="Plan Adherence" value={progressData.stats.adherence} sub="Consistency score" icon={Calendar} color="purple" />
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        {/* LEFT: CHART SECTION */}
        <motion.div variants={itemVariants} className='lg:col-span-2 space-y-6'>
           <div className='bg-neutral-800 rounded-xl p-6 border border-neutral-700'>
              <div className='flex justify-between items-center mb-6'>
                 <h3 className='font-bold text-white flex items-center gap-2'>
                    <Activity size={20} className='text-orange-500' /> Weight Trend
                 </h3>
                 <div className='flex gap-2 bg-neutral-900 p-1 rounded-lg'>
                    {['1M', '3M', '6M', 'YTD'].map(t => (
                       <button 
                         key={t}
                         onClick={() => setTimeRange(t)}
                         className={`text-xs font-bold px-3 py-1 rounded transition-colors ${
                           timeRange === t ? 'bg-neutral-700 text-white' : 'text-gray-500 hover:text-gray-300'
                         }`}
                       >
                          {t}
                       </button>
                    ))}
                 </div>
              </div>
              
              <div className='h-[300px] w-full'>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={progressData.weightHistory}>
                       <defs>
                          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                       <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#f97316" 
                          strokeWidth={3}
                          fill="url(#colorWeight)" 
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </motion.div>

        {/* RIGHT: BODY MEASUREMENTS */}
        <motion.div variants={itemVariants} className='space-y-6'>
           <div className='bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden'>
              <div className='p-5 border-b border-neutral-700'>
                 <h3 className='font-bold text-white flex items-center gap-2'>
                    <Ruler size={20} className='text-blue-500' /> Body Measurements
                 </h3>
              </div>
              <div className='divide-y divide-neutral-700'>
                 {progressData.measurements.map((item, idx) => (
                    <div key={idx} className='p-4 flex justify-between items-center hover:bg-neutral-700/30 transition-colors'>
                       <div>
                          <p className='text-sm font-bold text-white'>{item.part}</p>
                          <p className='text-xs text-gray-500'>Start: {item.start} → Now: {item.current}</p>
                       </div>
                       <div className={`text-sm font-bold ${
                          item.status === 'good' ? 'text-green-500' : 'text-blue-500'
                       }`}>
                          {item.change}
                       </div>
                    </div>
                 ))}
              </div>
              <div className='p-4'>
                 <button className='w-full py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-bold rounded-lg transition-colors'>
                    View Full History
                 </button>
              </div>
           </div>

           {/* COACH NOTES (Private) */}
           <div className='bg-neutral-800 rounded-xl border border-neutral-700 p-5'>
              <p className='text-xs font-bold text-gray-500 uppercase mb-2'>Private Coach Notes</p>
              <textarea 
                 className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none resize-none'
                 rows="4"
                 placeholder="Write private notes about this student's progress..."
              ></textarea>
              <button className='mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors'>
                 Save Note
              </button>
           </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

// --- SUB COMPONENTS ---

const StatCard = ({ label, value, sub, icon: Icon, color }) => {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-green-500 bg-green-500/10",
    orange: "text-orange-500 bg-orange-500/10",
    purple: "text-purple-500 bg-purple-500/10",
  }

  return (
    <div className='bg-neutral-800 p-5 rounded-xl border border-neutral-700'>
       <div className='flex justify-between items-start mb-2'>
          <p className='text-xs font-bold text-gray-400 uppercase'>{label}</p>
          <div className={`p-2 rounded-lg ${colors[color]}`}>
             <Icon size={18} />
          </div>
       </div>
       <p className='text-2xl font-bold text-white mb-1'>{value}</p>
       <p className='text-[10px] text-gray-500'>{sub}</p>
    </div>
  )
}

export default ProgressTracking