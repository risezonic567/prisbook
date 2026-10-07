import React from 'react';
import {
  MapPin,
  Star,
  Heart,
  ShieldCheck,
  ArrowRight,
  Headphones,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HotelDestination() {

  const hotels = [
    {
      id: 1,
      name: "Baga Comfort",
      location: "New York",
      price: "455",
      rating: "4.5",
      img: "/images/New York Hotel.jpg.jpeg",
      path: "/new-york"
    },
    {
      id: 2,
      name: "New Apollo Hotel",
      location: "California",
      price: "585",
      rating: "4.8",
      img: "/images/California Hotel.jpg.jpeg",
      path: "/california"
    },
    {
      id: 3,
      name: "New Age Hotel",
      location: "Los Angeles",
      price: "385",
      rating: "4.6",
      img: "/images/Los Angeles Hotel.jpg.jpeg",
      path: "/los-angeles"
    },
    {
      id: 4,
      name: "Helios Beach Resort",
      location: "Chicago",
      price: "665",
      rating: "4.8",
      img: "/images/Chicago Hotel.jpg.jpeg",
      path: "/chicago"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-200/50 mb-3">
            <Sparkles size={12} /> Premier Collections
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Discover Your Perfect Stay
          </h2>

          <p className="text-slate-500 font-medium mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
            Explore handpicked premium hotels with unbeatable comfort,
            five-star amenities, and exclusive member-only rates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">

        {hotels.map((hotel, index) => (

          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >

            <Link to={hotel.path} className="block group">

              <div className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500 border border-slate-200/80 hover:border-purple-300">

                <div className="relative h-[340px] sm:h-[380px] overflow-hidden">

                  <img
                    src={hotel.img}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"></div>

                  {/* Destination Tag */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-sm">
                    <MapPin size={13} className="text-purple-600" />
                    {hotel.location}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 px-3 py-1 rounded-full flex items-center gap-1 font-extrabold text-xs shadow-md">
                    <Star size={13} className="fill-slate-950" />
                    {hotel.rating}
                  </div>

                  {/* Bottom Hotel Details */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">

                    <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug drop-shadow-sm group-hover:text-purple-200 transition">
                      {hotel.name}
                    </h3>

                    <div className="flex justify-between items-end mt-4 pt-3 border-t border-white/20">

                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-white/70">
                          Starting From
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-black text-white">
                          ${hotel.price}
                          <span className="text-xs font-normal text-white/70 ml-1">/ night</span>
                        </h4>
                      </div>

                      <span className="bg-white text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold  hover:text-white transition-all shadow-md flex items-center gap-1 cursor-pointer">
                        Book Now
                        <ArrowRight size={13} />
                      </span>

                    </div>
                  </div>

                </div>

              </div>

            </Link>

          </motion.div>

        ))}

      </div>

      {/* Features & Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 24x7 Support */}
        <div className="bg-gradient-to-br from-white to-purple-50/40 p-8 rounded-3xl flex items-start gap-5 hover:shadow-xl hover:shadow-purple-900/5 transition-all border border-slate-200/80">

          <div className="bg-purple-100 text-purple-700 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs shrink-0">
            <Headphones size={28} />
          </div>

          <div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              24×7 Premium Concierge
            </h4>

            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Our dedicated luxury hospitality team is always on standby to assist you
              with itinerary modifications, special requests, and hotel transfers.
            </p>
          </div>

        </div>

        {/* Secure Guarantee */}
        <div className="bg-gradient-to-br from-white to-purple-50/40 p-8 rounded-3xl flex items-start gap-5 hover:shadow-xl hover:shadow-purple-900/5 transition-all border border-slate-200/80">

          <div className="bg-emerald-100 text-emerald-700 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              Best Price & Secure Guarantee
            </h4>

            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Enjoy price-match assurance, instant confirmations, and safe SSL-encrypted
              transactions with hassle-free cancellation options.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}