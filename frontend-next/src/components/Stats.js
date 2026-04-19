'use client';

import { motion } from 'framer-motion';
import { Database, Percent, Clock } from 'lucide-react';

const stats = [
  {
    icon: Database,
    value: '15,000',
    label: 'Training Data',
    description: 'Records used for model training',
  },
  {
    icon: Percent,
    value: '96.7%',
    label: 'Accuracy',
    description: 'R² score achieved',
  },
  {
    icon: Clock,
    value: '< 1s',
    label: 'Response Time',
    description: 'Fast prediction inference',
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-orange-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-orange-100 max-w-2xl mx-auto">
            Built with enterprise-grade machine learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-orange-100 mb-1">{stat.label}</div>
              <p className="text-sm text-orange-200">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
