/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We're open 24/7, 365 days a year. Our staffed hours are Monday-Friday 5 AM to 11 PM, Saturday-Sunday 6 AM to 10 PM. Access is available anytime with your membership card."
    },
    {
      question: "Do you offer personal training?",
      answer: "Yes! We offer personalized one-on-one training sessions with certified trainers. Whether you're a beginner or advanced athlete, our trainers will create a customized program to help you reach your fitness goals."
    },
    {
      question: "What membership options do you have?",
      answer: "We offer flexible membership plans including Weekly Pass ($15/week), Monthly Plan ($45/month), 6-Month Plan ($240 - save 10%), and 1-Year Plan ($450 - save 20%). Each plan comes with different benefits to suit your needs."
    },
    {
      question: "Do I need to bring my own towels?",
      answer: "Towels are provided free of charge to all members. We have fresh, clean towels available at the front desk and locker rooms. However, you're welcome to bring your own if you prefer."
    },
    {
      question: "Is there parking available?",
      answer: "Yes, we have ample free parking available for all members and guests. Our parking lot is well-lit and secure, with designated spots close to the entrance for your convenience."
    },
    {
      question: "Can I try a free trial before joining?",
      answer: "Absolutely! We offer a complimentary 1-day trial pass so you can experience our facilities, equipment, and atmosphere before committing to a membership. Contact us or visit in person to schedule your trial."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-black py-20 px-6 md:px-16 lg:px-24 xl:px-48 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-gray-900 to-black opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* HEADING */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-BabesNeue text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            style={{ fontStyle: 'italic' }}
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-orange-500 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Get quick answers to common questions
          </motion.p>
        </motion.div>

        {/* FAQ ITEMS */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors duration-300"
                whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
              >
                <span className="text-white font-semibold text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-orange-500 shrink-0" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-300 leading-relaxed border-t border-gray-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;