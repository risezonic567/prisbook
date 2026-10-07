import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import HowItWorks from './HowItWorks';
import { MdClose } from "react-icons/md";
import {
  Calendar,
  PlaneLanding,
  PlaneTakeoff,
  Users,
  X,
  Search,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  ArrowRightLeft,
  CheckCircle2,
  Flame,
  MapPin
} from 'lucide-react';
import FlightDestination from './Destination/FlightDestination';
import ExploreNearby from './ExploreNearby';
import FAQPage from './FaqPage';
import { useNavigate } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import OurServices from '../components/OurServices';

export default function FlightPage() {
  const [roundedEnable, setRoundedEnable] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  const [originAirports, setOriginAirports] = useState([]);
  const [destinationAirports, setDestinationAirports] = useState([]);

  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  const [loading, setLoading] = useState(false);

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departuredDate: "",
    returnDate: ""
  });

  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  const [open, setOpen] = useState(false);
  const [cabin, setCabin] = useState("Economy");

  const cabinMap = {
    "Economy": "economy",
    "Business": "business",
    "First Class": "first"
  };

  // Cabin badge color
  const cabinBadgeClass = {
    Economy: "text-emerald-700 bg-emerald-50 border border-emerald-100",
    Business: "text-blue-700  border border-blue-100",
    "First Class": "text-amber-700 bg-amber-50 border border-amber-100"
  };

  // Cabin selected button color
  const cabinSelectedClass = {
    Economy: "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/20",
    Business: "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20",
    "First Class": "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20"
  };

  const handleChange = (type, value) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value)
    }));
  };

  const totalText = `${passengers.adults} Adult${passengers.adults > 1 ? "s" : ""}${passengers.children ? `, ${passengers.children} Child` : ""
    }${passengers.infants ? `, ${passengers.infants} Infant` : ""}`;

  async function handleSearch(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const origin = formData.get("origin");
    const destination = formData.get("destination");
    const date = formData.get("departuredDate");

    if (!origin || !destination || !date) {
      alert("Please fill all Required field");
      return;
    }

    navigate("/flight-list", {
      state: {
        origin,
        destination,
        date,
        returnDate,
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        cabin: cabinMap[cabin]
      }
    });
  }

  const searchAirports = async (value, type) => {
    if (type === "origin") {
      setOriginQuery(value);
    } else {
      setDestinationQuery(value);
    }

    if (value.length < 2) {
      if (type === "origin") {
        setOriginAirports([]);
        setShowOriginDropdown(false);
      } else {
        setDestinationAirports([]);
        setShowDestinationDropdown(false);
      }
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://kradtravel.com/api/flight/airports?query=${value}`
      );

      const result = await response.json();

      const airportList = result?.data?.data || [];

      if (type === "origin") {
        setOriginAirports(airportList);
        setShowOriginDropdown(true);
      } else {
        setDestinationAirports(airportList);
        setShowDestinationDropdown(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        originRef.current &&
        !originRef.current.contains(event.target)
      ) {
        setShowOriginDropdown(false);
      }

      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setShowDestinationDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div className="font-sans min-h-screen bg-slate-50/60 selection:text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            playsInline
            muted
            src="/video/herobg.mp4"
            className="w-full h-full object-cover opacity-45 scale-105"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-32 md:pb-44 text-center">

          {/* VIP Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold mb-6 shadow-xl"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>

            {/* <span className="tracking-wide">
              Exclusive Global Travel Concierge
            </span> */}

            <span className="text-amber-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border">
              VIP Fares
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 mt-5 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Direct access to private airline tariffs, boutique luxury stays,
            and seamless global journeys at wholesale pricing.
          </motion.p>

          {/* Quick Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-300"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>100% Guaranteed Fares</span>
            </div>

            <div className="flex items-center gap-2">
              <Flame size={16} className="text-amber-400" />
              <span>Up to 60% Off Standard Rates</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-400" />
              <span>24/7 Priority Travel Assistance</span>
            </div>
          </motion.div>

          {/* Search Box Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative z-30 mt-10 md:mt-12 text-left"
          >
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-100">

              {/* Trip Type Tabs */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">

                <button
                  type="button"
                  onClick={() => {
                    setRoundedEnable(false);
                    setReturnDate("");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${!roundedEnable
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  One Way
                </button>

                <button
                  type="button"
                  onClick={() => setRoundedEnable(true)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${roundedEnable
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  Round Trip
                </button>

              </div>

              <form onSubmit={handleSearch} className="space-y-6">

                {/* Row 1: Origin & Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Origin Field */}
                  <div className="group relative" ref={originRef}>

                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <PlaneTakeoff size={14} className="text-blue-600" />
                      <span>Departure City / Airport</span>
                    </label>

                    <div className="flex items-center border border-slate-200 group-focus-within:border-blue-600 group-focus-within:ring-4 group-focus-within:ring-blue-500/10 rounded-2xl px-4 py-3.5 bg-slate-50/70 group-focus-within:bg-white transition-all shadow-2xs hover:border-slate-300">

                      <input
                        type="text"
                        placeholder="Search origin airport or city (e.g. JFK)"
                        name="origin"
                        value={originQuery}
                        onChange={(e) =>
                          searchAirports(e.target.value, "origin")
                        }
                        className="w-full bg-transparent outline-none text-slate-900 text-sm font-semibold placeholder:text-slate-400 placeholder:font-normal"
                        autoComplete="off"
                      />

                    </div>

                    {showOriginDropdown && (
                      <div className="absolute top-full mt-2 left-0 w-full bg-white border border-slate-200/90 shadow-2xl rounded-2xl max-h-[300px] overflow-y-auto z-[9999] p-2">

                        {loading ? (
                          <div className="p-4 text-center text-xs font-bold text-slate-400">
                            Searching airports...
                          </div>
                        ) : originAirports.length > 0 ? (
                          originAirports.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setOriginQuery(
                                  item.iata_code.trim().toUpperCase()
                                );
                                setShowOriginDropdown(false);
                              }}
                              className="p-3 rounded-xl hover:/70 cursor-pointer transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-xl text-blue-700 flex items-center justify-center font-black text-xs shrink-0">
                                  {item.iata_code}
                                </div>

                                <div>
                                  <p className="font-bold text-slate-900 text-sm leading-snug">
                                    {item.city_name}
                                  </p>

                                  <p className="text-xs text-slate-500 line-clamp-1">
                                    {item.name}
                                  </p>
                                </div>

                              </div>

                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Select
                              </span>

                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-xs text-slate-500 font-medium">
                            No Airports Found
                          </div>
                        )}

                      </div>
                    )}

                  </div>

  
                  <div className="group relative" ref={destinationRef}>

                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <PlaneLanding size={14} className="text-indigo-600" />
                      <span>Destination City / Airport</span>
                    </label>

                    <div className="flex items-center border border-slate-200 group-focus-within:border-blue-600 group-focus-within:ring-4 group-focus-within:ring-blue-500/10 rounded-2xl px-4 py-3.5 bg-slate-50/70 group-focus-within:bg-white transition-all shadow-2xs hover:border-slate-300">

                      <input
                        type="text"
                        placeholder="Search arrival airport or city (e.g. LHR)"
                        name="destination"
                        value={destinationQuery}
                        onChange={(e) =>
                          searchAirports(e.target.value, "destination")
                        }
                        className="w-full bg-transparent outline-none text-slate-900 text-sm font-semibold placeholder:text-slate-400 placeholder:font-normal"
                        autoComplete="off"
                      />

                    </div>

                    {showDestinationDropdown && (
                      <div className="absolute top-full mt-2 left-0 w-full bg-white border border-slate-200/90 shadow-2xl rounded-2xl max-h-[300px] overflow-y-auto z-[9999] p-2">

                        {loading ? (
                          <div className="p-4 text-center text-xs font-bold text-slate-400">
                            Searching airports...
                          </div>
                        ) : destinationAirports.length > 0 ? (
                          destinationAirports.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setDestinationQuery(`${item.iata_code}`);
                                setShowDestinationDropdown(false);
                              }}
                              className="p-3 rounded-xl hover:/70 cursor-pointer transition-colors flex items-center justify-between"
                            >

                              <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center font-black text-xs shrink-0">
                                  {item.iata_code}
                                </div>

                                <div>
                                  <p className="font-bold text-slate-900 text-sm leading-snug">
                                    {item.city_name}
                                  </p>

                                  <p className="text-xs text-slate-500 line-clamp-1">
                                    {item.name}
                                  </p>
                                </div>

                              </div>

                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Select
                              </span>

                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-xs text-slate-500 font-medium">
                            No Airports Found
                          </div>
                        )}

                      </div>
                    )}

                  </div>

                </div>

                {/* Row 2: Dates, Passengers & Search Action */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">

                  {/* Departure & Return Dates */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3">

                    <div>

                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>Departure</span>
                      </label>

                      <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3.5 bg-slate-50/70 hover:bg-white transition-all shadow-2xs">

                        <input
                          type="date"
                          name="departuredDate"
                          className="w-full bg-transparent outline-none text-slate-900 text-xs sm:text-sm font-semibold cursor-pointer"
                        />

                      </div>

                    </div>

                    <div>

                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>Return</span>
                      </label>

                      <div
                        className={`flex items-center border rounded-2xl px-3.5 py-3.5 transition-all shadow-2xs ${roundedEnable
                            ? "border-slate-200 bg-slate-50/70 hover:bg-white"
                            : "border-dashed border-slate-300 bg-slate-50/30"
                          }`}
                      >

                        <input
                          type="date"
                          disabled={!roundedEnable}
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full bg-transparent outline-none text-slate-900 text-xs sm:text-sm font-semibold cursor-pointer disabled:text-slate-400"
                        />

                        {roundedEnable ? (
                          <X
                            size={16}
                            className="text-slate-400 hover:text-rose-500 cursor-pointer ml-1 shrink-0 transition-colors"
                            onClick={() => {
                              setRoundedEnable(false);
                              setReturnDate("");
                            }}
                          />
                        ) : (
                          <Calendar
                            size={16}
                            className="text-slate-400 hover:text-blue-600 cursor-pointer ml-1 shrink-0 transition-colors"
                            onClick={() => setRoundedEnable(true)}
                          />
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Passengers & Class Selector */}
                  {/* Passengers & Class Selector */}
                  <div className="lg:col-span-4 relative">

                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Users size={13} className="text-slate-500" />
                      <span>Travelers & Class</span>
                    </label>

                    {/* Main Selector */}
                    <div
                      onClick={() => setOpen(!open)}
                      className="min-h-[54px] border border-slate-300 rounded-2xl px-4 py-3 bg-white hover:border-blue-500 hover:shadow-sm text-sm cursor-pointer flex items-center justify-between gap-3 transition-all"
                    >

                      {/* Left Content */}
                      <div className="flex items-center gap-2 min-w-0 flex-1">

                        {/* Passenger Count */}
                        <span className="font-bold text-slate-900 whitespace-nowrap truncate">
                          {totalText}
                        </span>

                        {/* Cabin Badge */}
                        <span
                          className={`font-extrabold shrink-0 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap ${cabinBadgeClass[cabin]
                            }`}
                        >
                          {cabin}
                        </span>

                      </div>

                      {/* Arrow */}
                      <ChevronDown
                        size={18}
                        strokeWidth={2.5}
                        className={`text-slate-600 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : ""
                          }`}
                      />

                    </div>

                    {open && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute z-[9999] mt-2 w-full min-w-[320px] left-0 lg:right-0 lg:left-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 space-y-4"
                      >

                        {/* Passenger Types */}
                        {["adults", "children", "infants"].map((type) => (
                          <div
                            key={type}
                            className="flex justify-between items-center py-1"
                          >

                            {/* Passenger Info */}
                            <div>
                              <p className="text-sm font-bold text-slate-900 capitalize">
                                {type}
                              </p>

                              <p className="text-[11px] text-slate-500 font-medium">
                                {type === "adults"
                                  ? "12+ Years"
                                  : type === "children"
                                    ? "2-11 Years"
                                    : "Under 2 Years"}
                              </p>
                            </div>

                            {/* Counter */}
                            <div className="flex items-center gap-3">

                              {/* Minus */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChange(type, -1);
                                }}
                                className="w-9 h-9 rounded-xl border-2 border-slate-300 bg-white text-slate-800 flex items-center justify-center hover:bg-slate-100 hover:border-slate-400 transition-all cursor-pointer"
                              >
                                <Minus
                                  size={16}
                                  strokeWidth={2.5}
                                />
                              </button>

                              {/* Number */}
                              <span className="font-extrabold text-sm w-5 text-center text-slate-900">
                                {passengers[type]}
                              </span>

                              {/* Plus */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChange(type, 1);
                                }}
                                className="w-9 h-9 rounded-xl border-2 border-blue-600 bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 transition-all cursor-pointer shadow-sm shadow-blue-500/30"
                              >
                                <Plus
                                  size={17}
                                  strokeWidth={3}
                                  className="text-white"
                                />
                              </button>

                            </div>

                          </div>
                        ))}

                        {/* Cabin Class */}
                        <div className="border-t border-slate-100 pt-4">

                          <p className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-3">
                            Cabin Class
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {["Economy", "Business", "First Class"].map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCabin(item);
                                }}
                                className={`px-3.5 py-2 text-xs rounded-xl border-2 transition-all font-bold cursor-pointer ${cabin === item
                                    ? cabinSelectedClass[item]
                                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-500 hover:bg-slate-50"
                                  }`}
                              >
                                {item}
                              </button>
                            ))}

                          </div>

                        </div>

                        {/* Apply */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                          }}
                          type="button"
                          className="w-full mt-2 bg-blue-600 text-white py-3 rounded-xl text-xs font-extrabold hover:bg-blue-700 hover:shadow-lg transition-all cursor-pointer"
                        >
                          Apply Selection
                        </button>

                      </motion.div>
                    )}

                  </div>

                  {/* Search Flights Submit Button */}
                  <div className="lg:col-span-3">

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3.5 px-6 rounded-2xl text-sm font-extrabold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer tracking-wide"
                    >
                      <Search size={18} />
                      <span>Search Flights</span>
                    </button>

                  </div>

                </div>

              </form>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Page Content Sections */}
      <main className="space-y-16 py-12">
        <HowItWorks />
        <FlightDestination />
        <OurServices />
        <ExploreNearby />
        <Testimonials />
        <FAQPage />
      </main>

    </div>
  );
}