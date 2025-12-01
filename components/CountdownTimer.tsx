import React, { useState, useEffect, useCallback } from 'react';
import { CountdownProps, TimeLeft } from '../types';

// Extracted TimeBox to prevent unnecessary re-renders of the component structure
// This ensures the animation only triggers when the 'value' prop changes specifically
const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative group perspective">
      <div className="
        w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-44
        bg-white/20 backdrop-blur-md border border-white/30 
        rounded-2xl shadow-2xl 
        flex items-center justify-center 
        transform transition-transform duration-300 
        group-hover:scale-105 group-hover:-translate-y-1 group-hover:bg-white/25
        cursor-default overflow-hidden
      ">
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
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-md animate-pop block"
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
    <span className="mt-2 text-xs sm:text-sm font-bold text-white tracking-widest uppercase opacity-90 shadow-black drop-shadow-sm">
      {label}
    </span>
  </div>
);

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
      <TimeBox value={timeLeft.days} label="Días" />
      <TimeBox value={timeLeft.hours} label="Horas" />
      <TimeBox value={timeLeft.minutes} label="Minutos" />
      <TimeBox value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

export default CountdownTimer;