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
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=85",
    path: "/thailand",
  },
  {
    id: 2,
    name: "Hong Kong",
    rating: "4.7",
    description: "Modern skyline & vibrant culture.",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=900&q=85",
    path: "/hong-kong",
  },
  {
    id: 3,
    name: "Maldives",
    rating: "4.9",
    description: "Luxury villas & crystal clear waters.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    path: "/maldives",
  },
  {
    id: 4,
    name: "Switzerland",
    rating: "4.8",
    description: "Snowy mountains & scenic landscapes.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
    path: "/switzerland",
  },
];

export default function FlightDestination() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white py-16 text-slate-800 font-sans sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 max-w-3xl sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#176b70]/20 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#176b70]"
          >
            <Compass size={14} /> Explore The World
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-semibold leading-tight tracking-tight text-[#17394a] sm:text-4xl md:text-5xl"
          >
            Popular Destinations ✈️
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            Discover breathtaking places around the globe with unforgettable experiences and seamless travel planning.
          </motion.p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[205px] lg:grid-cols-4 lg:gap-5">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <Link to={dest.path} className={`group block h-full ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
                <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl bg-[#17394a] shadow-sm transition-all duration-300 group-hover:shadow-2xl">
                  
                  {/* Image Container */}
                  <div className={`relative h-full overflow-hidden bg-slate-100 ${index === 0 ? "min-h-[400px]" : "min-h-[260px]"}`}>
                    <img
                      src={dest.image}
                      alt={`${dest.name} travel destination`}
                      width="900"
                      height="675"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102b3c]/90 via-[#102b3c]/15 to-transparent" />

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
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <div className="text-white">
                      <h3 className="mb-1 text-2xl font-semibold transition-colors sm:text-3xl">
                        {dest.name}
                      </h3>

                      <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">
                        {dest.description}
                      </p>
                      </div>
                      <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-[#e8795c]">
                        <ArrowRight size={17} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}

      </div>
    </section>
  );
} 
