import { X } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CarModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 w-full max-w-lg z-50 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
        >
          <X size={18} />
        </button>
        {children}  
      </div>
    </div>
  );
}
