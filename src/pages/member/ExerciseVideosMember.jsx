/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  PlayCircle, 
  X, 
  Filter, 
  Clock, 
  Dumbbell 
} from 'lucide-react'

const ExerciseVideosMember = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState(null) // For the modal player

  // Categories for filtering
  const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Cardio', 'Yoga']

  // Mock Data: This is what your Database will return
  // Note: We use "embed" links for YouTube. Backend will convert normal links to embed links.
  const videoLibrary = [
    {
      id: 1,
      title: "Perfect Bench Press Form",
      category: "Chest",
      duration: "5:30",
      difficulty: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
      url: "https://www.youtube.com/embed/rT7DgCr-3pg" // Example ID
    },
    {
      id: 2,
      title: "Squat Mastery Guide",
      category: "Legs",
      duration: "8:45",
      difficulty: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1574680096141-1cddd32e0340?q=80&w=2069&auto=format&fit=crop",
      url: "https://www.youtube.com/embed/nFAsconvW9A" 
    },
    {
      id: 3,
      title: "15 Min HIIT Cardio",
      category: "Cardio",
      duration: "15:00",
      difficulty: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2025&auto=format&fit=crop",
      url: "https://www.youtube.com/embed/ml6cT4AZdqI" 
    },
    {
      id: 4,
      title: "Dumbbell Row Tutorial",
      category: "Back",
      duration: "4:20",
      difficulty: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1603287681836-e566914d8792?q=80&w=2071&auto=format&fit=crop",
      url: "https://www.youtube.com/embed/pYcpY20QaE8" 
    },
    {
      id: 5,
      title: "Morning Yoga Stretch",
      category: "Yoga",
      duration: "20:00",
      difficulty: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=2070&auto=format&fit=crop",
      url: "https://www.youtube.com/embed/sTANio_2E0Q" 
    },
  ]

  // Filter Logic
  const filteredVideos = videoLibrary.filter(video => {
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
      className='w-full min-h-screen bg-neutral-900 text-white pb-24 px-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* HEADER & SEARCH */}
      <motion.div variants={itemVariants} className='pt-6 mb-8'>
        <h1 className='text-3xl font-bold text-white mb-6'>Exercise Library</h1>
        
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search Bar */}
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
            <input 
              type="text" 
              placeholder="Search for exercises (e.g. Squat)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-neutral-800 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-orange-500 outline-none transition-all'
            />
          </div>
          
          {/* Category Filters (Mobile Horizontal Scroll) */}
          <div className='flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar'>
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                   selectedCategory === cat 
                     ? 'bg-orange-500 text-white' 
                     : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </motion.div>

      {/* VIDEO GRID */}
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        variants={containerVariants}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <motion.div 
              key={video.id}
              variants={itemVariants}
              className='group bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-orange-500/50 transition-all cursor-pointer'
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail Container */}
              <div className='relative aspect-video bg-black'>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className='w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500' 
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-12 h-12 bg-orange-500/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform'>
                    <PlayCircle size={24} fill="white" className="text-white" />
                  </div>
                </div>
                <div className='absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-bold'>
                  {video.duration}
                </div>
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
                <h3 className='font-bold text-lg text-white group-hover:text-orange-500 transition-colors'>{video.title}</h3>
              </div>
            </motion.div>
          ))
        ) : (
          <div className='col-span-full py-12 text-center text-gray-500'>
             <Dumbbell size={48} className='mx-auto mb-4 opacity-20' />
             <p className='text-lg'>No videos found matching "{searchTerm}"</p>
             <button 
               onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}
               className='mt-2 text-orange-500 font-bold hover:underline'
             >
               Clear Filters
             </button>
          </div>
        )}
      </motion.div>

      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4'
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='w-full max-w-4xl bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl'
              onClick={e => e.stopPropagation()} // Prevent close when clicking inside
            >
              <div className='p-4 flex justify-between items-center border-b border-neutral-800'>
                 <h3 className='font-bold text-lg'>{selectedVideo.title}</h3>
                 <button 
                   onClick={() => setSelectedVideo(null)}
                   className='p-2 hover:bg-neutral-800 rounded-full transition-colors'
                 >
                   <X size={24} />
                 </button>
              </div>
              
              <div className='aspect-video w-full bg-black'>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={selectedVideo.url} 
                  title={selectedVideo.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              <div className='p-6'>
                 <div className='flex gap-4 mb-4'>
                    <span className='flex items-center gap-2 text-sm text-gray-400'>
                       <Clock size={16} className='text-orange-500'/> {selectedVideo.duration}
                    </span>
                    <span className='flex items-center gap-2 text-sm text-gray-400'>
                       <Dumbbell size={16} className='text-orange-500'/> {selectedVideo.category}
                    </span>
                 </div>
                 <p className='text-gray-400 text-sm'>
                    Master this exercise to build strength and stability. Watch closely for proper form cues regarding back alignment and grip width.
                 </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

export default ExerciseVideosMember