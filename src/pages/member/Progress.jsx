/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  Calendar, 
  Camera, 
  Scale, 
  Ruler, 
  ChevronDown 
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

const Progress = () => {
  const [activeTab, setActiveTab] = useState('overview') // overview, photos, logs
  const [metricType, setMetricType] = useState('weight') // weight, bodyFat
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock Data: Progress History
  const [progressHistory, setProgressHistory] = useState([
    { date: '2025-01-01', weight: 88, bodyFat: 24, waist: 98, chest: 105, arm: 36 },
    { date: '2025-01-08', weight: 87.2, bodyFat: 23.5, waist: 97, chest: 105, arm: 36 },
    { date: '2025-01-15', weight: 86.5, bodyFat: 23, waist: 96, chest: 104, arm: 36.5 },
    { date: '2025-01-22', weight: 85.8, bodyFat: 22.5, waist: 95, chest: 104, arm: 36.5 },
    { date: '2025-02-01', weight: 85, bodyFat: 21, waist: 94, chest: 103, arm: 37 },
  ])

  // Mock Stats - Calculated from User Profile
  const currentStats = {
    startWeight: 88,
    currentWeight: 85,
    targetWeight: 75,
    height: 178, // cm
    bmi: 26.8 // Calculated
  }

  // Calculate Change
  const totalLost = (currentStats.startWeight - currentStats.currentWeight).toFixed(1)
  const progressPercent = Math.min(100, ((currentStats.startWeight - currentStats.currentWeight) / (currentStats.startWeight - currentStats.targetWeight)) * 100).toFixed(0)

  // Add New Entry State
  const [newEntry, setNewEntry] = useState({
    weight: '',
    bodyFat: '',
    waist: '',
    photo: null
  })

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
      className='w-full min-h-screen bg-neutral-900 text-white pb-24 px-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className='mb-8 pt-6 flex justify-between items-end'>
        <div>
          <h1 className='text-3xl font-bold'>
            <span className='text-orange-500'>Your</span>
            <span className='text-white'> Progress</span>
          </h1>
          <p className='text-gray-400 text-sm mt-1'>Track your journey one step at a time</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          className='flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold shadow-lg shadow-orange-500/20'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} /> <span className='hidden md:inline'>Log Measurement</span>
        </motion.button>
      </motion.div>

      {/* TOP STATS CARDS */}
      <motion.div variants={itemVariants} className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <StatsCard 
          label="Current Weight" 
          value={`${currentStats.currentWeight} kg`} 
          sub={`Start: ${currentStats.startWeight} kg`}
          icon={Scale}
          color="blue"
        />
        <StatsCard 
          label="Total Lost" 
          value={`${totalLost} kg`} 
          sub="Since Jan 1st"
          icon={TrendingDown}
          color="green"
        />
        <StatsCard 
          label="Current BMI" 
          value={currentStats.bmi} 
          sub="Overweight"
          icon={Activity}
          color="yellow"
        />
        <StatsCard 
          label="Goal Progress" 
          value={`${progressPercent}%`} 
          sub={`${(currentStats.currentWeight - currentStats.targetWeight).toFixed(1)} kg to go`}
          icon={TrendingUp}
          color="orange"
        />
      </motion.div>

      {/* TABS */}
      <motion.div variants={itemVariants} className='flex gap-2 mb-6 bg-neutral-800 p-1 rounded-lg w-fit'>
        {['overview', 'photos', 'logs'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${
              activeTab === tab 
                ? 'bg-neutral-700 text-white shadow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* === OVERVIEW TAB === */}
      <AnimatePresence mode='wait'>
        {activeTab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className='space-y-6'
          >
            {/* CHART SECTION */}
            <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='font-bold flex items-center gap-2'>
                  <Activity className='text-orange-500' size={18}/> 
                  {metricType === 'weight' ? 'Weight Trend' : 'Body Fat Trend'}
                </h3>
                <div className='flex gap-2'>
                  <button 
                    onClick={() => setMetricType('weight')}
                    className={`px-3 py-1 rounded text-xs font-bold ${metricType === 'weight' ? 'bg-orange-500 text-white' : 'bg-neutral-700 text-gray-400'}`}
                  >
                    Weight
                  </button>
                  <button 
                    onClick={() => setMetricType('bodyFat')}
                    className={`px-3 py-1 rounded text-xs font-bold ${metricType === 'bodyFat' ? 'bg-orange-500 text-white' : 'bg-neutral-700 text-gray-400'}`}
                  >
                    Body Fat %
                  </button>
                </div>
              </div>
              
              <div className='h-[300px] w-full'>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressHistory}>
                    <defs>
                      <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} tickFormatter={(val) => val.slice(5)} />
                    <YAxis stroke="#666" fontSize={12} domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey={metricType} 
                      stroke="#f97316" 
                      strokeWidth={3} 
                      fill="url(#colorMetric)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* BODY MEASUREMENTS */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700'>
                <h3 className='font-bold flex items-center gap-2 mb-6'>
                  <Ruler className='text-blue-500' size={18}/> Body Measurements
                </h3>
                <div className='space-y-4'>
                  <MeasurementRow label="Waist" current="94 cm" start="98 cm" change="-4 cm" />
                  <MeasurementRow label="Chest" current="103 cm" start="105 cm" change="-2 cm" />
                  <MeasurementRow label="Right Arm" current="37 cm" start="36 cm" change="+1 cm" isGain={true} />
                  <MeasurementRow label="Thighs" current="60 cm" start="58 cm" change="+2 cm" isGain={true} />
                </div>
              </div>

              {/* BMI INFO CARD */}
              <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700 flex flex-col justify-center items-center text-center'>
                 <div className='w-32 h-32 rounded-full border-8 border-neutral-700 flex items-center justify-center mb-4 relative'>
                    <div className='absolute inset-0 rounded-full border-8 border-yellow-500 border-t-transparent rotate-45' />
                    <div>
                      <span className='text-3xl font-bold text-white'>{currentStats.bmi}</span>
                      <p className='text-[10px] text-gray-400'>BMI</p>
                    </div>
                 </div>
                 <h4 className='text-lg font-bold text-yellow-500'>Overweight</h4>
                 <p className='text-sm text-gray-400 mt-2'>Your healthy weight range is <span className='text-white'>58.5kg - 79.2kg</span>. You are doing great, keep going!</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* === PHOTOS TAB === */}
        {activeTab === 'photos' && (
          <motion.div 
            key="photos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
             {/* Upload Placeholder */}
             <div className='aspect-[3/4] rounded-2xl border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer bg-neutral-800/50'>
                <Camera size={48} className='mb-2' />
                <p className='font-bold'>Add New Photo</p>
                <p className='text-xs'>Front, Side, or Back</p>
             </div>

             {/* Mock Photos */}
             <PhotoCard date="Jan 01, 2025" weight="88 kg" label="Starting Point" />
             <PhotoCard date="Feb 01, 2025" weight="85 kg" label="Current" />
          </motion.div>
        )}

        {/* === LOGS TAB === */}
        {activeTab === 'logs' && (
          <motion.div 
            key="logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden'
          >
            <table className='w-full text-left'>
              <thead className='bg-neutral-700/50 text-gray-400 text-xs uppercase font-bold'>
                <tr>
                  <th className='p-4'>Date</th>
                  <th className='p-4'>Weight</th>
                  <th className='p-4'>Body Fat</th>
                  <th className='p-4 hidden md:table-cell'>Waist</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-neutral-700 text-sm'>
                {[...progressHistory].reverse().map((log, idx) => (
                  <tr key={idx} className='hover:bg-neutral-700/30 transition-colors'>
                    <td className='p-4 font-medium text-white'>{log.date}</td>
                    <td className='p-4'>{log.weight} kg</td>
                    <td className='p-4'>{log.bodyFat}%</td>
                    <td className='p-4 hidden md:table-cell'>{log.waist} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50'
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className='bg-neutral-800 rounded-2xl border border-neutral-700 p-6 w-full max-w-md'
            >
              <h3 className='text-xl font-bold mb-4'>Log New Progress</h3>
              <div className='space-y-4'>
                <div>
                  <label className='text-xs text-gray-400 uppercase font-bold'>Current Weight (kg)</label>
                  <input type="number" className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white mt-1 outline-none focus:border-orange-500' placeholder='e.g. 84.5' />
                </div>
                <div>
                  <label className='text-xs text-gray-400 uppercase font-bold'>Waist Size (cm)</label>
                  <input type="number" className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white mt-1 outline-none focus:border-orange-500' placeholder='e.g. 93' />
                </div>
                <div>
                  <label className='text-xs text-gray-400 uppercase font-bold'>Date</label>
                  <input type="date" className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white mt-1 outline-none focus:border-orange-500' />
                </div>
              </div>
              <div className='flex gap-3 mt-6'>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className='flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold'
                >
                  Save Entry
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className='flex-1 bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-lg font-bold'
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// --- SUB COMPONENTS ---

const StatsCard = ({ label, value, sub, icon: Icon, color }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    yellow: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  }
  
  return (
    <div className={`p-4 rounded-xl border ${colors[color] || colors.blue}`}>
      <div className='flex justify-between items-start mb-2'>
        <p className='text-xs font-bold uppercase opacity-70'>{label}</p>
        <Icon size={18} />
      </div>
      <p className='text-2xl font-bold text-white'>{value}</p>
      <p className='text-[10px] opacity-70'>{sub}</p>
    </div>
  )
}

const MeasurementRow = ({ label, current, start, change, isGain }) => (
  <div className='flex items-center justify-between p-3 bg-neutral-900/50 rounded-lg border border-neutral-800'>
    <div>
      <p className='font-bold text-sm text-gray-300'>{label}</p>
      <p className='text-xs text-gray-500'>Start: {start}</p>
    </div>
    <div className='text-right'>
      <p className='font-bold text-white'>{current}</p>
      <p className={`text-xs ${isGain ? 'text-green-500' : 'text-green-500'}`}>{change}</p>
    </div>
  </div>
)

const PhotoCard = ({ date, weight, label }) => (
  <div className='aspect-[3/4] rounded-2xl overflow-hidden relative group'>
     <img 
        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
        alt="Progress" 
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
     />
     <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4'>
        <p className='font-bold text-white'>{label}</p>
        <div className='flex justify-between text-xs text-gray-300'>
           <span>{date}</span>
           <span>{weight}</span>
        </div>
     </div>
  </div>
)

export default Progress