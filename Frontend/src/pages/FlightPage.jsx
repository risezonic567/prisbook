import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import HowItWorks from './HowItWorks';
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
  ArrowLeftRight,
  ArrowRight
} from 'lucide-react';
import FlightDestination from './Destination/FlightDestination';
import ExploreNearby from './ExploreNearby';
import FAQPage from './FaqPage';
import { useNavigate } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import OurServices from '../components/OurServices';

const labelClass =
  "mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-slate-500";

const boxClass =
  "flex h-14 min-w-0 items-center gap-2.5 rounded-xl border border-[#e9e2d6] bg-white px-3 transition-colors hover:border-[#176b70]/50 focus-within:border-[#176b70]";

const textInputClass =
  "min-w-0 w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#17394a] outline-none placeholder:text-xs placeholder:font-normal placeholder:text-slate-400 focus:ring-0";

const dropdownClass =
  "absolute left-0 top-full z-[9999] mt-2 max-h-[300px] w-full min-w-[260px] overflow-y-auto rounded-2xl border border-[#e9e2d6] bg-white p-2 shadow-2xl";

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
    Economy: "text-[#176b70] bg-[#e6f2f1] border border-[#cfe5e3]",
    Business: "text-[#17394a] bg-[#e8eef2] border border-[#d3dde4]",
    "First Class": "text-amber-700 bg-amber-50 border border-amber-100"
  };

  // Cabin selected button color
  const cabinSelectedClass = {
    Economy: "bg-[#176b70] text-white border-[#176b70]",
    Business: "bg-[#17394a] text-white border-[#17394a]",
    "First Class": "bg-amber-600 text-white border-amber-600"
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
        `https://www.prisbook.com/api/flight/airports?query=${value}`
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

  // Shared airport suggestion list (look only)
  const renderAirportList = (airports, onPick) => (
    <div className={dropdownClass}>
      {loading ? (
        <div className="p-4 text-center text-xs font-bold text-slate-400">
          Searching airports...
        </div>
      ) : airports.length > 0 ? (
        airports.map((item, index) => (
          <div
            key={index}
            onClick={() => onPick(item)}
            className="flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f2f1] text-xs font-black text-[#176b70]">
                {item.iata_code}
              </div>
              <div>
                <p className="text-sm font-bold leading-snug text-[#17394a]">
                  {item.city_name}
                </p>
                <p className="line-clamp-1 text-xs text-slate-500">
                  {item.name}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Select
            </span>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-xs font-medium text-slate-500">
          No Airports Found
        </div>
      )}
    </div>
  );

  return (
    <div className="font-sans min-h-screen overflow-x-clip bg-white text-[#17394a]">

      {/* Hero Section */}
      <section className="relative flex min-h-[30vh] items-center overflow-hidden bg-[#17394a] sm:min-h-[34vh] md:min-h-[40vh]">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/prisbook/journey-hero.svg"
            alt=""
            aria-hidden="true"
            width="1600"
            height="900"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#17394a]/65 via-[#17394a]/35 to-[#17394a]/95" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-24 text-center sm:px-6 sm:pb-24 md:pb-28 md:pt-28">

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Your next journey starts here.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
          >
            Compare flights and find a route that takes you somewhere new.
          </motion.p>
        </div>
      </section>

      {/* Flight Search */}
      <section className="relative z-20 -mt-12 px-4 pb-8 sm:-mt-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 overflow-hidden" aria-hidden="true">
          <img
            src="/assets/prisbook/flight-search-banner.svg"
            alt=""
            width="1600"
            height="420"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#17394a]/25 to-[#17394a]/65" />
        </div>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative z-30 text-left"
          >
            <div className="rounded-2xl border border-[#e9e2d6] bg-white p-4 shadow-xl shadow-[#17394a]/10 sm:p-6">

              {/* Trip Type Tabs */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRoundedEnable(false);
                    setReturnDate("");
                  }}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${!roundedEnable
                      ? "bg-[#176b70] text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  One Way
                </button>

                <button
                  type="button"
                  onClick={() => setRoundedEnable(true)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${roundedEnable
                      ? "bg-[#176b70] text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  Round Trip
                </button>

                <button
                  type="button"
                  disabled
                  title="Multi-city booking is not available yet"
                  className="cursor-not-allowed rounded-full border border-[#e9e2d6] bg-white px-4 py-2 text-xs font-bold text-slate-400 opacity-70 sm:text-sm"
                >
                  Multi City
                </button>
              </div>

              <form
                onSubmit={handleSearch}
                className="flight-search-form grid min-w-0 grid-cols-1 items-end gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[minmax(0,1.15fr)_2.75rem_minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(160px,.9fr)]"
              >

                {/* Origin */}
                <div className="relative min-w-0" ref={originRef}>
                  <label className={labelClass}>From</label>

                  <div className={boxClass}>
                    <PlaneTakeoff size={17} className="shrink-0 text-[#176b70]" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="City or airport"
                      name="origin"
                      value={originQuery}
                      onChange={(e) => searchAirports(e.target.value, "origin")}
                      className={textInputClass}
                      autoComplete="off"
                    />
                  </div>

                  {showOriginDropdown &&
                    renderAirportList(originAirports, (item) => {
                      setOriginQuery(item.iata_code.trim().toUpperCase());
                      setShowOriginDropdown(false);
                    })}
                </div>

                {/* Swap icon (desktop only, decorative) */}
                <div className="hidden h-14 items-center justify-center xl:flex">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9e2d6] bg-white text-[#176b70]"
                    aria-hidden="true"
                  >
                    <ArrowLeftRight size={17} />
                  </span>
                </div>

                {/* Destination */}
                <div className="relative min-w-0" ref={destinationRef}>
                  <label className={labelClass}>To</label>

                  <div className={boxClass}>
                    <PlaneLanding size={17} className="shrink-0 text-[#176b70]" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="City or airport"
                      name="destination"
                      value={destinationQuery}
                      onChange={(e) => searchAirports(e.target.value, "destination")}
                      className={textInputClass}
                      autoComplete="off"
                    />
                  </div>

                  {showDestinationDropdown &&
                    renderAirportList(destinationAirports, (item) => {
                      setDestinationQuery(`${item.iata_code}`);
                      setShowDestinationDropdown(false);
                    })}
                </div>

                {/* Departure */}
                <div className="min-w-0">
                  <label className={labelClass}>Departure</label>
                  <div className={boxClass}>
                    <input
                      type="date"
                      name="departuredDate"
                      className={`${textInputClass} cursor-pointer`}
                    />
                  </div>
                </div>

                {/* Return */}
                <div className="min-w-0">
                  <label className={labelClass}>Return</label>
                  <div
                    className={`flex h-14 min-w-0 items-center gap-2 rounded-xl border px-3 transition-colors ${roundedEnable
                        ? "border-[#e9e2d6] bg-white hover:border-[#176b70]/50 focus-within:border-[#176b70]"
                        : "border-dashed border-[#d9d0bf] bg-white"
                      }`}
                  >
                    <input
                      type="date"
                      disabled={!roundedEnable}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className={`${textInputClass} cursor-pointer disabled:text-slate-400`}
                    />

                    {roundedEnable ? (
                      <button
                        type="button"
                        aria-label="Remove return date"
                        onClick={() => {
                          setRoundedEnable(false);
                          setReturnDate("");
                        }}
                        className="ml-1 shrink-0 cursor-pointer text-slate-400 transition-colors hover:text-rose-500"
                      >
                        <X size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label="Add return date"
                        onClick={() => setRoundedEnable(true)}
                        className="ml-1 shrink-0 cursor-pointer text-slate-500 transition-colors hover:text-[#176b70]"
                      >
                        <Calendar size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Travellers & Class */}
                <div className="relative min-w-0">
                  <label className={labelClass}>Travellers &amp; Class</label>

                  <div
                    onClick={() => setOpen(!open)}
                    className={`${boxClass} cursor-pointer justify-between text-sm`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Users size={17} className="shrink-0 text-[#176b70]" aria-hidden="true" />

                      <span className="truncate whitespace-nowrap font-bold text-[#17394a]">
                        {totalText}
                      </span>

                      <span
                        className={`shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-bold ${cabinBadgeClass[cabin]}`}
                      >
                        {cabin}
                      </span>
                    </div>

                    <ChevronDown
                      size={18}
                      strokeWidth={2.5}
                      className={`shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180 text-[#176b70]" : ""
                        }`}
                    />
                  </div>

                  {open && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute left-0 z-[9999] mt-2 w-full min-w-[280px] space-y-4 rounded-2xl border border-[#e9e2d6] bg-white p-5 shadow-2xl sm:w-80 xl:left-auto xl:right-0"
                    >
                      {["adults", "children", "infants"].map((type) => (
                        <div
                          key={type}
                          className="flex items-center justify-between py-1"
                        >
                          <div>
                            <p className="text-sm font-bold capitalize text-[#17394a]">
                              {type}
                            </p>
                            <p className="text-[11px] font-medium text-slate-500">
                              {type === "adults"
                                ? "12+ Years"
                                : type === "children"
                                  ? "2-11 Years"
                                  : "Under 2 Years"}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChange(type, -1);
                              }}
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-[#e9e2d6] bg-white text-slate-700 transition-all hover:bg-slate-50"
                            >
                              <Minus size={16} strokeWidth={2.5} />
                            </button>

                            <span className="w-5 text-center text-sm font-extrabold text-[#17394a]">
                              {passengers[type]}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChange(type, 1);
                              }}
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-[#176b70] bg-[#176b70] text-white transition-all hover:bg-[#125a5e]"
                            >
                              <Plus size={16} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Cabin Class */}
                      <div className="border-t border-[#e9e2d6] pt-4">
                        <p className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
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
                              className={`cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${cabin === item
                                  ? cabinSelectedClass[item]
                                  : "border-[#e9e2d6] bg-white text-slate-700 hover:border-[#176b70] hover:bg-slate-50"
                                }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(false);
                        }}
                        type="button"
                        className="mt-2 w-full cursor-pointer rounded-xl bg-[#17394a] py-3 text-xs font-extrabold text-white transition-all hover:bg-[#102b3c]"
                      >
                        Apply Selection
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Search Button */}
              <div className="sm:col-span-2 lg:col-span-1">
                             <button
                               type="submit"
                               className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#176b70] px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#125a5e] active:scale-95"
                             >
                               <Search size={18} />
                               <span>Search Flights</span>
                             </button>
                           </div>

              </form>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Page Content Sections */}
      <main className="space-y-4 pb-10 pt-8 sm:pt-12">
        <FlightDestination />
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#17394a] px-6 py-8 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#176b70]/60 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f4bd8f]">A little more room to roam</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Find an offer for your next escape.</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">Explore the latest travel deals and plan a getaway that feels like yours.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/travel-deals")}
              className="relative mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#e8795c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#cc654b] lg:mt-0"
            >
              Browse travel deals
              <ArrowRight size={17} className="ml-2" />
            </button>
          </div>
        </section>
        <HowItWorks />
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#176b70]">From search to takeoff</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#17394a] sm:text-4xl">Four simple steps to go.</h2>
            </div>
            <ol className="grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-0">
              {[
                ["01", "Search", "Choose your route and travel dates."],
                ["02", "Compare", "Explore the options that fit your plans."],
                ["03", "Book", "Complete your booking details securely."],
                ["04", "Fly", "Get ready for the journey ahead."],
              ].map(([number, title, description], index) => (
                <li key={number} className="relative border-l border-[#d8e3df] pl-5 md:border-l-0 md:border-t md:px-5 md:pb-0 md:pt-6 first:md:pl-0 last:md:pr-0">
                  <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-[#176b70] text-[8px] font-bold text-white md:-top-[13px] md:left-5 first:md:left-0">{number}</span>
                  <h3 className="text-lg font-bold text-[#17394a]">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#697b80]">{description}</p>
                  {index < 3 && <ArrowRight size={16} className="absolute right-4 top-7 hidden text-[#176b70] md:block" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </section>
        <OurServices />
        <ExploreNearby />
        <Testimonials />
        <FAQPage />
      </main>

    </div>
  );
}