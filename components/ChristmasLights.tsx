import React from 'react';

const ChristmasLights: React.FC = () => {
    // Generate a sequence of colors for the lights
    // Gala colors for New Year (Amber, Golden, White)
    const colors = ['bg-amber-400', 'bg-yellow-300', 'bg-amber-500', 'bg-yellow-200'];

    return (
        <div className="absolute top-0 left-0 w-full z-40 pointer-events-none overflow-hidden h-16">
            {/* Wire */}
            <div className="absolute top-0 left-0 w-full h-8 border-b-2 border-gray-600/50 rounded-[50%] scale-x-110 translate-y-[-50%]" />

            {/* Lights Container */}
            <div className="flex justify-around items-start pt-1 px-2 w-full">
                {Array.from({ length: 12 }).map((_, index) => {
                    const colorClass = colors[index % colors.length];
                    const delay = Math.random() * 2; // Random blink delay
                    const duration = 1.5 + Math.random(); // Random duration

                    return (
                        <div key={index} className="relative flex flex-col items-center group">
                            {/* Socket */}
                            <div className="w-2 h-2 bg-gray-700 rounded-sm mb-[1px]" />
                            {/* Bulb */}
                            <div
                                className={`
                  w-3 h-4 sm:w-4 sm:h-6 rounded-full ${colorClass} 
                  shadow-[0_0_15px_rgba(251,191,36,0.8)] 
                  animate-pulse
                `}
                                style={{
                                    animationDelay: `${delay}s`,
                                    animationDuration: `${duration}s`
                                }}
                            >
                                {/* Reflection/Shine */}
                                <div className="absolute top-1 left-1 w-1 h-1 bg-white/50 rounded-full" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChristmasLights;
