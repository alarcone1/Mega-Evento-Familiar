import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { ModalProps } from '../types';

const InfoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    "Ropa cómoda para actividades 👟",
    "Vestido de baño 🩳",
    "Juegos de mesa 🎲",
    "Cero problemas 😌",
    "¡Mucha actitud y ganas de divertirse! 🎉"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ¿Qué traer?
        </h3>

        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
              <CheckCircle2 className="text-orange-600 mt-1 flex-shrink-0" size={20} />
              <span className="text-gray-700 font-medium">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;