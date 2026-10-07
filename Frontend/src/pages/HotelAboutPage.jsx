import React from "react";
import { Utensils, Timer, ShieldCheck, Zap, Sparkles, Award, Star, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden relative bg-gradient-to-b from-transparent via-purple-50/30 to-transparent">

      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-200/40 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/30 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-xs">
              <Sparkles size={14} className="text-purple-600" />
              <span>Why Choose Us</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight mt-6">
              The Best Holidays <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800">
                Start Right Here
              </span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-6 max-w-xl font-medium">
              Reserve your suite today and enjoy handpicked luxury experiences, 
              concierge services, and unbeatable member savings.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-200/80">
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">15+</h3>
                <p className="text-slate-500 font-semibold text-xs sm:text-sm">Years Experience</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">4.9</h3>
                  <Star size={18} className="text-amber-400 fill-amber-400" />
                </div>
                <p className="text-slate-500 font-semibold text-xs sm:text-sm">Client Rating</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">24/7</h3>
                <p className="text-slate-500 font-semibold text-xs sm:text-sm">Live Concierge</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[36px] overflow-hidden h-[480px] sm:h-[540px] shadow-[0_25px_60px_rgba(15,23,42,0.18)] border-4 border-white/80">
              <img
                src="/images/hotel page intro.jpg.jpeg"
                alt="Luxury Hotel"
                className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">
                      Trusted Luxury Stays
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      10K+ Happy Guests
                    </h3>
                  </div>

                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white overflow-hidden shadow-md"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?img=${i + 20}`}
                          alt="client"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl p-4 shadow-xl hidden lg:block max-w-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Verified Luxury</h4>
                  <p className="text-xs text-slate-500 font-medium">100% Quality Inspected</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

       
      </div>
    </section>
  );
}