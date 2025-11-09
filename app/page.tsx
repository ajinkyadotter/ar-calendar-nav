import CalendarEvents from './components/CalendarEvents';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        <div className="mb-4 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            🧭 AR Calendar Navigation
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Navigate to your meeting rooms using Augmented Reality
          </p>
        </div>
        <CalendarEvents />
      </main>
    </div>
  );
}
