import React, { useState } from 'react'
import HowItWorks from './HowItWorks'
import { Link, useNavigate } from 'react-router-dom'
import LatestNews from './LatestNewsPage'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Clock,
  Users,
  Gift,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  Anchor
} from 'lucide-react'
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

const SUPPORT_FEATURES = [
  {
    title: 'Personalized Assistance',
    desc: 'Get customized cruise recommendations based on your interests, travel dates, and budget.',
    icon: Users
  },
  {
    title: 'Expert Knowledge',
    desc: 'Benefit from our in-depth understanding of cruise packages, special offers, and exclusive deals.',
    icon: Compass
  },
  {
    title: 'Time-Saving',
    desc: 'Avoid endless online searching and confusion. Our team does the heavy lifting for you.',
    icon: Clock
  },
  {
    title: '24/7 Support',
    desc: 'Receive continuous help before, during, and after your booking to ensure a smooth travel experience.',
    icon: ShieldCheck
  }
]

const STEPS = [
  { title: 'Consultation', desc: 'Tell us about your travel preferences, destinations, and cruise line choices.' },
  { title: 'Options', desc: 'We provide a curated list of cruise options that fit your exact criteria.' },
  { title: 'Booking', desc: 'Once you select your cruise, our team handles all booking details securely.' },
  { title: 'Docs & Visa', desc: 'We assist with ticket issuance, travel insurance, and visa requirements.' },
  { title: 'Pre-Departure', desc: 'Receive reminders, packing tips, and last-minute travel advisories.' }
]

const BENEFITS = [
  { title: 'Access to Exclusive Deals', desc: 'We have partnerships with cruise lines that allow us to offer special discounts and onboard credits.' },
  { title: 'Flexible Payment Options', desc: 'Choose payment plans that suit your budget, including deposits and installment plans.' },
  { title: 'Group Bookings', desc: 'Planning a family or group cruise? Our team coordinates group discounts and cabin arrangements.' },
  { title: 'Travel Insurance Assistance', desc: 'Get advice and assistance on selecting the right insurance coverage for peace of mind.' },
  { title: 'Customized Excursions', desc: 'We can help you book shore excursions tailored specifically to your interests.' }
]

const FAQS = [
  {
    q: 'Can I change or cancel my cruise booking?',
    a: 'Yes, most cruise lines offer flexible cancellation policies, but conditions vary. Our team explains these terms thoroughly before you book.'
  },
  {
    q: 'How early should I book my cruise?',
    a: 'Early bookings often secure better prices and cabin choices. However, last-minute deals can also be available depending on season.'
  },
  {
    q: 'Are group discounts available?',
    a: 'Absolutely! We specialize in coordinating group bookings and ensuring you get the best possible group rates and cabin blocks.'
  }
]

const TIPS = [
  'Have your travel documents ready and up to date.',
  'Be clear about your budget and preferred travel dates.',
  'Ask about all fees and taxes upfront to avoid surprises.',
  'Request detailed info on onboard amenities and activities.',
  'Communicate any special needs or dietary restrictions early.'
]

export default function CruisePage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <>
      {/* Hero Section (short banner) */}
      <section className="relative h-[400px] w-full overflow-hidden pt-16 sm:h-[440px] md:pt-20">
        <img
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1400&q=85"
          alt="Cruise ship sailing across the ocean"
          width="1400"
          height="900"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17394a]/90 via-[#17394a]/60 to-[#17394a]/20" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl space-y-4 text-center md:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur">
              <Anchor size={14} /> Luxury Cruise Expeditions
            </span>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Life Is Adventure,
              <span className="block text-[#8fd6d0]">Make The Best Of It</span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Planning a trip? We will organize the perfect getaway, selecting
              the best destination within your budget!
            </p>

            <div className="pt-1">
              <a
                href="tel:18663075957"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#17394a] shadow-md transition hover:bg-slate-50"
              >
                <span>Book Now</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Component */}
      <HowItWorks />

      {/* Information Content Section */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Intro Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm sm:p-10"
          >
            <div className="mb-3 flex items-center gap-2 text-[#176b70]">
              <Compass size={22} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Seamless Cruise Experience
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#17394a] sm:text-3xl md:text-4xl">
              Cruise Booking by Our Support Team
            </h2>
            <p className="text-base leading-relaxed text-slate-600">
              Booking a cruise can be an exciting but sometimes overwhelming
              experience. With so many destinations, ships, and cabin options
              available, it’s easy to feel unsure about where to start. That’s
              why our dedicated support team is here to assist you every step of
              the way, making your cruise booking seamless and stress-free.
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <div>
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-[#17394a] sm:text-3xl">
                Why Choose Our Support Team for Your Cruise Booking?
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Our support team consists of knowledgeable travel experts who
                specialize in cruises. They understand the nuances of various
                cruise lines, itineraries, and onboard experiences, ensuring you
                get the best possible options tailored to your preferences and
                budget.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SUPPORT_FEATURES.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="flex h-full flex-col rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6f2f1] text-[#176b70]">
                    <item.icon size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#17394a]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking Process Timeline */}
          <div className="rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm sm:p-10">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-[#17394a] sm:text-3xl">
              The Cruise Booking Process Made Easy
            </h2>
            <p className="mb-8 text-sm text-slate-600 sm:text-base">
              Here is how our support team helps you book your perfect cruise:
            </p>

            <div className="relative grid grid-cols-1 gap-6 md:grid-cols-5">
              <div className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-[#e9e2d6] md:block" />
              {STEPS.map((item, index) => (
                <div
                  key={item.title}
                  className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#176b70] text-sm font-bold text-white ring-4 ring-white">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#17394a]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm sm:p-10">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-[#17394a] sm:text-3xl">
              Benefits of Booking Cruises with Support
            </h2>
            <p className="mb-6 text-sm text-slate-600 sm:text-base">
              Booking your cruise through our support team offers numerous
              advantages beyond convenience:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {BENEFITS.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-[#e9e2d6] bg-white p-4"
                >
                  <CheckCircle2
                    size={22}
                    className="mt-0.5 shrink-0 text-[#176b70]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#17394a]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ + Tips */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Quick FAQ */}
            <div className="rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-2 flex items-center gap-2 text-[#176b70]">
                <HelpCircle size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Quick Answers
                </span>
              </div>
              <h3 className="mb-6 text-xl font-semibold text-[#17394a]">
                Common Questions About Cruise Booking
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-xl border border-[#e9e2d6]"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={openFaq === idx}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left text-sm font-bold text-[#17394a] transition hover:bg-slate-50"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                          openFaq === idx ? 'rotate-180 text-[#176b70]' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="border-t border-[#e9e2d6] bg-white p-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Tips */}
            <div className="flex flex-col justify-between rounded-2xl bg-[#17394a] p-6 text-white shadow-sm sm:p-8">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[#8fd6d0]">
                  <Gift size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Expert Advice
                  </span>
                </div>
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Top Tips for a Smooth Cruise Booking
                </h3>

                <ul className="space-y-3">
                  {TIPS.map((tip, idx) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 text-xs text-white/85 sm:text-sm"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#176b70] text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-white/15 pt-6 text-xs text-white/80">
                <p className="mb-2">
                  At{' '}
                  <Link to="#" className="font-bold text-[#8fd6d0] hover:underline">
                    Prisbook,
                  </Link>{' '}
                  we strive to make your cruise dreams a reality.
                </p>
                <p className="font-semibold text-white">
                  Book smart, travel happy, only with{' '}
                  <Link to="#" className="font-bold text-[#8fd6d0] underline">
                    Prisbook.
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Flight CTA Banner */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#176b70] p-8 shadow-lg sm:p-12 md:flex-row"
          >
            <div className="max-w-2xl space-y-3 text-center md:text-left">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Your Next Adventure Awaits
              </h2>
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                Book flights, discover dream destinations, and create
                unforgettable memories with premium travel experiences.
              </p>
            </div>

            <button
              onClick={() => navigate('/flight')}
              className="flex shrink-0 cursor-pointer items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#17394a] shadow-md transition hover:bg-slate-50 active:scale-95"
            >
              <span>Book a Flight</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Embedded Global Components */}
      <Testimonials />
      <Faq />
      <LatestNews />
    </>
  )
}