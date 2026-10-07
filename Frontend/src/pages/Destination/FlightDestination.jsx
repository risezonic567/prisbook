import React from "react";
import { Info, Star, ArrowRight, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Thailand",
    rating: "4.8",
    description: "Temples, nightlife & tropical beaches.",
    image: "/images/th.jpg",
    path: "/thailand",
  },
  {
    id: 2,
    name: "Hong Kong",
    rating: "4.7",
    description: "Modern skyline & vibrant culture.",
    image: "/images/hn.jpg",
    path: "/hong-kong",
  },
  {
    id: 3,
    name: "Maldives",
    rating: "4.9",
    description: "Luxury villas & crystal clear waters.",
    image: "/images/ml.jpg",
    path: "/maldives",
  },
  {
    id: 4,
    name: "Switzerland",
    rating: "4.8",
    description: "Snowy mountains & scenic landscapes.",
    image: "/images/sz.jpg",
    path: "/switzerland",
  },
];

export default function FlightDestination() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 sm:py-24 bg-slate-50 text-slate-800 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full  border border-blue-200  text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Compass size={14} /> Explore The World
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Popular Destinations ✈️
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Discover breathtaking places around the globe with unforgettable experiences and seamless travel planning.
          </motion.p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <Link to={dest.path} className="block group h-full">
                <div className="h-full flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-slate-300">
                  
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden bg-slate-100">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Rating Pill Badge */}
                    <div className="absolute top-4 left-4 bg-slate-900/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white flex items-center gap-1.5 text-xs font-semibold">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span>{dest.rating}</span>
                    </div>

                    {/* Info Icon */}
                    <div className="absolute top-4 right-4 bg-slate-900/40 backdrop-blur-md p-2 rounded-full border border-white/20 text-white group-hover:bg-white group-hover:text-slate-900 transition-colors duration-300">
                      <Info size={16} />
                    </div>

                    {/* Card Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-5 text-white">
                      <h3 className="text-2xl font-bold mb-1  transition-colors">
                        {dest.name}
                      </h3>

                      <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">
                        {dest.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="flex items-center justify-between px-5 py-4 bg-white border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-600  transition-colors">
                      Explore Destination
                    </span>

                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-white  group-hover:text-white transition-all duration-300">
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 relative overflow-hidden rounded-3xl  p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
        >
          {/* Ambient Decorator */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Your Next Adventure Awaits 🌍
            </h2>

            <p className="mt-3 text-blue-100 text-sm sm:text-base leading-relaxed">
              Book flights, discover dream destinations, and create unforgettable memories with premium travel experiences.
            </p>
          </div>

          <button
            onClick={() => navigate("/flight")}
            className="relative z-10 shrink-0 cursor-pointer bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base hover: hover:shadow-lg transition-all duration-300 flex items-center gap-2.5 active:scale-95"
          >
            <span>Book a Flight</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
} 

