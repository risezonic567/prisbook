import React, { useEffect, useState, useMemo } from "react"
import { Plane, Filter, X, Clock, Luggage, Wifi, ShieldCheck, AlertCircle, ArrowRight, RotateCcw } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const sectionLabel =
    "mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500"

const checkboxClass =
    "h-4 w-4 cursor-pointer rounded border-[#e9e2d6] accent-[#176b70]"

const FlightSearchPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [visible, setVisisble] = useState(20)
    const searchData = location.state || JSON.parse(localStorage.getItem("flightSearchData"))

    const [flight, setFlight] = useState([])
    const [loading, setLoading] = useState(false)

    const [filterOpen, setFilterOpen] = useState(false)

    const [selectedAirlines, setSelectedAirlines] = useState([])

    const [maxPrice, setMaxPrice] = useState(25000)
    const [stopFilter, setStopFilter] = useState("all")

    const [layover, setLayover] = useState("all")

    const [cabinFilter, setCabinFilter] = useState(
        searchData?.cabin || "all"
    )

    const handleSelectFlight = (flight) => {
        const encodedId = btoa(flight.id)

        localStorage.setItem("selectedFlight", JSON.stringify(flight))

        navigate(`/checkout?flightId=${encodedId}`, {
            state: {
                flight,
                passengers: searchData
            }
        })
    }

    const filteredFlights = flight.filter((f) => {
        const airlineMatch =
            selectedAirlines.length === 0 ||
            selectedAirlines.includes(f.airline)

        let stopMatch = true

        if (stopFilter === "nonstop") {
            stopMatch = f.stops === 0
        } else if (stopFilter === "1stop") {
            stopMatch = f.stops === 1
        } else if (stopFilter === "2stop") {
            stopMatch = f.stops === 2
        }

        const priceMatch = f.price <= maxPrice

        const cabinMatch =
            cabinFilter === "all" || f.cabin === cabinFilter

        return airlineMatch && stopMatch && priceMatch && cabinMatch
    })

    const normalizeCabin = (cabin) => {
        return cabin
            ?.toLowerCase()
            .replace(" ", "_")
            .replace("class", "")
            .trim()
    }

    const formatFlights = (offers) => {
        return offers.map((offer) => {
            const segments = offer?.slices?.[0]?.segments || []
            const firstSeg = segments[0] || {}
            const lastSeg = segments[segments.length - 1] || {}

            const retSegments = offer?.slices?.[1]?.segments || []
            const retFirst = retSegments[0] || {}
            const retLast = retSegments[retSegments.length - 1] || {}

            const baggage = segments?.[0]?.passengers?.[0]?.baggages || []

            const rawCabin =
                firstSeg?.passengers?.[0]?.cabin_class_marketing_name ||
                firstSeg?.cabin?.name ||
                "economy"

            const rawReturnCabin =
                retFirst?.passengers?.[0]?.cabin_class_marketing_name ||
                retFirst?.cabin?.name ||
                null

            const flightNumber =
                firstSeg?.marketing_carrier?.iata_code && firstSeg?.marketing_carrier_flight_number
                    ? `${firstSeg.marketing_carrier.iata_code} ${firstSeg.marketing_carrier_flight_number}`
                    : firstSeg?.operating_carrier?.iata_code && firstSeg?.operating_carrier_flight_number
                        ? `${firstSeg.operating_carrier.iata_code} ${firstSeg.operating_carrier_flight_number}`
                        : "N/A"

            const stopFlight = segments
                .slice(0, -1)
                .map(seg => {
                    const city = seg?.destination?.city_name
                    const code = seg?.destination?.iata_code

                    return city && code ? `${city} (${code})` : null
                })
                .filter(Boolean)

            const slice = offer?.slices?.[0] || {}

            const refundData = offer?.conditions?.refund_before_departure
                || slice?.conditions?.refund_before_departure
                || null

            let isRefundable = null
            let isFreeRefundable = null

            if (refundData) {
                isRefundable = refundData.allowed

                isFreeRefundable =
                    refundData.allowed &&
                    Number(refundData.penalty_amount) === 0
            }

            const depDate = new Date(firstSeg?.departing_at)
            const arrDate = new Date(lastSeg?.arriving_at)

            const layover = segments.slice(0, -1).map((seg, i) => {
                const nextSeg = segments[i + 1]

                if (!nextSeg) return null

                const arrival = new Date(seg?.arriving_at)
                const nextDeparture = new Date(nextSeg?.departing_at)

                const diffMs = nextDeparture - arrival

                const hours = Math.floor(diffMs / (1000 * 60 * 60))
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

                return {
                    city: seg?.destination?.city_name,
                    code: seg?.destination?.iata_code,
                    duration: `${hours}h ${minutes}m`
                }
            }).filter(Boolean)

            const wifiInfo =
                segments?.[0]?.passengers?.[0]?.cabin?.amenities?.wifi || {}

            const hasWifi = wifiInfo?.available || false
            const wifiType = wifiInfo?.cost === "paid" ? "Paid" : "Free"

            return {
                id: offer.id,

                airline:
                    firstSeg?.marketing_carrier?.name ||
                    firstSeg?.operating_carrier?.name ||
                    firstSeg?.carrier?.name ||
                    firstSeg?.marketing_carrier?.iata_code ||
                    firstSeg?.operating_carrier?.iata_code ||
                    "Unknown Airline",

                logo:
                    firstSeg?.marketing_carrier?.logo_symbol_url ||
                    firstSeg?.operating_carrier?.logo_symbol_url ||
                    "https://placehold.co/40x40",

                departureTime: depDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),

                departureDate: depDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short"
                }),

                arrivalTime: arrDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),

                arrivalDate: arrDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit"
                }),

                departure: depDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),

                arrival: arrDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),

                returnDeparture: retFirst?.departing_at
                    ? new Date(retFirst.departing_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                    : null,

                returnArrival: retLast?.arriving_at
                    ? new Date(retLast.arriving_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                    : null,

                returnDepartureDate: retFirst?.departing_at
                    ? new Date(retFirst.departing_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short"
                    })
                    : null,

                returnArrivalDate: retLast?.arriving_at
                    ? new Date(retLast.arriving_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short"
                    })
                    : null,

                duration: offer?.slices?.[0]?.duration
                    ?.replace("PT", "")
                    .replace("H", "h ")
                    .replace("M", "m"),

                price: Number(offer.total_amount),
                currency: offer.total_currency,

                originCity: firstSeg?.origin?.city_name,
                destinationCity: lastSeg?.destination?.city_name,

                cabin: normalizeCabin(rawCabin),
                returnCabin: rawReturnCabin
                    ? normalizeCabin(rawReturnCabin)
                    : null,

                hasReturn: offer?.slices?.length > 1,

                baggage: baggage,
                stops: segments.length - 1,

                flightNumber: flightNumber,
                stopFlight: stopFlight,

                hasWifi: hasWifi,
                wifiType: wifiType,

                refundData: refundData,
                isRefundable: isRefundable,
                isFreeRefundable: isFreeRefundable,

                layover: layover,

                fullData: offer,
            }
        })
    }

    const airlines = useMemo(() => {
        return [...new Set(flight.map((f) => f.airline).filter(Boolean))]
    }, [flight])

    const handleAirline = (airline) => {
        setSelectedAirlines((prev) =>
            prev.includes(airline)
                ? prev.filter((a) => a !== airline)
                : [...prev, airline]
        )
    }

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                setLoading(true)

                const res = await fetch(
                    "http://localhost:3300/api/flight/flight-search",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(searchData),
                    }
                )

                const data = await res.json()

                const formatted = formatFlights(data.offers || [])
                setFlight(formatted)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (searchData) fetchFlights()
    }, [searchData])

    // ---------- UI helpers (look only) ----------
    const hasActiveFilters =
        selectedAirlines.length > 0 ||
        stopFilter !== "all" ||
        cabinFilter !== "all" ||
        maxPrice < 25000

    const resetFilters = () => {
        setSelectedAirlines([])
        setStopFilter("all")
        setCabinFilter("all")
        setMaxPrice(25000)
    }

    const STOP_OPTIONS = [
        ["nonstop", "Non-Stop Only"],
        ["1stop", "1 Stop"],
        ["2stop", "2+ Stops"],
    ]

    // One shared filter panel for mobile drawer + desktop sidebar
    const renderFilters = () => (
        <div className="space-y-6">
            {/* Cabin Class */}
            <div>
                <h3 className={sectionLabel}>Cabin Class</h3>
                <select
                    value={cabinFilter}
                    onChange={(e) => setCabinFilter(e.target.value)}
                    className="w-full cursor-pointer rounded-xl border border-[#e9e2d6] bg-white px-3.5 py-3 text-xs font-semibold text-[#17394a] outline-none transition focus:border-[#176b70] focus:bg-white"
                >
                    <option value="all">All Cabin Classes</option>
                    <option value="economy">Economy</option>
                    <option value="premium_economy">Premium Economy</option>
                    <option value="business">Business Class</option>
                    <option value="first">First Class</option>
                </select>
            </div>

            {/* Stops */}
            <div>
                <h3 className={sectionLabel}>Stops</h3>
                <div className="space-y-2.5">
                    {STOP_OPTIONS.map(([value, label]) => (
                        <label
                            key={value}
                            className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-slate-700 transition hover:text-[#176b70]"
                        >
                            <input
                                checked={stopFilter === value}
                                onChange={() =>
                                    setStopFilter(stopFilter === value ? "all" : value)
                                }
                                type="checkbox"
                                className={checkboxClass}
                            />
                            <span>{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Max Budget
                    </h3>
                    <span className="text-sm font-bold text-[#176b70]">
                        ${maxPrice.toLocaleString()}
                    </span>
                </div>
                <input
                    type="range"
                    min="2000"
                    max="25000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#e9e2d6] accent-[#176b70]"
                />
                <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-400">
                    <span>$60</span>
                    <span>$1,000</span>
                </div>
            </div>

            {/* Airlines */}
            <div>
                <h3 className={sectionLabel}>Airlines</h3>
                <div className="max-h-56 space-y-2.5 overflow-y-auto pr-2">
                    {airlines.map((airline, i) => (
                        <label
                            key={i}
                            className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-slate-700 transition hover:text-[#176b70]"
                        >
                            <input
                                type="checkbox"
                                checked={selectedAirlines.includes(airline)}
                                onChange={() => handleAirline(airline)}
                                className={checkboxClass}
                            />
                            <span className="truncate">{airline}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )

    if (loading) {
        return (
            <div className="flex min-h-[85vh] w-full items-center justify-center bg-white px-4">
                <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-[#e9e2d6] bg-white px-10 py-12 text-center shadow-xl shadow-[#17394a]/10">
                    <div className="relative mb-6">
                        <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#e6f2f1] border-t-[#176b70]"></div>
                        <Plane className="absolute inset-0 m-auto h-8 w-8 text-[#176b70]" />
                    </div>
                    <span className="mb-2 rounded-full bg-[#e6f2f1] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#176b70]">
                        Searching flights
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-[#17394a]">
                        Scanning Unpublished Fares
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                        Comparing airline routes, wholesale tariffs, and availability in real-time...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pb-20 pt-24 font-sans text-[#17394a] md:pt-28">
            {/* Mobile Filter Trigger */}
            <div className="mb-4 flex items-center justify-between px-4 lg:hidden">
                <button
                    onClick={() => setFilterOpen(true)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#e9e2d6] bg-white px-4 py-2.5 text-xs font-bold text-[#17394a] shadow-sm transition active:scale-95"
                >
                    <Filter size={15} className="text-[#176b70]" />
                    <span>Filter & Sort Flights</span>
                    {(selectedAirlines.length > 0 || stopFilter !== "all" || cabinFilter !== "all") && (
                        <span className="h-2 w-2 rounded-full bg-[#e8795c]"></span>
                    )}
                </button>
                <span className="rounded-full border border-[#e9e2d6] bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600">
                    {filteredFlights.length} Flights
                </span>
            </div>

            {/* Mobile Filter Drawer */}
            <div
                className={`fixed inset-0 z-[1000] bg-[#17394a]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    filterOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
                }`}
                onClick={() => setFilterOpen(false)}
            >
                <div
                    className={`flex h-full w-[85%] max-w-sm flex-col justify-between overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ${
                        filterOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <div className="flex items-center justify-between border-b border-[#e9e2d6] pb-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#17394a]">
                                <Filter size={18} className="text-[#176b70]" /> Filter Flights
                            </h2>
                            <button
                                onClick={() => setFilterOpen(false)}
                                aria-label="Close filters"
                                className="cursor-pointer rounded-xl bg-white p-2 text-[#17394a] transition hover:bg-slate-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="mt-4 cursor-pointer text-xs font-bold text-[#176b70] transition hover:underline"
                            >
                                Reset all
                            </button>
                        )}

                        <div className="py-5">{renderFilters()}</div>
                    </div>

                    <button
                        onClick={() => setFilterOpen(false)}
                        className="w-full cursor-pointer rounded-xl bg-[#176b70] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#125a5e]"
                    >
                        Show {filteredFlights.length} Flights
                    </button>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:px-8">

                {/* Desktop Sticky Sidebar */}
                <aside className="sticky top-28 hidden w-full shrink-0 lg:block lg:w-72 xl:w-80">
                    <div className="rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between border-b border-[#e9e2d6] pb-4">
                            <h2 className="flex items-center gap-2 text-base font-semibold text-[#17394a]">
                                <Filter size={18} className="text-[#176b70]" /> Filters
                            </h2>
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="cursor-pointer text-xs font-bold text-[#176b70] transition hover:underline"
                                >
                                    Reset all
                                </button>
                            )}
                        </div>

                        {renderFilters()}
                    </div>
                </aside>

                {/* Flight Results List */}
                <main className="w-full min-w-0 flex-1 space-y-5">
                    {/* Header route bar */}
                    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                        <div>
                            <h1 className="flex flex-wrap items-center gap-2.5 text-xl font-semibold tracking-tight text-[#17394a] sm:text-2xl">
                                <span>{flight[0]?.originCity || searchData?.origin || "Origin"}</span>
                                <ArrowRight size={18} className="text-[#176b70]" />
                                <span>{flight[0]?.destinationCity || searchData?.destination || "Destination"}</span>
                            </h1>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                                {searchData?.origin && searchData?.destination && (
                                    <span className="font-semibold text-slate-700">{searchData.origin} → {searchData.destination} • </span>
                                )}
                                Showing real-time unpublished fares & tariffs
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#e6f2f1] px-4 py-2 text-xs font-bold text-[#176b70] sm:self-center">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span>{filteredFlights.length} Flights Found</span>
                        </div>
                    </div>

                    {/* Flight Cards list */}
                    <div className="space-y-4">
                        {filteredFlights.length === 0 ? (
                            <div className="rounded-2xl border border-[#e9e2d6] bg-white p-14 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6f2f1]">
                                    <Plane className="h-8 w-8 text-[#176b70]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[#17394a]">No flights matched your filter</h3>
                                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                                    Try adjusting your budget, stops, or preferred airlines to see more flights.
                                </p>
                            </div>
                        ) : (
                            filteredFlights.slice(0, visible).map((flight) => (
                                <div
                                    key={flight.id}
                                    className="overflow-hidden rounded-2xl border border-[#e9e2d6] bg-white shadow-sm transition-all duration-300 hover:border-[#176b70]/40 hover:shadow-lg"
                                >
                                    <div className="flex flex-col justify-between gap-6 p-5 sm:p-6 lg:flex-row lg:items-center">

                                        {/* Main Details */}
                                        <div className="flex-1 space-y-5">
                                            {/* Airline header row */}
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e9e2d6] bg-white p-1.5">
                                                        <img
                                                            src={flight.logo}
                                                            alt={flight.airline}
                                                            width="40"
                                                            height="40"
                                                            loading="lazy"
                                                            className="h-full w-full object-contain"
                                                            onError={(e) => {
                                                                e.target.src = "https://placehold.co/40x40"
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-bold leading-tight text-[#17394a]">{flight.airline}</h4>
                                                        <p className="text-xs font-medium text-slate-400">
                                                            Flight Code: <span className="font-bold text-slate-700">{flight.flightNumber}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${
                                                        flight.stops === 0
                                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                            : "border-amber-200 bg-amber-50 text-amber-700"
                                                    }`}>
                                                        {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop via ${flight.stopFlight.join(",")}`}
                                                    </span>

                                                    {flight.layover.map((l, i) => (
                                                        <span key={i} className="rounded-full border border-[#cfe5e3] bg-[#e6f2f1] px-3 py-1 text-xs font-semibold text-[#176b70]">
                                                            {l.city} • {l.duration}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Route & Times */}
                                            <div className="flex items-center justify-between gap-4 rounded-xl border border-[#e9e2d6] bg-white p-4 sm:p-5">
                                                {/* Departure */}
                                                <div className="min-w-[90px] text-left">
                                                    <p className="text-2xl font-bold tracking-tight text-[#17394a] sm:text-3xl">{flight.departure}</p>
                                                    <p className="max-w-[130px] truncate text-xs font-bold text-slate-700">{flight.originCity}</p>
                                                    <p className="mt-0.5 text-[11px] font-semibold text-slate-400">{flight.departureDate}</p>
                                                </div>

                                                {/* Flight Path */}
                                                <div className="flex flex-1 flex-col items-center px-2 sm:px-4">
                                                    <span className="mb-2 flex items-center gap-1.5 rounded-full border border-[#e9e2d6] bg-white px-3 py-0.5 text-xs font-bold text-slate-600">
                                                        <Clock size={12} className="text-[#176b70]" />
                                                        {flight.duration}
                                                    </span>
                                                    <div className="flex w-full items-center gap-2">
                                                        <div className="h-[2px] flex-1 bg-[#e9e2d6]"></div>
                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e6f2f1] text-[#176b70]">
                                                            <Plane size={14} className="rotate-90 transform" />
                                                        </div>
                                                        <div className="h-[2px] flex-1 bg-[#e9e2d6]"></div>
                                                    </div>
                                                    <span className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                        {flight.stops === 0 ? "Direct Route" : "Connecting"}
                                                    </span>
                                                </div>

                                                {/* Arrival */}
                                                <div className="min-w-[90px] text-right">
                                                    <p className="text-2xl font-bold tracking-tight text-[#17394a] sm:text-3xl">{flight.arrival}</p>
                                                    <p className="ml-auto max-w-[130px] truncate text-xs font-bold text-slate-700">{flight.destinationCity}</p>
                                                    <p className="mt-0.5 text-[11px] font-semibold text-slate-400">{flight.arrivalDate}</p>
                                                </div>
                                            </div>

                                            {/* Feature Badges */}
                                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                                <span className="rounded-lg border border-[#d3dde4] bg-[#e8eef2] px-3 py-1 font-bold capitalize text-[#17394a]">
                                                    {flight.cabin.replace("_", " ")}
                                                </span>

                                                {flight.isFreeRefundable && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 font-bold text-emerald-700">
                                                        <ShieldCheck size={14} /> Free Cancellation
                                                    </span>
                                                )}

                                                {flight.isRefundable && !flight.isFreeRefundable && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                                                        <AlertCircle size={14} /> Refundable with Fee
                                                    </span>
                                                )}

                                                {flight.isRefundable === false && (
                                                    <span className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1 font-semibold text-rose-600">
                                                        Non-Refundable
                                                    </span>
                                                )}

                                                {flight.isRefundable === null && (
                                                    <span className="rounded-lg bg-white px-3 py-1 font-medium text-slate-500">
                                                        Refund Policy N/A
                                                    </span>
                                                )}

                                                {flight.hasWifi && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#cfe5e3] bg-[#e6f2f1] px-3 py-1 font-semibold text-[#176b70]">
                                                        <Wifi size={14} /> {flight.wifiType} Wifi
                                                    </span>
                                                )}

                                                {flight.baggage.length > 0 ? (
                                                    flight.baggage.map((bag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1 font-medium text-slate-700"
                                                        >
                                                            <Luggage size={13} className="text-slate-500" />
                                                            <span className="capitalize">{bag.type.replace("_", " ")}</span>: {bag.quantity}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="rounded-lg bg-white px-3 py-1 font-medium text-slate-500">
                                                        No baggage included
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="flex items-center justify-between border-t border-[#e9e2d6] pt-4 lg:min-w-[210px] lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                                            <div className="lg:text-right">
                                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Price per adult</span>
                                                <div className="mt-0.5 flex items-baseline gap-1">
                                                    <span className="text-3xl font-bold tracking-tight text-[#176b70] sm:text-4xl">
                                                        $ {flight.price}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] font-medium text-slate-400">Taxes & fees included</p>
                                            </div>

                                            <button
                                                onClick={() => handleSelectFlight(flight)}
                                                className="cursor-pointer rounded-xl bg-[#e8795c] px-7 py-3 text-xs font-extrabold text-white shadow-md shadow-[#e8795c]/20 transition-all hover:bg-[#cc654b] active:scale-95 sm:text-sm"
                                            >
                                                Select Flight
                                            </button>
                                        </div>
                                    </div>

                                    {/* Return flight strip if round trip */}
                                    {flight.hasReturn && (
                                        <div className="flex flex-col justify-between gap-3 border-t border-[#e9e2d6] bg-white px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e6f2f1] px-3 py-1 text-xs font-bold text-[#176b70]">
                                                    <RotateCcw size={12} /> Return Flight
                                                </span>
                                                <span className="text-xs font-semibold text-slate-500">
                                                    {flight.returnDepartureDate}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                                                <div>
                                                    <span className="font-extrabold text-[#17394a]">{flight.returnDeparture}</span> ({searchData?.destination})
                                                </div>
                                                <Plane size={14} className="text-[#176b70]" />
                                                <div>
                                                    <span className="font-extrabold text-[#17394a]">{flight.returnArrival}</span> ({searchData?.origin})
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                        {/* View More Button */}
                        {visible < filteredFlights.length && (
                            <div className="pb-2 pt-6 text-center">
                                <button
                                    onClick={() => setVisisble((prev) => prev + 15)}
                                    className="cursor-pointer rounded-xl border border-[#e9e2d6] bg-white px-8 py-3.5 text-sm font-bold text-[#17394a] shadow-sm transition hover:border-[#176b70] hover:text-[#176b70] active:scale-95"
                                >
                                    View More Flights ({filteredFlights.length - visible} remaining)
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default FlightSearchPage