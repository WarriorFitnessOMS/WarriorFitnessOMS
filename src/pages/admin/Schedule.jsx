/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Calendar, Users, Clock, X, User } from 'lucide-react';

const Schedule = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('all');
  const [newSchedule, setNewSchedule] = useState({
    date: '',
    time: '',
    className: '',
    coach: '',
    capacity: 15,
    status: 'Scheduled'
  });

  const [schedules, setSchedules] = useState([
    { id: 1, date: '2026-01-12', time: '08:00 - 09:00', className: 'Morning Yoga', coach: 'John Doe', enrolled: 10, capacity: 15, status: 'Scheduled' },
    { id: 2, date: '2026-01-12', time: '09:00 - 10:00', className: 'Strength Training', coach: 'Sarah Lee', enrolled: 8, capacity: 12, status: 'Scheduled' },
    { id: 3, date: '2026-01-12', time: '17:00 - 18:00', className: 'Evening HIIT', coach: 'Mike Johnson', enrolled: 15, capacity: 15, status: 'Full' },
    { id: 4, date: '2026-01-13', time: '10:00 - 11:00', className: 'Cardio Blast', coach: 'Emily Davis', enrolled: 12, capacity: 15, status: 'Scheduled' },
    { id: 5, date: '2026-01-13', time: '18:00 - 19:00', className: 'Pilates', coach: 'Robert Wilson', enrolled: 7, capacity: 10, status: 'Scheduled' },
    { id: 6, date: '2026-01-14', time: '07:00 - 08:00', className: 'Spin Class', coach: 'Sarah Lee', enrolled: 10, capacity: 12, status: 'Scheduled' },
  ]);

  const uniqueDates = ['all', ...new Set(schedules.map(s => s.date))];

  const filteredSchedules = schedules.filter(sch => {
    const matchesSearch = sch.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sch.coach.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate === 'all' || sch.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const handleAddSchedule = () => {
    if (newSchedule.date && newSchedule.time && newSchedule.className && newSchedule.coach) {
      const newSch = { 
        id: schedules.length + 1, 
        ...newSchedule, 
        enrolled: 0 
      };
      setSchedules([newSch, ...schedules]);
      setNewSchedule({ date: '', time: '', className: '', coach: '', capacity: 15, status: 'Scheduled' });
      setShowAddForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Full': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getOccupancyPercentage = (enrolled, capacity) => {
    return (enrolled / capacity) * 100;
  };

  const getOccupancyColor = (percentage) => {
    if (percentage >= 100) return 'bg-orange-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const stats = {
    total: schedules.length,
    today: schedules.filter(s => s.date === '2026-01-12').length,
    full: schedules.filter(s => s.status === 'Full').length
  };

  return (
    <div className='w-full min-h-screen bg-neutral-900 text-white pb-8 px-4'>
      
      {/* HEADER */}
      <div className='mb-8 pt-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-bold mb-2'>
              <span className='text-orange-500'>Class</span>
              <span className='text-white'> Schedule</span>
            </h1>
            <p className='text-gray-400 text-sm'>Manage gym classes and sessions</p>
          </div>
          <motion.button
            onClick={() => setShowAddForm(true)}
            className='flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow-lg'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={20} />
            New Class
          </motion.button>
        </div>
      </div>

      {/* STATS */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-linear-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-6 border border-blue-500/20'>
          <div className='flex items-center gap-3'>
            <div className='p-3 bg-blue-500/20 rounded-lg'>
              <Calendar className='text-blue-400' size={24} />
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Total Classes</p>
              <p className='text-2xl font-bold text-white'>{stats.total}</p>
            </div>
          </div>
        </div>

        <div className='bg-linear-to-br from-green-500/10 to-green-500/5 rounded-xl p-6 border border-green-500/20'>
          <div className='flex items-center gap-3'>
            <div className='p-3 bg-green-500/20 rounded-lg'>
              <Clock className='text-green-400' size={24} />
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Today's Classes</p>
              <p className='text-2xl font-bold text-white'>{stats.today}</p>
            </div>
          </div>
        </div>

        <div className='bg-linear-to-br from-orange-500/10 to-orange-500/5 rounded-xl p-6 border border-orange-500/20'>
          <div className='flex items-center gap-3'>
            <div className='p-3 bg-orange-500/20 rounded-lg'>
              <Users className='text-orange-400' size={24} />
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Full Classes</p>
              <p className='text-2xl font-bold text-white'>{stats.full}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className='bg-neutral-800 rounded-xl p-6 border border-orange-500/20 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='text-gray-400 text-sm mb-2 block font-medium'>Search Classes</label>
            <div className='relative'>
              <Search size={18} className='absolute left-3 top-3.5 text-gray-500' />
              <input
                type='text'
                placeholder='Search by class name or coach...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors'
              />
            </div>
          </div>

          <div>
            <label className='text-gray-400 text-sm mb-2 block font-medium'>Filter by Date</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors'
            >
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {date === 'all' ? 'All Dates' : new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SCHEDULE CARDS */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {filteredSchedules.map(sch => {
          const occupancyPercent = getOccupancyPercentage(sch.enrolled, sch.capacity);
          return (
            <motion.div
              key={sch.id}
              className='bg-neutral-800 rounded-xl border border-neutral-700 hover:border-orange-500/30 transition-all overflow-hidden'
              whileHover={{ y: -2 }}
            >
              <div className='p-6'>
                {/* Top Section */}
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-white mb-1'>{sch.className}</h3>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                      <User size={14} />
                      <span>{sch.coach}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(sch.status)}`}>
                    {sch.status}
                  </span>
                </div>

                {/* Date & Time */}
                <div className='flex items-center gap-4 mb-4 text-sm'>
                  <div className='flex items-center gap-2 text-gray-300'>
                    <Calendar size={16} className='text-orange-400' />
                    <span>{new Date(sch.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className='flex items-center gap-2 text-gray-300'>
                    <Clock size={16} className='text-orange-400' />
                    <span>{sch.time}</span>
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-gray-400 text-sm'>Enrolled</span>
                    <span className='text-white text-sm font-semibold'>{sch.enrolled} / {sch.capacity}</span>
                  </div>
                  <div className='w-full bg-neutral-700 rounded-full h-2 overflow-hidden'>
                    <div 
                      className={`h-full ${getOccupancyColor(occupancyPercent)} transition-all`}
                      style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredSchedules.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-400'>No classes found</p>
        </div>
      )}

      {/* ADD SCHEDULE MODAL */}
      <AnimatePresence>
        {showAddForm && (
          <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50' onClick={() => setShowAddForm(false)}>
            <motion.div 
              className='bg-neutral-800 rounded-xl border border-orange-500/20 p-8 w-full max-w-md'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-white'>Add New Class</h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <X size={24} />
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='text-gray-400 text-sm mb-2 block'>Class Name</label>
                  <input 
                    type='text' 
                    placeholder='e.g., Morning Yoga' 
                    value={newSchedule.className} 
                    onChange={(e) => setNewSchedule({...newSchedule, className: e.target.value})} 
                    className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                  />
                </div>

                <div>
                  <label className='text-gray-400 text-sm mb-2 block'>Coach</label>
                  <input 
                    type='text' 
                    placeholder='Coach name' 
                    value={newSchedule.coach} 
                    onChange={(e) => setNewSchedule({...newSchedule, coach: e.target.value})} 
                    className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-gray-400 text-sm mb-2 block'>Date</label>
                    <input 
                      type='date' 
                      value={newSchedule.date} 
                      onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})} 
                      className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                    />
                  </div>

                  <div>
                    <label className='text-gray-400 text-sm mb-2 block'>Capacity</label>
                    <input 
                      type='number' 
                      placeholder='15' 
                      value={newSchedule.capacity} 
                      onChange={(e) => setNewSchedule({...newSchedule, capacity: parseInt(e.target.value)})} 
                      className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                    />
                  </div>
                </div>

                <div>
                  <label className='text-gray-400 text-sm mb-2 block'>Time</label>
                  <input 
                    type='text' 
                    placeholder='08:00 - 09:00' 
                    value={newSchedule.time} 
                    onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})} 
                    className='w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white text-sm focus:outline-none focus:border-orange-500'
                  />
                </div>
              </div>

              <div className='flex gap-3 mt-6'>
                <button 
                  onClick={handleAddSchedule} 
                  className='flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors'
                >
                  Add Class
                </button>
                <button 
                  onClick={() => setShowAddForm(false)} 
                  className='flex-1 px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold transition-colors'
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;