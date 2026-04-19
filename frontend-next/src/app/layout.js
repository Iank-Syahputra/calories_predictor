import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Calories Burned Prediction - Predict with 96.7% Accuracy',
  description: 'Accurate calories burned prediction using machine learning. Get predictions based on your profile and workout intensity.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {children}
      </body>
    </html>
  )
}
