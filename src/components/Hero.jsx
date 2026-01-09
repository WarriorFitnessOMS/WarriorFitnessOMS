/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import LightEffects from './LightEffects';

const heroContent = [
  {
    title1: "Train Like a",
    title2: "Warrior",
    subtitle: "Discipline. Strength. Focus.",
  },
  {
    title1: "Strength Is",
    title2: "Earned",
    subtitle: "No shortcuts. No excuses.",
  },
  {
    title1: "Rise. Train.",
    title2: "Dominate.",
    subtitle: "Show up every single day.",
  },
  {
    title1: "Forge Your",
    title2: "Strongest Self",
    subtitle: "Every rep builds power.",
  },
  {
    title1: "Built for",
    title2: "Relentless Athletes",
    subtitle: "Push past your limits.",
  }
];

const Hero = () => {
  const [contentIndex, setContentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Rotate content
  useEffect(() => {
    const interval = setInterval(() => {
      setContentIndex((prev) => (prev + 1) % heroContent.length)
    }, 5000);

    return () => clearInterval(interval)
  }, [])

  const { title1, title2, subtitle } = heroContent[contentIndex]

  // Select video based on screen size
  const videoSource = isMobile ? assets.bg_video_mobile : assets.bg_video

  return (
    <div 
      className='min-h-screen flex flex-col items-center justify-center border relative w-full overflow-hidden'
    >
      {/* VIDEO BACKGROUND */}
      <video 
        src={videoSource}
        autoPlay
        loop
        muted
        playsInline
        className='absolute top-0 left-0 w-full h-full object-cover z-0'    
      />

      {/* FALLBACK PLACEHOLDER - In case video fails to load on mobile */}
      <div 
        className='absolute top-0 left-0 w-full h-full bg-linear-180 from-black to-transparent z-0'
      />

      {/* LIGHT EFFECTS LAYER - Between overlay and text */}
      <LightEffects />

      {/* GRADIENT OVERLAY */}
      <div
        className='absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/50 via-black/40 to-transparent z-10'
      />

      {/* HERO CONTENT */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={contentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className='relative z-20 flex flex-col items-center gap-6 md:gap-8 px-4'
        >
          <motion.img src={assets.dumbel_icon} alt="" className='w-20 h-auto'/>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className='text-5xl lg:text-7xl xl:text-8xl text-center font-BabesNeue tracking-wide font-bold text-orange-500'
          >
            {title1}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-5xl lg:text-7xl xl:text-8xl text-center font-BabesNeue tracking-wide font-bold text-orange-500'
          >
            {title2}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-white font-medium text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
          >
            {subtitle}
          </motion.p>

        </motion.div>
      </AnimatePresence>

      <button className='relative z-20 mt-10 px-4 lg:px-10 py-2 lg:py-4 bg-red-600 text-white rounded text-2xl md:text-3xl font-BabesNeue cursor-pointer hover:bg-red-500 transition-all '>
        Register Now
      </button>
    </div>
  )
}

export default Hero