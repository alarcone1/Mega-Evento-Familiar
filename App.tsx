import React, { useState } from 'react';
import { Calendar, MapPin, Gift, Video, ExternalLink } from 'lucide-react';
import CountdownTimer from './components/CountdownTimer';
import InfoModal from './components/InfoModal';
import FloatingParticles from './components/FloatingParticles';
import Confetti from './components/Confetti';
import PhotoCarousel from './components/PhotoCarousel';
import CreditsLogo from './components/CreditsLogo';

// CONFIGURATION: Set your event date here
// Setting a date in the future for demonstration.
// Format: YYYY-MM-DDTHH:mm:ss
const EVENT_DATE = "2025-12-31T15:00:00";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventStarted, setIsEventStarted] = useState(false);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-orange-500 via-red-600 to-purple-900 overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <PhotoCarousel />
      <FloatingParticles />
      <CreditsLogo />

      {/* Conditional Confetti */}
      {isEventStarted && <Confetti />}

      <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-12 pointer-events-none">

        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 px-4 w-full">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wider border border-white/20 shadow-lg">
            ¡FALTA POCO!
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
            Mega Evento <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Familiar
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90 text-sm sm:text-lg font-medium">
            {/* Date Pill */}
            <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5 pointer-events-auto">
              <Calendar className="w-5 h-5 text-yellow-300" />
              <span>31 de Diciembre, 3:00 PM</span>
            </div>

            {/* Location Link Pill */}
            <a
              href="https://www.tiktok.com/@escapeurbanomtr/video/7526221601902234886"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black/10 hover:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5 transition-all hover:scale-105 group cursor-pointer pointer-events-auto"
              title="Ver video de la finca"
            >
              <MapPin className="w-5 h-5 text-yellow-300 group-hover:animate-bounce" />
              <span>Finca La Turquesa</span>
              <ExternalLink className="w-4 h-4 opacity-70 ml-1" />
            </a>
          </div>
        </div>

        {/* Timer Section */}
        <div className="pointer-events-auto">
          <CountdownTimer
            targetDate={EVENT_DATE}
            onComplete={() => setIsEventStarted(true)}
          />
        </div>

        {/* Message for when event starts */}
        {isEventStarted && (
          <div className="mt-12 text-center animate-bounce pointer-events-auto">
            <h2 className="text-4xl font-bold text-white">¡El evento ha comenzado! 🥳</h2>
          </div>
        )}

      </main>

      {/* Footer / Action Section */}
      <footer className="relative z-10 pb-12 w-full flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            group flex items-center gap-3 px-8 py-4 
            bg-white text-orange-600 
            rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/50
            transform hover:-translate-y-1 transition-all duration-300
            font-bold text-lg
          "
        >
          <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          ¿Qué traer?
        </button>
      </footer>

      {/* Modal Overlay */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;