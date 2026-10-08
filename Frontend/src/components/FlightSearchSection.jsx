import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Calendar, PlaneLanding, PlaneTakeoff, Users, X, Search, ChevronDown, Plus, Minus } from 'lucide-react';

const labelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500";

const boxClass =
  "flex h-12 items-center rounded-xl border border-[#e9e2d6] bg-white px-3.5 transition focus-within:border-[#176b70] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#176b70]/20 hover:bg-white";

const inputClass =
  "w-full bg-transparent text-sm font-medium text-[#17394a] outline-none placeholder:text-slate-400";

const dropdownClass =
  "absolute left-0 top-full z-[9999] mt-2 max-h-[300px] w-full min-w-[260px] overflow-y-auto rounded-xl border border-[#e9e2d6] bg-white shadow-xl";

export default function FlightSearchSection() {
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
    "First": "first"
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
      alert("Please fill all required fields");
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
      if (originRef.current && !originRef.current.contains(event.target)) {
        setShowOriginDropdown(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setShowDestinationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const renderAirportList = (airports, onPick) => (
    <div className={dropdownClass}>
      {loading ? (
        <div className="p-4 text-center text-xs font-medium text-slate-500">
          Searching airports...
        </div>
      ) : airports.length > 0 ? (
        airports.map((item, index) => (
          <div
            key={index}
            onClick={() => onPick(item)}
            className="cursor-pointer border-b border-[#e9e2d6] p-3 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e9e2d6] bg-[#e6f2f1] text-xs font-bold text-[#176b70]">
                {item.iata_code}
              </div>
              <div>
                <p className="text-sm font-bold text-[#17394a]">
                  {item.city_name}
                </p>
                <p className="text-xs text-slate-500">{item.name}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-xs font-medium text-slate-500">
          No airports found
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white font-sans">

      <div className="relative h-[380px] w-full overflow-hidden pt-16 sm:h-[420px] md:pt-20">
        <img
          src="/assets/prisbook/journey-hero.svg"
          alt=""
          aria-hidden="true"
          width="1600"
          height="900"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17394a]/90 via-[#17394a]/60 to-[#17394a]/20" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-20 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl space-y-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur">
              <PlaneTakeoff size={14} /> Private Aviation & Airline Tariffs
            </span>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Find <span className="text-[#8fd6d0]">Unpublished</span> Flight Deals
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Access exclusive discounted fares and unpublished routes
              unavailable on public search engines.
            </p>
          </motion.div>
        </div>
      </div>


      <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 pb-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-[#e9e2d6] bg-white p-4 shadow-xl shadow-[#17394a]/10 sm:p-5"
        >

          <div className="mb-4 flex items-center gap-2">
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
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_1fr_1.3fr_auto]">

              <div className="relative" ref={originRef}>
                <label className={labelClass}>From</label>
                <div className={boxClass}>
                  <PlaneTakeoff size={18} className="mr-2.5 shrink-0 text-[#176b70]" />
                  <input
                    type="text"
                    placeholder="City or Airport"
                    name="origin"
                    value={originQuery}
                    onChange={(e) => searchAirports(e.target.value, "origin")}
                    className={inputClass}
                    autoComplete="off"
                  />
                </div>

                {showOriginDropdown &&
                  renderAirportList(originAirports, (item) => {
                    setOriginQuery(item.iata_code.trim().toUpperCase());
                    setShowOriginDropdown(false);
                  })}
              </div>


              <div className="relative" ref={destinationRef}>
                <label className={labelClass}>To</label>
                <div className={boxClass}>
                  <PlaneLanding size={18} className="mr-2.5 shrink-0 text-[#176b70]" />
                  <input
                    type="text"
                    placeholder="City or Airport"
                    name="destination"
                    value={destinationQuery}
                    onChange={(e) => searchAirports(e.target.value, "destination")}
                    className={inputClass}
                    autoComplete="off"
                  />
                </div>

                {showDestinationDropdown &&
                  renderAirportList(destinationAirports, (item) => {
                    setDestinationQuery(`${item.iata_code}`);
                    setShowDestinationDropdown(false);
                  })}
              </div>


              <div>
                <label className={labelClass}>Departure</label>
                <div className={boxClass}>
                  <input
                    type="date"
                    name="departuredDate"
                    className={`${inputClass} cursor-pointer text-xs`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Return</label>
                <div
                  className={`flex h-12 items-center rounded-xl border px-3.5 transition ${roundedEnable
                      ? "border-[#e9e2d6] bg-white focus-within:border-[#176b70] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#176b70]/20"
                      : "border-dashed border-[#d9d0bf] bg-white"
                    }`}
                >
                  <input
                    type="date"
                    disabled={!roundedEnable}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className={`${inputClass} cursor-pointer text-xs disabled:text-slate-400`}
                  />
                  {roundedEnable ? (
                    <X
                      size={16}
                      className="ml-1 shrink-0 cursor-pointer text-slate-400 hover:text-slate-600"
                      onClick={() => {
                        setRoundedEnable(false);
                        setReturnDate("");
                      }}
                    />
                  ) : (
                    <Calendar
                      size={16}
                      className="ml-1 shrink-0 cursor-pointer text-slate-500 hover:text-[#176b70]"
                      onClick={() => setRoundedEnable(true)}
                    />
                  )}
                </div>
              </div>

              {/* Travellers & Class */}
              <div className="relative">
                <label className={labelClass}>Travelers & Class</label>
                <div
                  onClick={() => setOpen(!open)}
                  className={`${boxClass} cursor-pointer justify-between text-xs`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Users size={16} className="shrink-0 text-[#176b70]" />
                    <span className="truncate font-semibold text-[#17394a]">
                      {totalText}
                    </span>
                    <span className="shrink-0 font-bold text-[#176b70]">
                      • {cabin}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {/* Passenger Popover */}
                {open && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-0 z-[999] mt-2 w-72 space-y-4 rounded-xl border border-[#e9e2d6] bg-white p-4 shadow-xl lg:left-auto lg:right-0"
                  >
                    {['adults', 'children', 'infants'].map((type) => (
                      <div key={type} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold capitalize text-[#17394a]">
                            {type}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400">
                            {type === 'adults'
                              ? '12+ Years'
                              : type === 'children'
                                ? '2-11 Years'
                                : 'Under 2 Years'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleChange(type, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e9e2d6] text-slate-600 transition-colors hover:bg-slate-50"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-[#17394a]">
                            {passengers[type]}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleChange(type, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-[#176b70] text-[#176b70] transition-colors hover:bg-[#e6f2f1]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-[#e9e2d6] pt-3">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                        Cabin Class
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Economy", "Business", "First"].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setCabin(item)}
                            className={`rounded-md border px-3 py-1 text-xs font-semibold transition-all ${cabin === item
                                ? "border-[#176b70] bg-[#176b70] text-white"
                                : "border-[#e9e2d6] bg-white text-slate-600 hover:border-[#176b70]"
                              }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="mt-2 w-full rounded-lg bg-[#17394a] py-2 text-xs font-bold text-white transition-colors hover:bg-[#102b3c]"
                    >
                      Done
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
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}