import Navbar from '@/components/Navbar';
import PredictionForm from '@/components/PredictionForm';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Predict Calories - Calories Burned Prediction',
  description: 'Enter your profile and workout details to predict calories burned.',
}

export default function PredictPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PredictionForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
