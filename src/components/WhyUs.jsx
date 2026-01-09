/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Apple, Users, Heart, icons } from 'lucide-react';
import { assets } from '../assets/assets';

const WhyUs = () => {

  const whyUsData = [
    {
      id: 1,
      title: "Modern Equipments",
      description: "Train with the latest machines and gear designed for maximum results.",
      color: "from-orange-500 to-red-500",
      icon : assets.feature_icon_01
    },
    {
      id: 2,
      title: "Nutrition Guidance",
      description: "Meal plans and advice that complement your training.",
      color: "from-orange-500 to-red-500",
      icon : assets.feature_icon_02
    },
    {
      id: 3,
      title: "Expert Trainers",
      description: "Work with certified professionals who guide you every step of the way.",
      color: "from-orange-500 to-red-500",
      icon : assets.feature_icon_03

    },
    {
      id: 4,
      title: "Supportive Community",
      description: "Stay motivated with a fitness family that pushes you forward.",
      color: "from-orange-500 to-red-500",
      icon : assets.feature_icon_04

    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="w-full py-10 md:py-16 lg:py-20 px-4 md:px-6 bg-orange-500">
      {/* HEADING */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-8 md:mb-12 lg:mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-BabesNeue text-black mb-2 md:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          WHY CHOOSE US
        </motion.h2>
        
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-2xl font-medium text-white tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          PUSH YOUR LIMITS FORWARD
        </motion.p>
      </motion.div>

      {/* CARDS GRID */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {whyUsData.map((item) => {

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className="h-full flex flex-col items-center text-center p-4 md:p-6 lg:p-8 rounded-lg bg-black/40 backdrop-blur-sm border-2 border-black hover:border-orange-400 transition-all duration-300 cursor-pointer"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* ICON CIRCLE */}
                <motion.div
                  className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 p-2 rounded-full bg-black flex items-center justify-center mb-3 md:mb-4 lg:mb-6"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <img src={item.icon} alt=""/>
                </motion.div>

                {/* TITLE */}
                <motion.h3
                  className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 font-BabesNeue tracking-wide"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: false }}
                >
                  {item.title}
                </motion.h3>

                {/* DESCRIPTION */}
                <motion.p
                  className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default WhyUs;