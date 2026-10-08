import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, Search, Car, ShieldCheck } from "lucide-react";
// import WhyChooseUs from "./WhyChooseUs";
import CarlistPage from "./CarListPage";
import FAQPage from "./FaqPage";
import Testimonials from "../components/Testimonials";
import Features from "./HowItWorks";

const labelClass =
  "mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500";

const fieldClass =
  "h-12 w-full rounded-xl border border-[#e9e2d6] bg-white px-3.5 text-sm font-medium text-[#17394a] outline-none transition placeholder:text-slate-400 focus:border-[#176b70] focus:bg-white focus:ring-2 focus:ring-[#176b70]/20";

const checkboxClass =
  "h-4 w-4 cursor-pointer rounded border-[#e9e2d6] accent-[#176b70]";

export default function CabBookingSection() {
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    pickupLocation: "",
    differentDropoff: true,
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffDate: "",
    dropoffTime: "",
    ageGroup: true,
  });

  const handleChange = (e) => {
    const { id, type, checked, value, placeholder } = e.target;
    const fieldName = id || placeholder?.replace(/\s+/g, "");

    setFormData((prev) => ({
      ...prev,
      [fieldName]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSearch = () => {
    console.log("Cab Search Requested Data:", formData);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2000);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      <section className="bg-white font-sans">
        {/* Hero (short banner) */}
        <div className="relative h-[380px] w-full overflow-hidden pt-16 sm:h-[420px] md:pt-20">
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9 }}
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
            alt="Modern car ready for a road trip"
            width="1400"
            height="950"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17394a]/90 via-[#17394a]/60 to-[#17394a]/20" />

          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-16 sm:px-6">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={
                showForm
                  ? { y: isMobile ? 0 : 0, opacity: 1 }
                  : { y: 0 }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl space-y-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur">
                <Car size={14} /> Reliable & Comfortable Rides
              </span>

              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Book Your <span className="text-[#8fd6d0]">Cab</span>
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                Pick your route, choose your time, and travel in comfort with
                trusted drivers.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Long search card overlapping the hero */}
        <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 pb-12 sm:px-6">
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#e9e2d6] bg-white p-4 shadow-xl shadow-[#17394a]/10 sm:p-5"
              >
                {/* Card title row */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#17394a]">
                    Book Your Ride
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f2f1] px-2.5 py-1 text-xs font-semibold text-[#176b70]">
                    <ShieldCheck size={13} />
                    Best Rates
                  </span>
                </div>

                {/* Fields row */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.4fr_1fr_0.8fr_1fr_0.8fr]">
                  <div>
                    <label className={labelClass}>
                      <MapPin size={13} className="text-[#176b70]" />
                      Pick-Up Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pick-up location"
                      value={formData["Enterpick-uplocation"]}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <MapPin size={13} className="text-emerald-600" />
                      Drop-Off Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter drop-off location"
                      value={formData["Enterdrop-offlocation"]}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Calendar size={13} className="text-[#176b70]" />
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Clock size={13} className="text-[#176b70]" />
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      id="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Calendar size={13} className="text-[#176b70]" />
                      Dropoff Date
                    </label>
                    <input
                      type="date"
                      id="dropoffDate"
                      value={formData.dropoffDate}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Clock size={13} className="text-[#176b70]" />
                      Dropoff Time
                    </label>
                    <input
                      type="time"
                      id="dropoffTime"
                      value={formData.dropoffTime}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Bottom row: checkboxes + button */}
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex select-none items-center gap-2">
                      <input
                        type="checkbox"
                        id="differentDropoff"
                        checked={formData.differentDropoff}
                        onChange={handleChange}
                        className={checkboxClass}
                      />
                      <label
                        htmlFor="differentDropoff"
                        className="cursor-pointer text-xs font-semibold text-slate-600 transition hover:text-[#17394a]"
                      >
                        Drop car off at different location
                      </label>
                    </div>

                    <div className="flex select-none items-center gap-2">
                      <input
                        type="checkbox"
                        id="ageGroup"
                        checked={formData.ageGroup}
                        onChange={handleChange}
                        className={checkboxClass}
                      />
                      <label
                        htmlFor="ageGroup"
                        className="cursor-pointer text-xs font-semibold text-slate-600 transition hover:text-[#17394a]"
                      >
                        Driver age between 30-65
                      </label>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleSearch}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#176b70] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#125a5e] sm:w-auto"
                  >
                    <Search size={16} />
                    <span>Search Cabs</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Sub-components maintained in original order */}
      <Features />
      {/* <WhyChooseUs /> */}
      <div id="sticky-trigger"></div>
      <CarlistPage />

      <FAQPage />
      <Testimonials />
    </>
  );
}