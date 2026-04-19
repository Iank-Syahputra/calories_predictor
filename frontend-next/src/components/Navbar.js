'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">
              Calories<span className="text-orange-500">Predictor</span>
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Home
            </Link>
            <Link
              href="/predict"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Start Predicting
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
