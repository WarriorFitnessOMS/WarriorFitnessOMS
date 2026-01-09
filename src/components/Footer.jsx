/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Phone, Mail } from 'lucide-react';
import { assets } from '../assets/assets';

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Success Stories', href: '#success' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Store', href: '#store' },
    { name: 'Calculators', href: '#calculators' },
    { name: 'About', href: '#about' }
  ];

  const quickLinks = [
    { name: 'Membership Plans', href: '#plans' },
    { name: 'Class Schedules', href: '#classes' },
    { name: 'Personal Training', href: '#training' },
    { name: 'Group Fitness', href: '#group' },
    { name: 'Nutrition Coaching', href: '#nutrition' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="relative bg-linear-210 from-black to-gray-800 text-white overflow-hidden">

      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-48 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* COLUMN 1 - LOGO & INFO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <img src={assets.logo} alt=""/>
              </div>
              <div>
                <div>
                    <h3 className="text-3xl font-BabesNeue text-red-500">WARRIOR </h3>
                    <h3 className="text-3xl font-BabesNeue text-white">FITNESS</h3>
                </div>
                <p className="text-sm text-gray-400">WAHARA, MADIPOLA</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="text-orange-500 font-bold text-lg mb-4">Contact</h4>
              <div className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors">
                <Phone className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm">066 5867336 / 0759863231</p>
                  <p className="text-sm">0759863231</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors">
                <Mail className="w-5 h-5 text-orange-500" />
                <p className="text-sm">warriorfitness@gmail.com</p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-orange-500 font-bold text-lg mb-4">Find Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5 text-orange-500 hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* COLUMN 2 - NAVIGATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
          >
            <h4 className="text-orange-500 font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-500 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3 - QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h4 className="text-orange-500 font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-500 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 4 - NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <h4 className="text-orange-500 font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for fitness tips, special offers, and gym updates.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <motion.button
                className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-gray-400 text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
            >
              © 2025 Warrior Fitness. All rights reserved
            </motion.p>
            <motion.div
              className="flex gap-6 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <a href="#privacy" className="text-gray-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent" />
    </footer>
  );
};

export default Footer;