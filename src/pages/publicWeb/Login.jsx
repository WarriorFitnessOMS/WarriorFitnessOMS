/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {

  const navigate = useNavigate()
  const { login } = useAuth()


  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
        
      //MOCK LOGIN-------------------------------------
      await new Promise(resolve => setTimeout(resolve, 1500))

      //simple logic to test different dashboard based on username
      let role = 'member';
      if (formData.username.toLowerCase().includes('admin')) role = 'admin';
      else if (formData.username.toLowerCase().includes('coach')) role = 'coach'

      // Create a fake user object
      const mockUserResponse = {
        _id : '123456',
        username : formData.username,
        role : role,
        token : 'fake-jwt-toke-xyz'
      }

      login(mockUserResponse);

      // Redirect based on role
      if (mockUserResponse.role === 'admin') {
        navigate('/admin/dashboard')
      } else if (mockUserResponse.role === 'coach'){
        navigate('/coach/dashboard')
      } else {
        navigate('/member/dashboard')
      }
      
    } catch (err) {
      setError('An error occurred. Please try again.');

    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-8 pt-36 bg-black relative overflow-hidden'>
      {/* Background Image with Overlay */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `url(${assets.login_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)'
        }}
      />

      {/* Content */}
      <motion.div
        className='w-full max-w-md z-10'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Card */}
        <motion.div
          className='p-8 md:p-10 border border-orange-500 rounded-2xl bg-white/5 backdrop-blur'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            className='flex justify-center mb-8'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className='w-24 h-24 flex items-center justify-center'>
              <img src={assets.logo} alt=""/>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className='text-4xl font-BabesNeue text-center text-orange-500 mb-2 mt-6 italic'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sign In
          </motion.h1>

          <motion.div
            className='h-1 w-16 bg-linear-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full'
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Error Message */}
          {error && (
            <motion.div
              className='mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className='w-5 h-5 text-red-500 shrink-0' />
              <span className='text-red-300 text-sm'>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <div className='space-y-6'>
            {/* Username Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className='block text-white font-medium mb-3'>Username</label>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
                placeholder='Enter your email or username'
                className='w-full px-4 py-3 rounded-lg bg-neutral-700 border-2 border-orange-500/50 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-300'
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className='block text-white font-medium mb-3'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Enter your password'
                  className='w-full px-4 py-3 rounded-lg bg-neutral-700 border-2 border-orange-500/50 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-300'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Login Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              className='w-full py-3 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Signing In...' : 'Login'}
            </motion.button>

            {/* Divider */}
            <motion.div
              className='flex items-center gap-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className='flex-1 h-px bg-gray-600' />
              <span className='text-gray-400 text-sm'>OR</span>
              <div className='flex-1 h-px bg-gray-600' />
            </motion.div>

          </div>

          {/* Footer Links */}
          <motion.div
            className='mt-8 space-y-3 text-center text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>
              <a href='#' className='text-orange-500 hover:text-orange-400 transition-colors font-medium'>
                Forgot Password ?
              </a>
            </p>
            <p className='text-gray-400'>
              Don't have an account?{' '}
              <a href='/register' className='text-orange-500 hover:text-orange-400 transition-colors font-medium'>
                Register Here
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;