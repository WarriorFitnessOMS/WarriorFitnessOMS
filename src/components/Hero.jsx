/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AnimatePresence, easeOut, motion }from 'framer-motion'
import LightEffects from './LightEffects';

const heroContent = [
    {
      title: "Train Like a Warrior",
      subtitle: "Discipline, strength, and consistency define champions."
    },
    {
      title: "Strength Is Earned",
      subtitle: "No shortcuts. No excuses. Just real results."
    },
    {
      title: "Rise. Train. Dominate.",
      subtitle: "Turn effort into unstoppable momentum."
    },
    {
      title: "Forge Your Strongest Self",
      subtitle: "Every rep builds power. Every day builds character."
    },
    {
      title: "Built for Those Who Never Quit",
      subtitle: "Push past limits and redefine what’s possible."
    }
  ];


const Hero = () => {

    const [contentIndex, setContentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setContentIndex((prev) => (prev + 1) % heroContent.length)
        }, 5000);

        return () => clearInterval(interval)

    }, [])

    const { title, subtitle } = heroContent[contentIndex]
    

  return (
    <div 
        className='min-h-screen flex items-center justify-center border relative w-full'
    >
        <video 
            src={assets.bg_video}
            autoPlay
            loop
            muted
            playsInline
            className='absolute top-0 left-0 w-full h-full object-cover z-1'    
        />

        {/* LIGHT EFFECTS LAYER - Between black overlay and text */}
        <LightEffects />

        <div
            className='absolute top-0 left-0 w-full h-full bg-linear-180 from-black to-transparent z-10'
        />

        <AnimatePresence mode='wait'>
            <motion.div
                key={contentIndex}
                initial={{ opacity : 0, y : 20}}
                animate={{ opacity : 1, y : 1}}
                exit={{ opacity : 0, y : -20}}
                transition={{duration : 0.6}}
                className='relative z-10 flex flex-col items-center gap-4'
            >

                <motion.h2
                    initial={{ opacity : 0, y : 20}}
                    animate={{ opacity : 1, y : 1}}
                    exit={{ opacity : 0, y : -20}}
                    transition={{duration : 0.6}}
                    className='text-8xl font-bold font-BabesNeue tracking-wider text-orange-500'
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ opacity : 0, y : 20}}
                    animate={{ opacity : 1, y : 1}}
                    exit={{ opacity : 0, y : -20}}
                    transition={{duration : 0.6, delay : 0.4}}
                    className='text-white font-medium text-2xl'
                >
                    {subtitle}
                </motion.p>

            </motion.div>
        </AnimatePresence>
      
    </div>
  )
}

export default Hero
