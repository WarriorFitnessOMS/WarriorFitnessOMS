/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AboutUs = () => {
  // Dummy gym images
  const aboutImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1623874106686-5be2b325c8f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1637430308606-86576d8fef3c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop',
  ];

  const stats = [
    { number: '5000+', label: 'Active Members' },
    { number: '50+', label: 'Expert Trainers' },
    { number: '9+', label: 'Years Experience' },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="w-full bg-linear-to-b from-black to-gray-900 text-white">
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE - TEXT & STATS */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <div className="space-y-4">
                <motion.span
                  className="inline-block text-orange-500 font-BabesNeue text-base md:text-3xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: false }}
                >
                  ABOUT US
                </motion.span>

                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-BabesNeue leading-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  Your Ultimate <span className="text-orange-500">Fitness</span> Destination
                </motion.h2>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: false }}
                >
                  Since 2015, we've been transforming lives through world-class fitness facilities, expert guidance, and a supportive community that believes in pushing boundaries.
                </motion.p>

                <motion.p
                  className="text-gray-400 text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: false }}
                >
                  From cutting-edge equipment to certified trainers and personalized nutrition plans, we provide everything you need to achieve your fitness goals.
                </motion.p>
              </div>

              {/* STATS */}
              <motion.div
                className="grid grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
              >
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-4 md:p-6 rounded-lg bg-orange-500/20 border border-orange-500/50 hover:border-orange-500 transition-all duration-300"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">{stat.number}</p>
                    <p className="text-xs md:text-sm text-gray-300">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>


            </motion.div>

            {/* RIGHT SIDE - IMAGES GRID */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {aboutImages.map((image, idx) => (
                <motion.div
                  key={idx}
                  variants={imageVariants}
                  whileHover="hover"
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Gym facility ${idx + 1}`}
                    className="w-full h-48 md:h-56 object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;