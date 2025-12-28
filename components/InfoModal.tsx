import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { ModalProps } from '../types';

const InfoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    { icon: '👟', text: "Ropa cómoda (Actividades)" },
    { icon: '🩳', text: "Vestido de baño" },
    { icon: '🎲', text: "Juegos de mesa" },
    { icon: '🍾', text: "Bebidas para brindar" },
    { icon: '🍗', text: "¡Mucha hambre!" },
    { icon: '🎁', text: "Regalo" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-sm transform transition-all scale-100 animate-in fade-in zoom-in duration-200">

        {/* Festive Header */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-br from-yellow-200 via-yellow-500 to-amber-600 text-white w-20 h-20 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-xl shadow-yellow-500/20">
            <span className="text-4xl">🥂</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          {/* Header Background */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 h-24 flex items-center justify-center pt-8 border-b border-white/10">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 drop-shadow-md tracking-wide">
              ¿QUÉ TRAER?
            </h3>
          </div>

          {/* List Content */}
          <div className="p-6 pt-8 bg-slate-900/50">
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/10 shadow-sm">
                  <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <span className="text-gray-200 font-bold text-sm sm:text-base">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                onClick={onClose}
                className="
                    w-full py-3.5 rounded-xl font-black tracking-wider text-slate-900 shadow-lg shadow-yellow-500/20
                    bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-500
                    hover:from-yellow-200 hover:to-yellow-400
                    transform hover:-translate-y-1 transition-all duration-200
                    flex items-center justify-center gap-2
                    "
              >
                <CheckCircle2 size={20} />
                <span>¡ENTENDIDO!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-slate-800 text-yellow-500 p-2 rounded-full shadow-lg hover:bg-slate-700 transition-transform hover:scale-110 z-20 border-2 border-yellow-500"
        >
          <X size={24} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default InfoModal;