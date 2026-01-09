/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Activity, Zap } from 'lucide-react';

const Calculators = () => {
  // BMI Calculator State
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // Calorie Calculator State
  const [calorieAge, setCalorieAge] = useState('');
  const [calorieGender, setCalorieGender] = useState('male');
  const [calorieHeight, setCalorieHeight] = useState('');
  const [calorieWeight, setCalorieWeight] = useState('');
  const [calorieResult, setCalorieResult] = useState(null);

  // Body Fat Calculator State
  const [bodyFatNeck, setBodyFatNeck] = useState('');
  const [bodyFatWaist, setBodyFatWaist] = useState('');
  const [bodyFatHeight, setBodyFatHeight] = useState('');
  const [bodyFatGender, setBodyFatGender] = useState('male');
  const [bodyFatResult, setBodyFatResult] = useState(null);

  // BMI Calculation
  const calculateBMI = () => {
    if (bmiHeight && bmiWeight) {
      const heightInMeters = parseFloat(bmiHeight) / 100;
      const weightInKg = parseFloat(bmiWeight);
      const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      
      let category = '';
      let color = '';
      
      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-400';
      } else if (bmi < 25) {
        category = 'Normal';
        color = 'text-green-400';
      } else if (bmi < 30) {
        category = 'Overweight';
        color = 'text-yellow-400';
      } else {
        category = 'Obese';
        color = 'text-red-400';
      }
      
      setBmiResult({ value: bmi, category, color });
    }
  };

  // Calorie Calculation (Mifflin-St Jeor Equation)
  const calculateCalories = () => {
    if (calorieAge && calorieHeight && calorieWeight) {
      const weight = parseFloat(calorieWeight);
      const height = parseFloat(calorieHeight);
      const age = parseFloat(calorieAge);
      
      let bmr;
      if (calorieGender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      
      const maintenance = Math.round(bmr * 1.55);
      
      setCalorieResult({
        maintenance
      });
    }
  };

  // Body Fat Calculation (US Navy Method)
  const calculateBodyFat = () => {
    if (bodyFatNeck && bodyFatWaist && bodyFatHeight) {
      const neck = parseFloat(bodyFatNeck);
      const waist = parseFloat(bodyFatWaist);
      const height = parseFloat(bodyFatHeight);
      
      let bodyFat;
      if (bodyFatGender === 'male') {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + 0 - neck) + 0.22100 * Math.log10(height)) - 450;
      }
      
      const percentage = Math.max(0, Math.min(100, bodyFat)).toFixed(1);
      
      setBodyFatResult({ percentage });
    }
  };

  return (
    <section className="w-full relative overflow-hidden py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-16 xl:px-24 2xl:px-48">
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

      <div className="relative z-10 max-w-7xl mx-auto">
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
            FITNESS CALCULATORS
          </motion.h2>

          <motion.p
            className="text-xs sm:text-sm md:text-base lg:text-xl text-orange-500 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Track your progress with our fitness calculation tools
          </motion.p>
        </motion.div>

        {/* CALCULATORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* BMI CALCULATOR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-orange-500 p-4 md:p-6 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white">BMI Calculator</h3>
            </div>

            <div className="space-y-3 md:space-y-4">
              <input
                type="number"
                placeholder="Height (cm)"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <motion.button
                onClick={calculateBMI}
                className="w-full py-2 md:py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate BMI
              </motion.button>

              <AnimatePresence>
                {bmiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 md:p-4 bg-gray-800/50 rounded-lg border border-orange-500/30"
                  >
                    <p className="text-gray-300 text-xs md:text-sm mb-2">Your BMI</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl md:text-3xl font-bold ${bmiResult.color}`}>
                        {bmiResult.value}
                      </span>
                      <span className="text-orange-400 text-sm md:text-base font-semibold">
                        {bmiResult.category}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CALORIE CALCULATOR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-orange-500 p-4 md:p-6 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white">Calorie Calculator</h3>
            </div>

            <div className="space-y-3 md:space-y-4">
              <input
                type="number"
                placeholder="Age"
                value={calorieAge}
                onChange={(e) => setCalorieAge(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <select
                value={calorieGender}
                onChange={(e) => setCalorieGender(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="number"
                placeholder="Height (cm)"
                value={calorieHeight}
                onChange={(e) => setCalorieHeight(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={calorieWeight}
                onChange={(e) => setCalorieWeight(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <motion.button
                onClick={calculateCalories}
                className="w-full py-2 md:py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate Daily Calorie
              </motion.button>

              <AnimatePresence>
                {calorieResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 md:p-4 bg-gray-800/50 rounded-lg border border-orange-500/30"
                  >
                    <p className="text-gray-300 text-xs md:text-sm mb-2">Daily Calorie Maintenance</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl md:text-3xl font-bold text-orange-400">
                        {calorieResult.maintenance}
                      </span>
                      <span className="text-gray-400 text-sm md:text-base">
                        kcal/day
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* BODY FAT CALCULATOR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-orange-500 p-4 md:p-6 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white">Body Fat Calculator</h3>
            </div>

            <div className="space-y-3 md:space-y-4">
              <input
                type="number"
                placeholder="Neck (cm)"
                value={bodyFatNeck}
                onChange={(e) => setBodyFatNeck(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <input
                type="number"
                placeholder="Waist (cm)"
                value={bodyFatWaist}
                onChange={(e) => setBodyFatWaist(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={bodyFatHeight}
                onChange={(e) => setBodyFatHeight(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              />
              <select
                value={bodyFatGender}
                onChange={(e) => setBodyFatGender(e.target.value)}
                className="w-full px-4 py-2 md:py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors text-sm md:text-base"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <motion.button
                onClick={calculateBodyFat}
                className="w-full py-2 md:py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate Body Fat
              </motion.button>

              <AnimatePresence>
                {bodyFatResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 md:p-4 bg-gray-800/50 rounded-lg border border-orange-500/30"
                  >
                    <p className="text-gray-300 text-xs md:text-sm mb-2">Your Body Fat</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl md:text-3xl font-bold text-orange-400">
                        {bodyFatResult.percentage}%
                      </span>
                      <span className="text-gray-400 text-sm md:text-base">
                        Body Fat
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Calculators;