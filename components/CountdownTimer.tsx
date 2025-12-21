import React, { useState, useEffect, useCallback } from 'react';
import { CountdownProps, TimeLeft } from '../types';

// Extracted TimeBox to prevent unnecessary re-renders of the component structure
// This ensures the animation only triggers when the 'value' prop changes specifically
const TimeBox = ({ value, label, flashOnChange = false }: { value: number; label: string; flashOnChange?: boolean }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashColor, setFlashColor] = useState<'red' | 'green'>('red');

  useEffect(() => {
    if (flashOnChange) {
      // Pick random Christmas color
      setFlashColor(Math.random() > 0.5 ? 'red' : 'green');
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [value, flashOnChange]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative group perspective">
        <div className={`
          w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36
          backdrop-blur-md border border-white/30 
          rounded-xl shadow-2xl 
          flex items-center justify-center 
          transform transition-transform duration-300 
          group-hover:scale-105 group-hover:-translate-y-1
          cursor-default overflow-hidden
          transition-colors duration-300
          ${isFlashing
            ? (flashColor === 'red' ? 'bg-red-600/90 border-red-400 shadow-red-500/50' : 'bg-green-600/90 border-green-400 shadow-green-500/50')
            : 'bg-white/20 group-hover:bg-white/25'
          }
        `}>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

          {/* 
          Key={value} is the crucial part here. 
          React will only unmount and remount this span (triggering the CSS animation)
          when the 'value' actually changes.
          Seconds change every tick -> Animate.
          Minutes change only every 60 ticks -> Animate only then.
        */}
          <span
            key={value}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-md animate-pop block"
          >
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase opacity-90 shadow-black drop-shadow-sm">
        {label}
      </span>
    </div>
  );
};

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Check for completion
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0 &&
        !hasFinished
      ) {
        setHasFinished(true);
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, onComplete, hasFinished]);

  return (
    // Changed grid-cols-4 to grid-cols-2 for a 2x2 matrix
    // Adjusted max-width to keep it compact
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md px-4 mx-auto">
      <TimeBox value={timeLeft.days} label="Días" flashOnChange={true} />
      <TimeBox value={timeLeft.hours} label="Horas" flashOnChange={true} />
      <TimeBox value={timeLeft.minutes} label="Minutos" flashOnChange={true} />
      <TimeBox value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

export default CountdownTimer;