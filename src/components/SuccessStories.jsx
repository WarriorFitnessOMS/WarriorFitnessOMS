/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Arnold Schwarzenegger",
      transformation: "6 months transformation",
      quote: "PowerForge changed my life completely. The trainers are incredible, and the community support kept me motivated every day. I've never felt stronger or more confident!",
      beforeImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Tom Cruise",
      transformation: "6 months transformation",
      quote: "PowerForge changed my life completely. The trainers are incredible, and the community support kept me motivated every day. I've never felt stronger or more confident!",
      beforeImage: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Jhon Snow",
      transformation: "6 months transformation",
      quote: "PowerForge changed my life completely. The trainers are incredible, and the community support kept me motivated every day. I've never felt stronger or more confident!",
      beforeImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Dwayne Johnson",
      transformation: "6 months transformation",
      quote: "PowerForge changed my life completely. The trainers are incredible, and the community support kept me motivated every day. I've never felt stronger or more confident!",
      beforeImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Chris Hemsworth",
      transformation: "6 months transformation",
      quote: "PowerForge changed my life completely. The trainers are incredible, and the community support kept me motivated every day. I've never felt stronger or more confident!",
      beforeImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Ryan Reynolds",
      transformation: "6 months transformation",
      quote: "PowerForge changed my life completely. The trainers are incredible, and the community support kept me motivated every day. I've never felt stronger or more confident!",
      beforeImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-6 bg-linear-to-b from-gray-900 to-black ">
      {/* HEADING */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-BabesNeue text-white mb-3 md:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          Success Stories
        </motion.h2>

        <motion.p
          className="text-base md:text-lg lg:text-2xl font-bold text-orange-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          Real transformations from real people
        </motion.p>
      </motion.div>

      {/* CAROUSEL */}
      <div className="max-w-7xl mx-auto relative">
        <style>{`
          .success-swiper {
            padding: 0 20px;
          }

          .success-swiper .swiper-button-next,
          .success-swiper .swiper-button-prev {
            color: #f97316;
            background: rgba(17, 24, 39, 0.8);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #f97316;
            top: 50%;
            transform: translateY(-50%);
          }

          .success-swiper .swiper-button-next {
            right: 0;
          }

          .success-swiper .swiper-button-prev {
            left: 0;
          }

          .success-swiper .swiper-button-next:after,
          .success-swiper .swiper-button-prev:after {
            font-size: 16px;
            font-weight: bold;
          }

          .success-swiper .swiper-button-next:hover,
          .success-swiper .swiper-button-prev:hover {
            background: #f97316;
            color: white;
          }

          .success-swiper .swiper-pagination {
            position: relative;
            margin-top: 30px;
          }

          .success-swiper .swiper-pagination-bullet {
            background: #4b5563;
            opacity: 1;
            width: 10px;
            height: 10px;
          }

          .success-swiper .swiper-pagination-bullet-active {
            background: #f97316;
            width: 28px;
            border-radius: 10px;
          }

          @media (max-width: 640px) {
            .success-swiper {
              padding: 0 10px;
            }

            .success-swiper .swiper-button-next,
            .success-swiper .swiper-button-prev {
              width: 36px;
              height: 36px;
              display: none;
            }

            .success-swiper .swiper-button-next:after,
            .success-swiper .swiper-button-prev:after {
              font-size: 14px;
            }

            .success-swiper .swiper-pagination {
              margin-top: 20px;
            }

            .success-swiper .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
            }

            .success-swiper .swiper-pagination-bullet-active {
              width: 24px;
            }
          }

          @media (min-width: 641px) and (max-width: 1024px) {
            .success-swiper {
              padding: 0 50px;
            }
          }

          @media (min-width: 1025px) {
            .success-swiper {
              padding: 0 80px;
            }
          }
        `}</style>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
          }}
          navigation={{
            nextEl: '.success-swiper .swiper-button-next',
            prevEl: '.success-swiper .swiper-button-prev'
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
          className="success-swiper"
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="group"
              >
                <motion.div
                  className="h-full p-4 md:p-6 rounded-lg border-2 border-orange-500 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900 transition-all duration-300 flex flex-col"
                  whileHover={{
                    boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)",
                    borderColor: "rgba(249, 115, 22, 1)"
                  }}
                >
                  {/* BEFORE & AFTER IMAGES */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                    {/* BEFORE */}
                    <motion.div
                      className="relative h-32 md:h-48 bg-gray-700 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={story.beforeImage} 
                        alt={`${story.name} before`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-1 md:p-2">
                        <span className="text-orange-500 font-bold text-xs md:text-sm">BEFORE</span>
                      </div>
                    </motion.div>

                    {/* AFTER */}
                    <motion.div
                      className="relative h-32 md:h-48 bg-gray-600 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={story.afterImage} 
                        alt={`${story.name} after`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-1 md:p-2">
                        <span className="text-orange-500 font-bold text-xs md:text-sm">AFTER</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* NAME */}
                  <motion.h3
                    className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: false }}
                  >
                    {story.name}
                  </motion.h3>

                  {/* QUOTE */}
                  <motion.p
                    className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4 md:line-clamp-none md:h-20 grow"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false }}
                  >
                    "{story.quote}"
                  </motion.p>

                  {/* TRANSFORMATION TIME */}
                  <motion.div
                    className="pt-3 md:pt-4 border-t border-orange-500/30 mt-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: false }}
                  >
                    <p className="text-orange-500 font-bold text-xs md:text-sm whitespace-nowrap">
                      {story.transformation}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;