import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const FlightLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="relative w-64 h-2">
        {/* Progress Bar Track */}
        <div className="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
          {/* Moving Progress Fill */}
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </div>

        {/* Floating Plane */}
        <motion.div
          animate={{ 
            x: [0, 250, 0],
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          }}
          className="absolute -top-6 left-0 text-blue-600"
        >
          <Plane size={32} fill="currentColor" />
        </motion.div>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-8 text-gray-600 font-medium tracking-widest uppercase text-sm"
      >
        Finding best deals...
      </motion.p>
    </div>
  );
};

export default FlightLoader