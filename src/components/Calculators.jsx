/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiResult({ value: bmi, category });
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
      
      setCalorieResult(Math.round(bmr));
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
      
      setBodyFatResult(Math.max(0, Math.min(100, bodyFat)).toFixed(1));
    }
  };

  return (
    <section className="w-full relative overflow-hidden py-20 px-6 md:px-16 lg:px-24 xl:px-48">
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
            FITNESS CALCULATORS
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-orange-500 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Track your progress with our fitness calculation tools
          </motion.p>
        </motion.div>

        {/* CALCULATORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* BMI CALCULATOR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-orange-500 p-6 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">BMI Calculator</h3>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                placeholder="Height (cm)"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <motion.button
                onClick={calculateBMI}
                className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate BMI
              </motion.button>

              {bmiResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-orange-500/10 border border-orange-500 rounded-lg"
                >
                  <p className="text-white text-center">
                    <span className="text-3xl font-bold text-orange-500 block mb-1">{bmiResult.value}</span>
                    <span className="text-gray-300">{bmiResult.category}</span>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* CALORIE CALCULATOR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-orange-500 p-6 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Calorie Calculator</h3>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                placeholder="Age"
                value={calorieAge}
                onChange={(e) => setCalorieAge(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <select
                value={calorieGender}
                onChange={(e) => setCalorieGender(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="number"
                placeholder="Height (cm)"
                value={calorieHeight}
                onChange={(e) => setCalorieHeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={calorieWeight}
                onChange={(e) => setCalorieWeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <motion.button
                onClick={calculateCalories}
                className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate Daily Calorie
              </motion.button>

              {calorieResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-orange-500/10 border border-orange-500 rounded-lg"
                >
                  <p className="text-white text-center">
                    <span className="text-3xl font-bold text-orange-500 block mb-1">{calorieResult}</span>
                    <span className="text-gray-300 text-sm">calories/day</span>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* BODY FAT CALCULATOR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-orange-500 p-6 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Body Fat Calculator</h3>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                placeholder="Neck (cm)"
                value={bodyFatNeck}
                onChange={(e) => setBodyFatNeck(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <input
                type="number"
                placeholder="Waist (cm)"
                value={bodyFatWaist}
                onChange={(e) => setBodyFatWaist(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={bodyFatHeight}
                onChange={(e) => setBodyFatHeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <select
                value={bodyFatGender}
                onChange={(e) => setBodyFatGender(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <motion.button
                onClick={calculateBodyFat}
                className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate Body Fat
              </motion.button>

              {bodyFatResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-orange-500/10 border border-orange-500 rounded-lg"
                >
                  <p className="text-white text-center">
                    <span className="text-3xl font-bold text-orange-500 block mb-1">{bodyFatResult}%</span>
                    <span className="text-gray-300 text-sm">body fat</span>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Calculators;