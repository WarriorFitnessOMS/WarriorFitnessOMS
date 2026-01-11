/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Camera, 
  Save, 
  Edit2, 
  Lock, 
  Activity, 
  HeartPulse, 
  AlertCircle 
} from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  // Mock User Data
  const [user, setUser] = useState({
    fullName: "John Doe",
    username: "john_warrior",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2025-01-15",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop",
    
    // Personal Details
    dob: "1995-08-24",
    gender: "Male",
    address: "123 Fitness Blvd, Gym City",
    
    // Physical Stats
    height: "178", // cm
    weight: "82",  // kg
    bloodType: "O+",
    fitnessGoal: "Muscle Gain",
    activityLevel: "Active (3-4 days/week)",
    
    // Health Info (Read Only)
    allergies: "Peanuts",
    conditions: "None"
  })

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // API Call to update profile would go here
    setIsEditing(false)
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
      className='w-full min-h-screen bg-neutral-900 text-white pb-20 px-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER / COVER SECTION */}
      <motion.div variants={itemVariants} className='mb-8 pt-6'>
        <div className='relative bg-neutral-800 rounded-2xl p-6 border border-orange-500/20 overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-500/20 to-red-600/20' />
          
          <div className='relative flex flex-col md:flex-row items-center gap-6 mt-4'>
            {/* Avatar */}
            <div className='relative'>
              <div className='w-32 h-32 rounded-full border-4 border-neutral-900 overflow-hidden'>
                <img src={user.avatar} alt="Profile" className='w-full h-full object-cover' />
              </div>
              <button className='absolute bottom-0 right-0 p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors shadow-lg'>
                <Camera size={18} />
              </button>
            </div>

            {/* Name & Quick Actions */}
            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-3xl font-bold text-white'>{user.fullName}</h1>
              <p className='text-gray-400'>@{user.username} • Member since {new Date(user.joinDate).getFullYear()}</p>
              
              <div className='flex gap-3 justify-center md:justify-start mt-4'>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    isEditing 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
                      : 'bg-neutral-700 text-white hover:bg-neutral-600'
                  }`}
                >
                  {isEditing ? <><Activity size={18}/> Cancel Editing</> : <><Edit2 size={18}/> Edit Profile</>}
                </button>
                
                {isEditing && (
                  <button 
                    onClick={handleSave}
                    className='flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20'
                  >
                    <Save size={18} /> Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TABS NAVIGATION */}
      <motion.div variants={itemVariants} className='flex gap-4 mb-6 border-b border-neutral-800 pb-1 overflow-x-auto'>
        {['personal', 'physical', 'account'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold capitalize transition-colors relative ${
              activeTab === tab ? 'text-orange-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab} Details
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab" 
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500' 
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* TAB CONTENT */}
      <AnimatePresence mode='wait'>
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className='grid grid-cols-1 md:grid-cols-2 gap-6'
        >
          {/* ================= PERSONAL TAB ================= */}
          {activeTab === 'personal' && (
            <>
              <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-4'>
                <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
                  <User size={20} className='text-orange-500'/> Basic Information
                </h3>
                <InputField 
                  label="Full Name" 
                  name="fullName" 
                  value={user.fullName} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  icon={User}
                />
                <InputField 
                  label="Date of Birth" 
                  name="dob" 
                  type="date"
                  value={user.dob} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  icon={Calendar}
                />
                <InputField 
                  label="Gender" 
                  name="gender" 
                  value={user.gender} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  icon={User}
                />
              </div>

              <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-4'>
                <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
                  <Phone size={20} className='text-orange-500'/> Contact Details
                </h3>
                <InputField 
                  label="Email Address" 
                  name="email" 
                  value={user.email} 
                  onChange={handleChange} 
                  disabled={true} 
                  icon={Mail}
                />
                <InputField 
                  label="Phone Number" 
                  name="phone" 
                  value={user.phone} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  icon={Phone}
                />
                <InputField 
                  label="Address" 
                  name="address" 
                  value={user.address} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  icon={MapPin}
                />
              </div>
            </>
          )}

          {/* ================= PHYSICAL TAB ================= */}
          {activeTab === 'physical' && (
            <>
              <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-4'>
                <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
                  <Activity size={20} className='text-blue-500'/> Body Stats
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <InputField 
                    label="Height (cm)" 
                    name="height" 
                    value={user.height} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                  <InputField 
                    label="Weight (kg)" 
                    name="weight" 
                    value={user.weight} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <InputField 
                  label="Blood Type" 
                  name="bloodType" 
                  value={user.bloodType} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>

              <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-4'>
                <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
                  <HeartPulse size={20} className='text-red-500'/> Health & Goals
                </h3>
                <InputField 
                  label="Fitness Goal" 
                  name="fitnessGoal" 
                  value={user.fitnessGoal} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
                <div className='p-4 bg-red-500/10 border border-red-500/30 rounded-xl'>
                   <div className='flex items-center gap-2 text-red-400 mb-2'>
                      <AlertCircle size={16} /> <span className='font-bold text-sm'>Medical Alert</span>
                   </div>
                   <p className='text-sm text-gray-300'>
                     <span className='text-gray-500 font-semibold'>Allergies:</span> {user.allergies}
                   </p>
                   <p className='text-sm text-gray-300'>
                     <span className='text-gray-500 font-semibold'>Conditions:</span> {user.conditions}
                   </p>
                   <p className='text-xs text-red-400/60 mt-2'>*Contact admin to update medical info</p>
                </div>
              </div>
            </>
          )}

          {/* ================= ACCOUNT TAB ================= */}
          {activeTab === 'account' && (
            <div className='col-span-1 md:col-span-2 space-y-6'>
               <div className='bg-neutral-800 p-6 rounded-2xl border border-neutral-700'>
                  <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
                    <Lock size={20} className='text-orange-500'/> Security
                  </h3>
                  <div className='flex items-center justify-between p-4 bg-neutral-700/50 rounded-xl'>
                     <div>
                       <p className='font-bold text-white'>Password</p>
                       <p className='text-sm text-gray-400'>Last changed 3 months ago</p>
                     </div>
                     <button className='px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-semibold'>
                        Change Password
                     </button>
                  </div>
               </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// Reusable Input Component
const InputField = ({ label, name, value, onChange, disabled, type = "text", icon: Icon }) => (
  <div className='space-y-1'>
    <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>{label}</label>
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
      disabled 
        ? 'bg-neutral-900 border-neutral-800 text-gray-400' 
        : 'bg-neutral-700 border-neutral-600 text-white focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/50'
    }`}>
      {Icon && <Icon size={18} className={disabled ? 'text-gray-600' : 'text-orange-500'} />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className='bg-transparent w-full outline-none text-sm font-medium placeholder-gray-600'
      />
    </div>
  </div>
)

export default Profile