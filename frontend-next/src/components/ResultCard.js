'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, RefreshCw, Share2, User, Ruler, Scale, Timer, Heart, Thermometer } from 'lucide-react';

export default function ResultCard() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('predictionResult');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No prediction results found.</p>
        <Link href="/predict" className="text-orange-500 hover:underline mt-2 inline-block">
          Make a prediction
        </Link>
      </div>
    );
  }

  const { calories_predicted, input_data } = result;

  const tips = [
    'Stay hydrated before, during, and after exercise.',
    'Combine cardio with strength training for best results.',
    'Track your workouts consistently for better insights.',
    'Listen to your body and adjust intensity accordingly.',
  ];

  const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative inline-block"
          >
            <Flame className="w-24 h-24 text-white mx-auto" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full px-4 py-1 text-sm font-bold"
            >
              {calories_predicted} kkal
            </motion.div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mt-4"
          >
            Calories Burned!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-orange-100 mt-2"
          >
            Based on your input data
          </motion.p>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Input Data</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <User className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Gender</div>
              <div className="font-semibold text-gray-900 capitalize">{input_data.gender}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <User className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Age</div>
              <div className="font-semibold text-gray-900">{input_data.age} yrs</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Ruler className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Height</div>
              <div className="font-semibold text-gray-900">{input_data.height_cm} cm</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Scale className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Weight</div>
              <div className="font-semibold text-gray-900">{input_data.weight_kg} kg</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Timer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-semibold text-gray-900">{input_data.duration_min} min</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Heart className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Heart Rate</div>
              <div className="font-semibold text-gray-900">{input_data.heart_rate} bpm</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center col-span-2 md:col-span-2">
              <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Body Temperature</div>
              <div className="font-semibold text-gray-900">{input_data.body_temp_c} °C</div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-orange-900 mb-2">Tip of the Day</h4>
            <p className="text-orange-800">{getRandomTip()}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/predict"
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My Calories Burned Prediction',
                    text: `I just burned ${calories_predicted} calories! Try it yourself.`,
                  });
                }
              }}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
