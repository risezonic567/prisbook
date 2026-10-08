import React from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const labelClass =
  "text-[11px] font-bold text-neutral-700 uppercase tracking-[0.15em]";

const inputClass =
  "w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black placeholder:text-neutral-400 hover:border-neutral-400";

const cardClass =
  "bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between group";

const iconBoxClass =
  "w-12 h-12 text-black rounded-xl flex items-center justify-center mb-5 border border-neutral-200 group-hover:bg-black group-hover:text-white transition-colors duration-300";

const linkBtnClass =
  "inline-flex items-center justify-between w-full text-sm font-semibold text-black hover:bg-black hover:text-white px-4 py-3 rounded-xl transition-all duration-300 border border-neutral-200";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pt-10 pb-24 md:mt-10">
      {/* ================= HEADER ================= */}
      <motion.section
        className="max-w-5xl mx-auto px-6 pt-14 pb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          <span className="text-neutral-700 text-[11px] font-bold uppercase tracking-[0.2em]">
            24/7 Global Concierge
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight mb-5">
          Let’s Connect & Plan
          <br className="hidden sm:block" />
          Your Next Journey
        </h1>

        <p className="max-w-2xl mx-auto text-neutral-500 text-sm md:text-base leading-relaxed">
          At <strong className="text-black font-semibold">Prisbook</strong>, we
          are more than booking agents—we are your personal travel companions.
          Share your travel plans with us today.
        </p>
      </motion.section>

      {/* ================= MAIN CONTACT ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* ================= IMAGE SECTION ================= */}
          <div className="lg:col-span-5 bg-black relative min-h-[400px] lg:min-h-full flex flex-col justify-between p-8 md:p-10 text-white overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=85"
              alt="Passenger aircraft climbing into a clear sky"
              width="1400"
              height="1000"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out grayscale"
            />
            <div className="absolute inset-0 bg-black/65" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.2em] border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Direct Support
              </span>
            </div>

            <div className="relative z-10 space-y-5 my-auto py-10">
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                Seamless Journeys
                <br />
                Start with a
                <br />
                Conversation.
              </h3>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Whether booking individual flights, luxury hotel stays, or
                complex corporate group itineraries, our experts ensure a
                smooth experience.
              </p>
            </div>

            <div className="relative z-10 pt-5 border-t border-white/20 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-white shrink-0" />
                <span className="text-xs text-neutral-300 font-medium">
                  Instant Response
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-white shrink-0" />
                <span className="text-xs text-neutral-300 font-medium">
                  Global Assistance
                </span>
              </div>
            </div>
          </div>

          {/* ================= FORM SECTION ================= */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 bg-white">
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Contact Us
              </p>
              <h2 className="text-3xl font-black text-black tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-sm text-neutral-500 mt-2">
                Fill out the details below and we will reach back within 2
                hours.
              </p>
            </div>

            <form className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={labelClass}>Mobile Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1 (234) 567-890"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className={labelClass}>Your Message</label>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Tell us about your trip dates, preferred destination, or booking inquiry..."
                  className="w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black placeholder:text-neutral-400 hover:border-neutral-400 resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-black cursor-pointer"
                  />
                  <span className="text-xs text-neutral-500 group-hover:text-black transition-colors">
                    I agree to the Terms & Conditions and Privacy Policy.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-black cursor-pointer"
                  />
                  <span className="text-xs text-neutral-500 group-hover:text-black transition-colors">
                    I agree to receive booking updates and travel
                    notifications.
                  </span>
                </label>
              </div>

              {/* Button (no submit logic) */}
              <motion.button
                type="button"
                className="w-full h-12 mt-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                <span>Send Message</span>
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CALL US */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div>
              <div className={iconBoxClass}>
                <Headphones size={22} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Call Us</h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Speak directly with our travel experts for immediate bookings
                and inquiries.
              </p>
            </div>

            <a href="tel:18663075957" className={linkBtnClass}>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>18663075957</span>
              </div>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>

          {/* EMAIL US */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div>
              <div className={iconBoxClass}>
                <Mail size={22} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Email Us</h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Send us your detailed itineraries or corporate queries via
                email anytime.
              </p>
            </div>

            <a
              href="mailto:info@kradtravel.com"
              aria-label="Email Prisbook support"
              className={linkBtnClass}
            >
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>Email our travel team</span>
              </div>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>

          {/* VISIT US */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div>
              <div className={iconBoxClass}>
                <MapPin size={22} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Visit Us</h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-5">
                Visit our corporate office for assistance with your travel
                bookings, inquiries, and support.
              </p>

              <div className="text-xs text-neutral-600 bg-neutral-50 p-4 rounded-xl border border-neutral-200 leading-relaxed">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-bold text-black">USA Office</span>
                  <span className="text-[10px] bg-black text-white px-2.5 py-1 rounded-md font-semibold whitespace-nowrap">
                    HQ
                  </span>
                </div>
                <p className="text-neutral-600">
                  17662 Irvine Blvd Suite 9,
                  <br />
                  Tustin, CA 92780
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}