import Navbar from '@/components/Navbar';
import ResultCard from '@/components/ResultCard';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Results - Calories Burned Prediction',
  description: 'View your calories burned prediction results.',
}

export default function ResultsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResultCard />
        </div>
      </main>
      <Footer />
    </>
  );
}
