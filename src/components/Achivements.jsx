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
    <section className="w-full h-screen relative overflow-hidden flex items-center">
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

      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-48 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full">
          {/* LEFT SIDE - HEADING */}
          <motion.div
            className="space-y-6 py-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <motion.h2
              className="text-5xl md:text-8xl font-BabesNeue leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <span className="text-white">Our</span>
              <br />
              <span className="text-orange-500">Honors</span>
              <span className="text-white"> &</span>
              <br />
              <span className="text-white">Milestones</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-orange-500 font-semibold max-w-lg"
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
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <style>{`
              .achievements-swiper {
                padding: 40px 0;
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

              .achievements-swiper .swiper-slide-next,
              .achievements-swiper .swiper-slide-prev {
              }

              .achievements-swiper .swiper-button-next,
              .achievements-swiper .swiper-button-prev {
                color: #f97316;
                background: rgba(17, 24, 39, 0.9);
                width: 45px;
                height: 45px;
                border-radius: 50%;
                border: 2px solid #f97316;
              }

              .achievements-swiper .swiper-button-next:after,
              .achievements-swiper .swiper-button-prev:after {
                font-size: 18px;
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
                width: 10px;
                height: 10px;
              }

              .achievements-swiper .swiper-pagination-bullet-active {
                background: #f97316;
                width: 28px;
                border-radius: 10px;
              }

              @media (max-width: 1024px) {
                .achievements-swiper .swiper-button-next,
                .achievements-swiper .swiper-button-prev {
                  width: 35px;
                  height: 35px;
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
            >
              {achievements.map((achievement, index) => (
                <SwiperSlide key={achievement.id} style={{ width: '350px' }}>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: false }}
                  >
                    <motion.div
                      className="relative h-150 rounded-lg overflow-hidden border-2 border-orange-500 bg-black"
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
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        {/* Icon */}
                        <motion.div
                          className="mb-4"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-14 h-14 rounded-full bg-orange-500/20 backdrop-blur-sm border-2 border-orange-500 flex items-center justify-center">
                            <achievement.icon className="w-7 h-7 text-orange-500" />
                          </div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-BabesNeue text-white mb-2">
                          {achievement.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
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