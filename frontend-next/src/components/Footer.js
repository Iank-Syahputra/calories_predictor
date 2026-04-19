'use client';

import { Flame } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-lg font-bold text-white">
                Calories<span className="text-orange-500">Predictor</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Accurate calories burned prediction using machine learning with 96.7% accuracy.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="/predict" className="hover:text-orange-500 transition-colors">Predict</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-400">
              Built with Next.js & FastAPI<br />
              Machine Learning: Random Forest
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Calories Predictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
