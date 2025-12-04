import React from 'react';

const CreditsLogo: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 group">
      <div className="relative flex items-center justify-end">
        {/* Text container - hidden by default, shown on hover */}
        <div className="
          absolute right-full mr-3 
          opacity-0 group-hover:opacity-100 
          transition-all duration-300 ease-in-out
          transform translate-x-4 group-hover:translate-x-0
          bg-white/10 backdrop-blur-md border border-white/20
          px-3 py-1 rounded-full
          text-white text-sm font-medium whitespace-nowrap
          pointer-events-none
        ">
          Créditos
        </div>

        {/* Logo Image */}
        <a
          href="https://www.linkedin.com/in/alarcone1/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-12 h-12 sm:w-14 sm:h-14 
            rounded-full 
            overflow-hidden 
            shadow-lg 
            border-2 border-white/20
            transition-transform duration-300 
            group-hover:scale-110 group-hover:rotate-6
            cursor-pointer
            bg-white/5 backdrop-blur-sm
            block
          "
        >
          <img
            src="/Mega-Evento-Familiar/icons/Logo-ae1.png"
            alt="Logo AE1"
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </div>
  );
};

export default CreditsLogo;
