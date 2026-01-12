/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Trash2, 
  PlayCircle, 
  Clock, 
  Dumbbell, 
  X,
  Save,
  Link as LinkIcon
} from 'lucide-react'

const ExerciseVideos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Categories
  const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Cardio', 'Yoga']

  // Mock Data: Videos uploaded by this coach
  const [myVideos, setMyVideos] = useState([
    {
      id: 1,
      title: "Perfect Bench Press Form",
      category: "Chest",
      duration: "5:30",
      difficulty: "Intermediate",
      url: "https://www.youtube.com/embed/rT7DgCr-3pg",
      thumbnail: "https://img.youtube.com/vi/rT7DgCr-3pg/0.jpg" 
    },
    {
      id: 2,
      title: "Squat Mastery Guide",
      category: "Legs",
      duration: "8:45",
      difficulty: "Advanced",
      url: "https://www.youtube.com/embed/nFAsconvW9A",
      thumbnail: "https://img.youtube.com/vi/nFAsconvW9A/0.jpg"
    }
  ])

  // New Video Form State
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Chest',
    difficulty: 'Beginner',
    duration: ''
  })

  // --- HELPER: Extract YouTube ID for Thumbnail ---
  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // --- ACTIONS ---
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this video?")) {
      setMyVideos(myVideos.filter(v => v.id !== id))
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    
    // Logic to convert standard YouTube link to Embed link
    const videoId = extractYoutubeId(formData.url)
    if (!videoId) {
      alert("Please enter a valid YouTube URL")
      return
    }

    const newVideo = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      difficulty: formData.difficulty,
      duration: formData.duration || "5:00",
      url: `https://www.youtube.com/embed/${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg` // Auto-fetch thumbnail
    }

    setMyVideos([newVideo, ...myVideos])
    setIsModalOpen(false)
    setFormData({ title: '', url: '', category: 'Chest', difficulty: 'Beginner', duration: '' })
  }

  // Filter Logic
  const filteredVideos = myVideos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
            <h1 className='text-3xl font-bold text-white'>My Video Library</h1>
            <p className='text-gray-400 mt-1'>Upload and manage exercise tutorials</p>
          </div>
          
          <div className='flex gap-3 w-full md:w-auto'>
            {/* Search */}
            <div className='relative flex-1 md:w-64'>
               <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={18} />
               <input 
                 type="text" 
                 placeholder="Search videos..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className='w-full bg-neutral-800 border border-neutral-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-orange-500 outline-none transition-all'
               />
            </div>
            {/* Add Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all'
            >
               <Plus size={20} /> <span className='hidden md:inline'>Add Video</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className='flex gap-2 mt-6 overflow-x-auto no-scrollbar'>
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                 selectedCategory === cat 
                   ? 'bg-orange-500 text-white border-orange-500' 
                   : 'bg-transparent text-gray-500 border-neutral-700 hover:border-gray-500'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </motion.div>

      {/* VIDEO GRID */}
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        variants={containerVariants}
      >
        {filteredVideos.map((video) => (
            <motion.div 
              key={video.id}
              variants={itemVariants}
              className='group bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-orange-500/50 transition-all relative'
            >
              {/* Thumbnail */}
              <div className='relative aspect-video bg-black'>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className='w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500' 
                />
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                  <PlayCircle size={40} className='text-white/80 group-hover:scale-110 transition-transform' />
                </div>
                <div className='absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-bold'>
                  {video.duration}
                </div>
                
                {/* Delete Button (Coach Only Feature) */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(video.id); }}
                  className='absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Info */}
              <div className='p-4'>
                <div className='flex justify-between items-start mb-2'>
                   <span className='text-xs font-bold text-orange-500 uppercase tracking-wider'>{video.category}</span>
                   <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      video.difficulty === 'Beginner' ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                      video.difficulty === 'Advanced' ? 'text-red-500 border-red-500/20 bg-red-500/10' :
                      'text-yellow-500 border-yellow-500/20 bg-yellow-500/10'
                   }`}>
                      {video.difficulty}
                   </span>
                </div>
                <h3 className='font-bold text-lg text-white mb-2 line-clamp-1'>{video.title}</h3>
                
                {/* Live Preview Link */}
                <a href={video.url} target="_blank" rel="noreferrer" className='text-xs text-gray-500 hover:text-white flex items-center gap-1'>
                   <LinkIcon size={12} /> View on YouTube
                </a>
              </div>
            </motion.div>
        ))}
      </motion.div>

      {/* ADD VIDEO MODAL */}
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
                <h3 className='font-bold text-xl'>Add New Video</h3>
                <button onClick={() => setIsModalOpen(false)} className='text-gray-500 hover:text-white'>
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className='p-6 space-y-4'>
                <div>
                   <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Video Title</label>
                   <input 
                     required
                     type="text" 
                     className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                     value={formData.title}
                     onChange={e => setFormData({...formData, title: e.target.value})}
                     placeholder="e.g. How to Deadlift"
                   />
                </div>
                
                <div>
                   <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>YouTube URL</label>
                   <div className='relative'>
                      <LinkIcon size={16} className='absolute left-3 top-3.5 text-gray-500' />
                      <input 
                        required
                        type="text" 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 pl-10 text-white focus:border-orange-500 outline-none'
                        value={formData.url}
                        onChange={e => setFormData({...formData, url: e.target.value})}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                   </div>
                   <p className='text-[10px] text-gray-500 mt-1'>We'll automatically fetch the thumbnail for you.</p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                   <div>
                      <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Category</label>
                      <select 
                        className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                         {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
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

                <div>
                   <label className='block text-xs font-bold text-gray-400 uppercase mb-1'>Duration</label>
                   <input 
                     type="text" 
                     className='w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none'
                     value={formData.duration}
                     onChange={e => setFormData({...formData, duration: e.target.value})}
                     placeholder="e.g. 5:00"
                   />
                </div>

                <button 
                  type="submit"
                  className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-2'
                >
                  <Save size={18} /> Save Video
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

export default ExerciseVideos