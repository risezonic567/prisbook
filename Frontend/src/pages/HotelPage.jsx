import React from 'react'
import { motion } from 'framer-motion'
import PromoSection from './PromotionPage'
import { FiSearch, FiCalendar, FiUsers, FiMapPin, FiPhoneCall } from 'react-icons/fi'
import HotelAboutPage from './HotelAboutPage'
import HotelDestination from './Destination/HotelDestination'
import Testimonials from '../components/Testimonials'
import Faq from './FaqPage'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const STATS = [
  { number: '15K+', text: 'Luxury Hotels' },
  { number: '98%', text: 'Happy Customers' },
  { number: '100+', text: 'Destinations' }
]

const labelClass =
  'mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500'

const fieldClass =
  'h-12 w-full rounded-xl border border-[#e9e2d6] bg-white px-4 text-sm font-medium text-[#17394a] outline-none transition placeholder:text-slate-400 focus:border-[#176b70] focus:bg-white focus:ring-2 focus:ring-[#176b70]/20'

export default function HotelPage() {
  return (
    <>
      <div className="relative bg-white font-sans text-slate-800">
        {/* Hero (short banner) */}
        <section className="relative h-[360px] w-full overflow-hidden sm:h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=85"
            alt="An inviting boutique hotel surrounded by greenery"
            width="1600"
            height="1000"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17394a]/90 via-[#17394a]/60 to-[#17394a]/20" />

          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-16 sm:px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-2xl space-y-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur">
                <FiMapPin /> Luxury Hotel Booking
              </span>

              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Find the top hotels nearby
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                We offer more than just a place to stay. We create luxury
                experiences that fit your budget.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="tel:18663075957"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#17394a] shadow transition hover:bg-slate-50"
                >
                  <FiPhoneCall className="text-[#176b70]" />
                  24/7 Support
                </a>
                <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Hotels from $120
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Long search card overlapping the hero */}
        <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-[#e9e2d6] bg-white p-4 shadow-xl shadow-[#17394a]/10 sm:p-5"
          >
            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
              <div>
                <label className={labelClass}>
                  <FiMapPin className="text-[#176b70]" /> Destination
                </label>
                <input
                  type="text"
                  placeholder="Search hotels..."
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FiCalendar className="text-[#176b70]" /> Check In
                </label>
                <input type="date" className={fieldClass} />
              </div>

              <div>
                <label className={labelClass}>
                  <FiUsers className="text-[#176b70]" /> Guests
                </label>
                <select className={fieldClass}>
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#176b70] px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#125a5e] sm:col-span-2 lg:col-span-1"
              >
                <FiSearch size={18} />
                <span>Search Hotels</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 grid grid-cols-3 divide-x divide-[#e9e2d6] rounded-2xl border border-[#e9e2d6] bg-white py-5"
          >
            {STATS.map((item) => (
              <div key={item.text} className="px-2 text-center">
                <h2 className="text-xl font-bold text-[#176b70] sm:text-3xl">
                  {item.number}
                </h2>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500 sm:text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="h-12" />
      </div>

      {/* Embedded Sub-Components */}
      <PromoSection />
      <HotelAboutPage />
      <HotelDestination />
      <Faq />
      <Testimonials />
    </>
  )
}