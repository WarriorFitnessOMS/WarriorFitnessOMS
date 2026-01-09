/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Award, Users, Star, Trophy } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Best Gym 2025",
      subtitle: "Fitness Magazine's Choice Award for Outstanding Facilities and Training Programs",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=700&fit=crop",
      icon: Trophy
    },
    {
      id: 2,
      title: "Top Trainer Team",
      subtitle: "Regional Fitness Association's Excellence in Personal Training Award",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=700&fit=crop",
      icon: Users
    },
    {
      id: 3,
      title: "5-Star Rating",
      subtitle: "Consistently rated 5-stars by our members for exceptional service",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=700&fit=crop",
      icon: Star
    },
    {
      id: 4,
      title: "Excellence Award",
      subtitle: "National recognition for innovation in fitness and wellness programs",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=700&fit=crop",
      icon: Award
    }
  ];

  return (
    <section className="w-full min-h-screen relative overflow-hidden flex items-center py-12 md:py-16 lg:py-0 lg:h-screen">
      {/* Background gym image with overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-black/90" />

      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-48 relative z-10 min-h-screen lg:h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-screen lg:h-full">
          {/* LEFT SIDE - HEADING */}
          <motion.div
            className="space-y-4 md:space-y-6 py-8 md:py-12 lg:py-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-BabesNeue leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <span className="text-white block">Our</span>
              <span className="text-orange-500 block">Honors &</span>
              <span className="text-white block">Milestones</span>
            </motion.h2>

            <motion.p
              className="text-sm md:text-base lg:text-lg xl:text-xl text-orange-500 font-semibold max-w-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
            >
              Our Recognition for excellence in fitness and training & Milestones
            </motion.p>
          </motion.div>

          {/* RIGHT SIDE - CARDS CAROUSEL */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <style>{`
              .achievements-swiper {
                padding: 20px 0 50px 0;
              }

              .achievements-swiper .swiper-slide {
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.5s ease;
              }

              .achievements-swiper .swiper-slide-active {
                z-index: 10;
                opacity: 1;
              }

              .achievements-swiper .swiper-button-next,
              .achievements-swiper .swiper-button-prev {
                color: #f97316;
                background: rgba(17, 24, 39, 0.9);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid #f97316;
                top: 50%;
                transform: translateY(-50%);
              }

              .achievements-swiper .swiper-button-next:after,
              .achievements-swiper .swiper-button-prev:after {
                font-size: 16px;
                font-weight: bold;
              }

              .achievements-swiper .swiper-button-next:hover,
              .achievements-swiper .swiper-button-prev:hover {
                background: #f97316;
                color: white;
                box-shadow: 0 0 20px rgba(249, 115, 22, 0.6);
              }

              .achievements-swiper .swiper-pagination {
                bottom: 0;
              }

              .achievements-swiper .swiper-pagination-bullet {
                background: #4b5563;
                opacity: 1;
                width: 8px;
                height: 8px;
              }

              .achievements-swiper .swiper-pagination-bullet-active {
                background: #f97316;
                width: 24px;
                border-radius: 10px;
              }

              /* Mobile - Small screens */
              @media (max-width: 640px) {
                .achievements-swiper {
                  padding: 20px 0 40px 0;
                }

                .achievements-swiper .swiper-button-next,
                .achievements-swiper .swiper-button-prev {
                  display: none;
                }

                .achievements-swiper .swiper-pagination-bullet {
                  width: 7px;
                  height: 7px;
                }

                .achievements-swiper .swiper-pagination-bullet-active {
                  width: 20px;
                }
              }

              /* Tablet - Medium screens */
              @media (min-width: 641px) and (max-width: 1024px) {
                .achievements-swiper .swiper-button-next,
                .achievements-swiper .swiper-button-prev {
                  width: 35px;
                  height: 35px;
                }

                .achievements-swiper .swiper-button-next:after,
                .achievements-swiper .swiper-button-prev:after {
                  font-size: 14px;
                }
              }

              /* Desktop - Large screens */
              @media (min-width: 1025px) {
                .achievements-swiper .swiper-button-next,
                .achievements-swiper .swiper-button-prev {
                  width: 45px;
                  height: 45px;
                }

                .achievements-swiper .swiper-button-next:after,
                .achievements-swiper .swiper-button-prev:after {
                  font-size: 18px;
                }
              }
            `}</style>

            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 80,
                depth: 200,
                modifier: 1.5,
                slideShadows: false
              }}
              navigation={true}
              pagination={{
                clickable: true,
                dynamicBullets: false
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              loop={true}
              className="achievements-swiper"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  effect: 'slide'
                },
                640: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                  effect: 'slide'
                },
                768: {
                  slidesPerView: 1.3,
                  spaceBetween: 30,
                  effect: 'coverflow'
                },
                1024: {
                  slidesPerView: 1.5,
                  spaceBetween: 40,
                  effect: 'coverflow'
                }
              }}
            >
              {achievements.map((achievement, index) => (
                <SwiperSlide key={achievement.id} style={{ width: 'auto' }}>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: false }}
                  >
                    <motion.div
                      className="relative rounded-lg overflow-hidden border-2 border-orange-500 bg-black h-125 w-72 sm:w-80 md:w-96"
                      whileHover={{ 
                        boxShadow: "0 0 40px rgba(249, 115, 22, 0.6)",
                        y: -10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background Image */}
                      <img 
                        src={achievement.image}
                        alt={achievement.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                        {/* Icon */}
                        <motion.div
                          className="mb-3 md:mb-4"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-orange-500/20 backdrop-blur-sm border-2 border-orange-500 flex items-center justify-center">
                            <achievement.icon className="w-6 md:w-7 h-6 md:h-7 text-orange-500" />
                          </div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                          {achievement.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 md:mb-4 line-clamp-3">
                          {achievement.subtitle}
                        </p>

                        {/* Bottom Line */}
                        <div className="h-1 bg-linear-to-r from-orange-500 to-transparent rounded" />
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-orange-500/0 hover:bg-orange-500/10 transition-all duration-300" />
                    </motion.div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;