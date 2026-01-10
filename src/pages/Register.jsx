/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',

    // Fitness Goals
    fitnessGoal: '',
    experienceLevel: '',

    // Health Information
    currentConditions: [],
    pastSurgeries: '',
    medications: '',
    allergies: '',
    injuries: '',

    // Gym Experience
    pastGymExperience: '',
    yearsOfExperience: '',
    previousTraining: '',

    // Lifestyle
    workoutFrequency: '',
    dietaryRestrictions: '',
    sleepHours: '',

    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    relationship: '',

    // Agreement
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.fitnessGoal) newErrors.fitnessGoal = 'Please select a fitness goal';
      if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select experience level';
    }

    if (step === 3) {
      if (!formData.pastGymExperience) newErrors.pastGymExperience = 'Please select your gym experience';
      if (!formData.workoutFrequency) newErrors.workoutFrequency = 'Please select workout frequency';
    }

    if (step === 4) {
      if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
      if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
      if (!formData.relationship) newErrors.relationship = 'Relationship is required';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
        console.log(formData);
        
      // Send to admin - you can replace this with your actual backend API
      

      /*if () {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '', email: '', password: '', confirmPassword: '', phone: '', dateOfBirth: '', gender: '',
          fitnessGoal: '', experienceLevel: '',
          currentConditions: [], pastSurgeries: '', medications: '', allergies: '', injuries: '',
          pastGymExperience: '', yearsOfExperience: '', previousTraining: '',
          workoutFrequency: '', dietaryRestrictions: '', sleepHours: '',
          emergencyContactName: '', emergencyContactPhone: '', relationship: '',
          agreeTerms: false,
        });
        setCurrentStep(1);
      }*/
    } catch (error) {
      setSubmitStatus('error');

    } finally {
      setLoading(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className='min-h-screen px-6 md:px-16 lg:px-32 xl:px-48 pt-36 pb-12 bg-linear-to-b from-black to-gray-900'>
      <motion.div
        className='p-8 md:p-10 border border-orange-500/50 rounded-lg bg-gray-900/50 backdrop-blur-sm'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* STATUS MESSAGES */}
        {submitStatus === 'success' && (
          <motion.div
            className='mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-3'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span className='text-green-300'>Registration submitted successfully! Admin will review your details.</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            className='mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className='w-5 h-5 text-red-500' />
            <span className='text-red-300'>Error submitting form. Please try again.</span>
          </motion.div>
        )}

        {/* PROGRESS INDICATOR */}
        <div className='mb-8'>
          <div className='flex justify-between mb-4'>
            {[1, 2, 3, 4].map(step => (
              <div key={step} className='flex flex-col items-center'>
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                  animate={{ scale: currentStep === step ? 1.1 : 1 }}
                >
                  {step}
                </motion.div>
                <span className='text-xs md:text-sm text-gray-400'>
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Fitness'}
                  {step === 3 && 'Health'}
                  {step === 4 && 'Emergency'}
                </span>
              </div>
            ))}
          </div>
          <div className='h-1 bg-gray-700 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-orange-500 to-red-500'
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className='space-y-6'>
          {/* STEP 1: PERSONAL INFO */}
          {currentStep === 1 && (
            <motion.div variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
              <h2 className='text-2xl font-bold text-white mb-6'>Personal Information</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Full Name *</label>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.fullName ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='John Doe'
                  />
                  {errors.fullName && <p className='text-red-400 text-sm mt-1'>{errors.fullName}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Email *</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='john@example.com'
                  />
                  {errors.email && <p className='text-red-400 text-sm mt-1'>{errors.email}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Password *</label>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.password ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='••••••••'
                  />
                  {errors.password && <p className='text-red-400 text-sm mt-1'>{errors.password}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Confirm Password *</label>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='••••••••'
                  />
                  {errors.confirmPassword && <p className='text-red-400 text-sm mt-1'>{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Phone Number *</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='+1 (555) 123-4567'
                  />
                  {errors.phone && <p className='text-red-400 text-sm mt-1'>{errors.phone}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Date of Birth *</label>
                  <input
                    type='date'
                    name='dateOfBirth'
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white focus:outline-none ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                  />
                  {errors.dateOfBirth && <p className='text-red-400 text-sm mt-1'>{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Gender *</label>
                  <select
                    name='gender'
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white focus:outline-none appearance-none cursor-pointer ${
                      errors.gender ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                  >
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </select>
                  {errors.gender && <p className='text-red-400 text-sm mt-1'>{errors.gender}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: FITNESS GOALS & EXPERIENCE */}
          {currentStep === 2 && (
            <motion.div variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
              <h2 className='text-2xl font-bold text-white mb-6'>Fitness Profile</h2>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-3'>Primary Fitness Goal *</label>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {['Muscle Gain', 'Weight Loss', 'Strength Training', 'Flexibility', 'General Health'].map(goal => (
                      <label key={goal} className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='radio'
                          name='fitnessGoal'
                          value={goal}
                          checked={formData.fitnessGoal === goal}
                          onChange={handleInputChange}
                          className='w-4 h-4 accent-orange-500'
                        />
                        <span className='text-gray-300'>{goal}</span>
                      </label>
                    ))}
                  </div>
                  {errors.fitnessGoal && <p className='text-red-400 text-sm mt-2'>{errors.fitnessGoal}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-3'>Experience Level *</label>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {['Beginner', 'Intermediate', 'Advanced', 'Professional'].map(level => (
                      <label key={level} className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='radio'
                          name='experienceLevel'
                          value={level}
                          checked={formData.experienceLevel === level}
                          onChange={handleInputChange}
                          className='w-4 h-4 accent-orange-500'
                        />
                        <span className='text-gray-300'>{level}</span>
                      </label>
                    ))}
                  </div>
                  {errors.experienceLevel && <p className='text-red-400 text-sm mt-2'>{errors.experienceLevel}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: HEALTH & LIFESTYLE */}
          {currentStep === 3 && (
            <motion.div variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
              <h2 className='text-2xl font-bold text-white mb-6'>Health & Lifestyle</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-3'>Current Health Conditions</label>
                  <div className='space-y-2'>
                    {['Diabetes', 'Heart Disease', 'High Blood Pressure', 'Asthma', 'None'].map(condition => (
                      <label key={condition} className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={formData.currentConditions.includes(condition)}
                          onChange={() => handleMultiSelect('currentConditions', condition)}
                          className='w-4 h-4 accent-orange-500 cursor-pointer'
                        />
                        <span className='text-gray-300'>{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Past Surgeries / Injuries</label>
                  <textarea
                    name='pastSurgeries'
                    value={formData.pastSurgeries}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-orange-500 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                    placeholder='Describe any past surgeries or injuries...'
                    rows='3'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Current Medications</label>
                  <textarea
                    name='medications'
                    value={formData.medications}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-orange-500 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                    placeholder='List any medications you are currently taking...'
                    rows='3'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Allergies</label>
                  <textarea
                    name='allergies'
                    value={formData.allergies}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-orange-500 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                    placeholder='List any allergies...'
                    rows='3'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-3'>Past Gym Experience *</label>
                  <div className='space-y-2'>
                    {['Never trained', 'Trained 1-2 years ago', 'Actively training', 'Professional athlete'].map(exp => (
                      <label key={exp} className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='radio'
                          name='pastGymExperience'
                          value={exp}
                          checked={formData.pastGymExperience === exp}
                          onChange={handleInputChange}
                          className='w-4 h-4 accent-orange-500'
                        />
                        <span className='text-gray-300'>{exp}</span>
                      </label>
                    ))}
                  </div>
                  {errors.pastGymExperience && <p className='text-red-400 text-sm mt-2'>{errors.pastGymExperience}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-3'>Workout Frequency *</label>
                  <div className='space-y-2'>
                    {['1-2 days/week', '3-4 days/week', '5-6 days/week', 'Daily'].map(freq => (
                      <label key={freq} className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='radio'
                          name='workoutFrequency'
                          value={freq}
                          checked={formData.workoutFrequency === freq}
                          onChange={handleInputChange}
                          className='w-4 h-4 accent-orange-500'
                        />
                        <span className='text-gray-300'>{freq}</span>
                      </label>
                    ))}
                  </div>
                  {errors.workoutFrequency && <p className='text-red-400 text-sm mt-2'>{errors.workoutFrequency}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Dietary Restrictions</label>
                  <input
                    type='text'
                    name='dietaryRestrictions'
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-orange-500 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                    placeholder='Vegan, Gluten-free, etc...'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Average Sleep Hours/Night</label>
                  <input
                    type='number'
                    name='sleepHours'
                    value={formData.sleepHours}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-orange-500 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                    placeholder='e.g., 7'
                    min='0'
                    max='24'
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: EMERGENCY CONTACT & AGREEMENT */}
          {currentStep === 4 && (
            <motion.div variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
              <h2 className='text-2xl font-bold text-white mb-6'>Emergency Contact & Agreement</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Emergency Contact Name *</label>
                  <input
                    type='text'
                    name='emergencyContactName'
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.emergencyContactName ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='John Doe'
                  />
                  {errors.emergencyContactName && <p className='text-red-400 text-sm mt-1'>{errors.emergencyContactName}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Emergency Contact Phone *</label>
                  <input
                    type='tel'
                    name='emergencyContactPhone'
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='+1 (555) 123-4567'
                  />
                  {errors.emergencyContactPhone && <p className='text-red-400 text-sm mt-1'>{errors.emergencyContactPhone}</p>}
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Relationship *</label>
                  <input
                    type='text'
                    name='relationship'
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none ${
                      errors.relationship ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder='e.g., Parent, Spouse, Friend'
                  />
                  {errors.relationship && <p className='text-red-400 text-sm mt-1'>{errors.relationship}</p>}
                </div>
              </div>

              <div className='p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg'>
                <label className='flex items-start gap-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    name='agreeTerms'
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className='w-5 h-5 mt-1 accent-orange-500 cursor-pointer'
                  />
                  <span className='text-sm text-gray-300'>
                    I agree to the gym's terms and conditions, liability waiver, and privacy policy. I confirm that all information provided is accurate and I am in good health to participate in fitness activities.
                  </span>
                </label>
                {errors.agreeTerms && <p className='text-red-400 text-sm mt-2'>{errors.agreeTerms}</p>}
              </div>
            </motion.div>
          )}

          {/* BUTTONS */}
          <div className='flex gap-4 justify-between pt-8 border-t border-gray-700'>
            {currentStep > 1 && (
              <motion.button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className='px-6 py-3 rounded-lg border border-gray-600 text-white hover:border-gray-500 transition-all duration-300'
                whileHover={{ scale: 1.02 }}
              >
                Back
              </motion.button>
            )}

            <div className='flex-1' />

            {currentStep < 4 ? (
              <motion.button
                onClick={handleNextStep}
                className='px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300'
                whileHover={{ scale: 1.02 }}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                className='px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 disabled:opacity-50'
                whileHover={{ scale: 1.02 }}
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;