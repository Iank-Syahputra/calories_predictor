'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Flame } from 'lucide-react';
import predictionSchema from '@/utils/validation';

export default function PredictionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(predictionSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Prediction failed');
      }

      localStorage.setItem('predictionResult', JSON.stringify(result));
      router.push('/results');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 border rounded-xl transition-all focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
        : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
    } bg-white`;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Predict Your Calories</h1>
          <p className="text-gray-600 mt-2">Enter your details to get accurate predictions</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select {...register('gender')} className={inputClass(errors.gender)}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years) *
              </label>
              <input
                type="number"
                step="1"
                placeholder="25"
                {...register('age', { valueAsNumber: true })}
                className={inputClass(errors.age)}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm) *
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="175"
                {...register('height_cm', { valueAsNumber: true })}
                className={inputClass(errors.height_cm)}
              />
              {errors.height_cm && (
                <p className="mt-1 text-sm text-red-500">{errors.height_cm.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="70"
                {...register('weight_kg', { valueAsNumber: true })}
                className={inputClass(errors.weight_kg)}
              />
              {errors.weight_kg && (
                <p className="mt-1 text-sm text-red-500">{errors.weight_kg.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="45"
                {...register('duration_min', { valueAsNumber: true })}
                className={inputClass(errors.duration_min)}
              />
              {errors.duration_min && (
                <p className="mt-1 text-sm text-red-500">{errors.duration_min.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heart Rate (bpm) *
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="140"
                {...register('heart_rate', { valueAsNumber: true })}
                className={inputClass(errors.heart_rate)}
              />
              {errors.heart_rate && (
                <p className="mt-1 text-sm text-red-500">{errors.heart_rate.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Temperature (°C) *
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="38.5"
                {...register('body_temp_c', { valueAsNumber: true })}
                className={inputClass(errors.body_temp_c)}
              />
              {errors.body_temp_c && (
                <p className="mt-1 text-sm text-red-500">{errors.body_temp_c.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white text-lg font-semibold rounded-xl transition-all hover:shadow-lg disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <Flame className="w-5 h-5 mr-2" />
                Predict Now
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
