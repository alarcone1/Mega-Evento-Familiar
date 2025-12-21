import React, { useState } from 'react';
import { Calendar, MapPin, Gift, Video, ExternalLink } from 'lucide-react';
import CountdownTimer from './components/CountdownTimer';
import InfoModal from './components/InfoModal';
import FloatingParticles from './components/FloatingParticles';
import Confetti from './components/Confetti';
import PhotoCarousel from './components/PhotoCarousel';
import CreditsLogo from './components/CreditsLogo';
import ChristmasLights from './components/ChristmasLights';

// CONFIGURATION: Set your event date here
// Setting a date in the future for demonstration.
// Format: YYYY-MM-DDTHH:mm:ss
const EVENT_DATE = "2025-12-31T15:00:00";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventStarted, setIsEventStarted] = useState(false);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <FloatingParticles />
      <ChristmasLights />
      <CreditsLogo />

      {/* Conditional Confetti */}
      {isEventStarted && <Confetti />}

      <main className="relative z-10 flex flex-col h-screen w-full overflow-hidden">

        {/* SECTION 1: Header (Top 20%) */}
        <div className="flex-none h-[20%] flex flex-col items-center justify-center pt-6 px-4">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-xs font-semibold tracking-wider border border-white/20 shadow-lg shadow-blue-500/20">
            ¡FALTA POCO!
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-xl leading-tight text-center">
            Mega Evento <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-white to-red-600 animate-pulse drop-shadow-sm">
              Familiar
            </span>
          </h1>
        </div>

        {/* SECTION 2: Carousel (40%) - Increased from 30% */}
        <div className="flex-none h-[40%] w-full flex items-center justify-center relative z-20 -mt-6">
          <PhotoCarousel className="w-full" />
        </div>

        {/* SECTION 3: Timer (25%) - Decreased from 35% */}
        <div className="flex-none h-[25%] flex items-center justify-center pointer-events-auto relative z-50">
          {isEventStarted ? (
            <div className="text-center animate-bounce">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">¡El evento ha comenzado! 🥳</h2>
            </div>
          ) : (
            <div className="transform scale-90 sm:scale-100">
              <CountdownTimer
                targetDate={EVENT_DATE}
                onComplete={() => setIsEventStarted(true)}
              />
            </div>
          )}
        </div>

        {/* SECTION 4: Action Sheet (Bottom 15%) - Centered & Transparent */}
        <div className="flex-none h-[15%] w-full mt-auto bg-white/10 backdrop-blur-xl rounded-t-3xl border-t border-white/20 shadow-[0_-5px_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-2 z-30 pt-2 pb-4">

          {/* Info: Date & Location Centered */}
          <div className="flex items-center gap-3 text-xs font-medium text-white/90">
            <div className="flex items-center gap-1.5 opacity-90">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              <span>31 Dic, 3PM</span>
            </div>
            <div className="h-3 w-[1px] bg-white/40" />
            <a
              href="https://www.tiktok.com/@escapeurbanomtr/video/7526221601902234886"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-300" />
              <span>La Turquesa</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* Main Action Button (Transparent) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="
              flex items-center gap-2 px-6 py-2 
              bg-transparent border-2 border-white/80 text-white
              rounded-full shadow-lg hover:bg-white/10 hover:shadow-blue-500/30
              transform active:scale-95 transition-all duration-200
              font-bold text-sm tracking-wide
            "
          >
            <Gift className="w-4 h-4 text-white" />
            ¿QUÉ TRAER?
          </button>
        </div>

      </main>

      {/* Modal Overlay */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;