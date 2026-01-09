/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Calendar, Trophy } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { assets } from '../assets/assets';

const Plans = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const plans = [
    {
      id: 1,
      name: "Weekly Pass",
      price: "$15",
      period: "week",
      icon: Calendar,
      features: [
        "Full gym & equipment access",
        "Locker & shower facilities, $15 / week",
        "Join any open class (space permitting)",
        "No long-term commitment",
        "Great for travelers or trying us out"
      ]
    },
    {
      id: 2,
      name: "Monthly Plan",
      price: "$45",
      period: "month",
      icon: Zap,
      popular: false,
      features: [
        "Unlimited gym & class access",
        "Locker & shower facilities",
        "1 free guest pass per month",
        "Cancel or upgrade anytime",
        "Perfect for beginners or flexible schedules"
      ]
    },
    {
      id: 3,
      name: "6-Month Plan",
      price: "$240",
      period: "save 10%",
      icon: Trophy,
      popular: true,
      features: [
        "All Monthly benefits included",
        "Free fitness check every 2 months",
        "Priority booking for group classes",
        "Discounts on protein & supplements",
        "Great for building consistency & progress"
      ]
    },
    {
      id: 4,
      name: "1-Year Plan",
      price: "$450",
      period: "save 20%",
      icon: Trophy,
      popular: false,
      features: [
        "All 6-Month benefits included",
        "2 free personal training sessions",
        "Exclusive member-only events",
        "Best value & biggest savings",
        "Perfect for committed fitness lovers"
      ]
    }
  ];

  return (
    <section className="relative bg-black py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-16 xl:px-24 2xl:px-48 overflow-hidden">

      {/* Floating Dumbbell - Only visible on large screens */}
      <motion.div
        className="hidden lg:block absolute right-0 bottom-0 z-20 pointer-events-none"
        style={{ width: '300px', height: '300px' }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={assets.floating_dumle}
          alt="Dumbbell"
          className="w-full h-full object-contain opacity-80"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(249, 115, 22, 0.3))' }}
        />
      </motion.div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-gray-900 to-black opacity-50" />

      <div className="relative z-10">
        {/* HEADING */}
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-BabesNeue text-white mb-2 md:mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Choose Your Fitness Journey
          </motion.h2>

          <motion.p
            className="text-xs sm:text-sm md:text-base lg:text-xl text-orange-500 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Flexible plans designed to match your goals and lifestyle
          </motion.p>
        </motion.div>

        {/* MOBILE & TABLET: SWIPER SLIDER */}
        <div className="lg:hidden relative">
          <style>{`
            .plans-swiper {
              padding: 20px 0 50px 0;
            }

            .plans-swiper .swiper-button-next,
            .plans-swiper .swiper-button-prev {
              color: #f97316;
              background: rgba(17, 24, 39, 0.9);
              width: 35px;
              height: 35px;
              border-radius: 50%;
              border: 2px solid #f97316;
              top: -50px;
            }

            .plans-swiper .swiper-button-next:after,
            .plans-swiper .swiper-button-prev:after {
              font-size: 14px;
              font-weight: bold;
            }

            .plans-swiper .swiper-button-next:hover,
            .plans-swiper .swiper-button-prev:hover {
              background: #f97316;
              color: white;
              box-shadow: 0 0 20px rgba(249, 115, 22, 0.6);
            }

            .plans-swiper .swiper-pagination {
              bottom: 0;
            }

            .plans-swiper .swiper-pagination-bullet {
              background: #4b5563;
              opacity: 1;
              width: 8px;
              height: 8px;
            }

            .plans-swiper .swiper-pagination-bullet-active {
              background: #f97316;
              width: 24px;
              border-radius: 10px;
            }

            @media (max-width: 640px) {
              .plans-swiper .swiper-button-next,
              .plans-swiper .swiper-button-prev {
                display: none;
              }
            }
          `}</style>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 24
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24
              }
            }}
            navigation={{
              nextEl: '.plans-swiper .swiper-button-next',
              prevEl: '.plans-swiper .swiper-button-prev'
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            loop={true}
            className="plans-swiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {plans.map((plan) => (
              <SwiperSlide key={plan.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false }}
                  className="relative"
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: false }}
                    >
                      <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-lg">
                        MOST POPULAR
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    className={`relative h-full p-4 md:p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
                      plan.popular
                        ? 'border-orange-500 bg-linear-to-b from-orange-500/10 to-gray-900/50'
                        : 'border-orange-500/50 bg-gray-900/30'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: plan.popular
                        ? '0 0 40px rgba(249, 115, 22, 0.4)'
                        : '0 0 30px rgba(249, 115, 22, 0.3)',
                      borderColor: '#f97316'
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="mb-3 md:mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center ${
                        plan.popular
                          ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                          : 'bg-orange-500/20 border-2 border-orange-500'
                      }`}>
                        <plan.icon className={`w-6 md:w-8 h-6 md:h-8 ${plan.popular ? 'text-white' : 'text-orange-500'}`} />
                      </div>
                    </motion.div>

                    {/* Plan Name */}
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{plan.name}</h3>

                    {/* Price */}
                    <div className="mb-4 md:mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-4xl font-bold text-orange-500">{plan.price}</span>
                        <span className="text-gray-400 text-xs md:text-sm">/ {plan.period}</span>
                      </div>
                      {plan.period.includes('save') && (
                        <div className="inline-block mt-2 px-2 md:px-3 py-0.5 md:py-1 bg-orange-500/20 border border-orange-500 rounded-full">
                          <span className="text-orange-500 text-xs md:text-sm font-bold">{plan.period}</span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2 md:gap-3 text-gray-300 text-xs md:text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Check className="w-4 md:w-5 h-4 md:h-5 text-orange-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      className={`w-full py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 ${
                        plan.popular
                          ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30'
                          : 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>

                    {/* Bottom glow effect */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent ${
                      plan.popular ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP: GRID LAYOUT */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </div>
                </motion.div>
              )}

              <motion.div
                className={`relative h-full p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
                  plan.popular
                    ? 'border-orange-500 bg-linear-to-b from-orange-500/10 to-gray-900/50'
                    : 'border-orange-500/50 bg-gray-900/30'
                }`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: plan.popular
                    ? '0 0 40px rgba(249, 115, 22, 0.4)'
                    : '0 0 30px rgba(249, 115, 22, 0.3)',
                  borderColor: '#f97316'
                }}
              >
                {/* Icon */}
                <motion.div
                  className="mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    plan.popular
                      ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                      : 'bg-orange-500/20 border-2 border-orange-500'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-orange-500'}`} />
                  </div>
                </motion.div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-orange-500">{plan.price}</span>
                    <span className="text-gray-400">/ {plan.period}</span>
                  </div>
                  {plan.period.includes('save') && (
                    <div className="inline-block mt-2 px-3 py-1 bg-orange-500/20 border border-orange-500 rounded-full">
                      <span className="text-orange-500 text-sm font-bold">{plan.period}</span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3 text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30'
                      : 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>

                {/* Bottom glow effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent ${
                  plan.popular ? 'opacity-100' : 'opacity-0'
                }`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;