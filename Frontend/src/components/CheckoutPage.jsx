import React, { useEffect, useState } from 'react';
import { 
  Plane, 
  User, 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  FileText
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const location = useLocation();
  const searchPassengers = location.state?.passengers || { adults: 1, children: 0, infants: 0 };
  const storedFlight = localStorage.getItem("selectedFlight");
  const [showPayment, setShowPayment] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [flight, setFlight] = useState(
    location.state?.flight || (storedFlight ? JSON.parse(storedFlight) : null)
  );
  const [loading, setLoading] = useState(false);
  const [contactus, setContactUs] = useState({
    email: "",
    phone: ""
  });

  // const token = localStorage.getItem("token")

  // useEffect(()=>{
  //   if(!token){
  //     alert("Please Login Your Account")
  //     navigate("/login")
  //   }
  // },[])

  const validateForm = () => {
    // Passenger Validation
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];

      if (!p.firstName.trim()) {
        setError(`Passenger ${i + 1}: First Name is required`);
        return false;
      }

      if (!p.lastName.trim()) {
        setError(`Passenger ${i + 1}: Last Name is required`);
        return false;
      }

      if (!p.gender) {
        setError(`Passenger ${i + 1}: Gender is required`);
        return false;
      }

      if (!p.dob) {
        setError(`Passenger ${i + 1}: Age is required`);
        return false;
      }

      if (isNaN(p.dob)) {
        setError(`Passenger ${i + 1}: Age must be a valid number`);
        return false;
      }

      // if (!p.passport.trim()) {
      //   setError(`Passenger ${i + 1}: Passport Number is required`);
      //   return false;
      // }

      // if (!p.nationality.trim()) {
      //   setError(`Passenger ${i + 1}: Nationality is required`);
      //   return false;
      // }
    }

    // Contact Validation
    if (!contactus.email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(contactus.email)) {
      setError("Invalid Email address");
      return false;
    }

    if (!contactus.phone.trim()) {
      setError("Phone Number is required");
      return false;
    }

    if (contactus.phone.length < 10) {
      setError("Invalid Phone Number (minimum 10 digits)");
      return false;
    }

    setError("");
    return true;
  };

  const [passengers, setPassengers] = useState(() => {
    const list = [];
    const counts = {
      adult: searchPassengers.adults || 0,
      child: searchPassengers.children || 0,
      infant: searchPassengers.infants || 0
    };

    Object.keys(counts).forEach(type => {
      for (let i = 0; i < counts[type]; i++) {
        list.push({
          firstName: "",
          lastName: "",
          gender: "",
          dob: "", // Age or date of birth stored here
          type: type,
          passport: "",
          passportName: "",
          nationality: ""
        });
      }
    });
    return list;
  });

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // =========================
      // STEP 1: CREATE BOOKING
      // =========================

      const bookingRes = await fetch(
        "https://kradtravel.com/api/checkout/booking",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },

          body: JSON.stringify({
            offerId: flight?.id,

            passengers: passengers.map((p) => ({
              name: `${p.firstName} ${p.lastName}`,
              age: p.dob,
              gender: p.gender,
            })),

            contact: contactus,

            flightData: {
              airline: flight.airline,

              from: flight.originCity,

              to: flight.destinationCity,

              departureTime: flight.departure,

              arrivalTime: flight.arrival,

              price: Number(flight.price),

              currency: "USD",
            },
          }),
        }
      );

      const bookingData = await bookingRes.json();

      if (!bookingData?.booking?._id) {
        alert("Booking Failed");
        return;
      }

      const paymentRes = await fetch(
        "https://kradtravel.com/api/payment/initiate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },

          body: JSON.stringify({
            bookingId: bookingData.booking._id,
          }),
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentData?.cashier_token) {
        alert(
          paymentData.message || "Cashier Token Missing"
        );
        return;
      }

      const oldScript = document.getElementById("bridgerpay-widget");
      if (oldScript) {
        oldScript.remove();
      }

      const oldContainer = document.getElementById("bridgerpay-container");
      if (oldContainer) {
        oldContainer.innerHTML = "";
      }

      const script = document.createElement("script");
      script.id = "bridgerpay-widget";
      script.src = "https://checkout.bridgerpay.com/v2/launcher";
      script.async = true;

      script.setAttribute("data-cashier-key", paymentData.cashier_key);
      script.setAttribute("data-cashier-token", paymentData.cashier_token);

      setShowPayment(true);

      setTimeout(() => {
        const container = document.getElementById("bridgerpay-container");

        if (container) {
          container.appendChild(script);
        } else {
          console.log("Container Not Found");
        }
      }, 300);

    } catch (error) {
      console.log("PAYMENT ERROR:", error);
      alert("Payment Error");
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-20'>
      <div className="bg-white/95 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-200/80 text-center max-w-md w-full relative overflow-hidden">
        <div className="w-20 h-20  text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-blue-100 shadow-sm">
          <Plane size={36} className="text-blue-600" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Checkout Portal</span>
        <h2 className="text-2xl font-black text-slate-900 mt-3 mb-2 tracking-tight">No Flight Selected</h2>
        <p className="text-slate-500 text-sm mb-6 font-normal leading-relaxed">Please select a flight to proceed with your booking and passenger information.</p>
        <Link 
          to="/" 
          className='inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl w-full text-sm'
        >
          <span>Return To Search</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full  border border-blue-200/60 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">Review & Complete Booking</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Verify your selected flight details and provide passenger information to finalize your ticket reservation.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Left Form Section */}
          <div className="lg:col-span-2 space-y-7">

            {/* Flight Summary Card */}
            <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-7 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5 font-bold text-sm">
                  <Plane size={18} className="text-blue-400" /> 
                  <span>Flight Itinerary Summary</span>
                </div>
                {flight.airline && (
                  <span className="text-xs bg-white/10 border border-white/15 px-3 py-1 rounded-full font-bold text-slate-200">
                    {flight.airline}
                  </span>
                )}
              </div>
              
              <div className="p-7">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Origin */}
                  <div className="text-center sm:text-left flex-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Departure</span>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-heading">{flight.originCity}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-600 text-sm mt-1 font-semibold">
                      <Clock size={14} className="text-blue-600" />
                      <span>{flight.departure}</span>
                    </div>
                  </div>

                  {/* Flight Route Indicator */}
                  <div className="flex flex-col items-center justify-center px-4 my-2 sm:my-0 w-full sm:w-auto">
                    <span className="text-xs font-bold text-blue-700  border border-blue-200 px-3.5 py-1 rounded-full mb-1 shadow-2xs">
                      {flight.duration || 'Direct'}
                    </span>
                    <div className="relative w-36 sm:w-32 flex items-center justify-center my-1.5">
                      <div className="h-[2px] bg-slate-200 w-full"></div>
                      <div className="absolute bg-white p-1.5 rounded-full border border-slate-200 shadow-sm text-blue-600">
                        <Plane size={14} className="transform rotate-90" />
                      </div>
                    </div>
                    {flight.departureDate && (
                      <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                        <Calendar size={12} className="text-slate-400" /> {flight.departureDate}
                      </span>
                    )}
                  </div>

                  {/* Destination */}
                  <div className="text-center sm:text-right flex-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Arrival</span>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-heading">{flight.destinationCity}</p>
                    <div className="flex items-center justify-center sm:justify-end gap-1.5 text-slate-600 text-sm mt-1 font-semibold">
                      <Clock size={14} className="text-blue-600" />
                      <span>{flight.arrival}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details Form */}
            <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm p-7 sm:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-5">
                <div className="w-10 h-10  text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 font-heading">Traveler Details</h2>
                  <p className="text-xs text-slate-500 font-medium">Please enter passenger information exactly as shown on government IDs</p>
                </div>
              </div>

              <div className="space-y-6">
                {passengers.map((p, i) => (
                  <div key={i} className="p-6 border border-slate-200/80 rounded-2xl bg-slate-50/60 hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider">
                        <User size={13} /> {p.type} {i + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* First Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name *</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          value={p.firstName}
                          onChange={(e) => handleChange(i, "firstName", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs"
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name *</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={p.lastName}
                          onChange={(e) => handleChange(i, "lastName", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender *</label>
                        <select
                          value={p.gender}
                          onChange={(e) => handleChange(i, "gender", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs cursor-pointer"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      {/* Age */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Age *</label>
                        <input
                          type="text"
                          placeholder="e.g. 25"
                          value={p.dob}
                          onChange={(e) => handleChange(i, "dob", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs"
                        />
                      </div>

                      {/* Passport */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Passport Number (Optional)</label>
                        <input
                          type="text"
                          placeholder="Passport Number"
                          value={p.passport}
                          onChange={(e) => handleChange(i, "passport", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs"
                        />
                      </div>

                      {/* Nationality */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Nationality (Optional)</label>
                        <input
                          type="text"
                          placeholder="Nationality"
                          value={p.nationality}
                          onChange={(e) => handleChange(i, "nationality", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={18} className="text-blue-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm font-heading">Contact Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={contactus.email}
                        onChange={(e) => setContactUs({ ...contactus, email: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={contactus.phone}
                        onChange={(e) => setContactUs({ ...contactus, phone: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-2xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-3">
                  <AlertCircle size={20} className="shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm p-7 sm:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-5">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 font-heading">Payment Authorization</h2>
                  <p className="text-xs text-slate-500 font-medium">Encrypted and secure checkout powered by BridgerPay</p>
                </div>
              </div>

              <button
                // onClick={handlePayment}
                disabled={loading}
                className={`${
                  loading 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 active:scale-[0.99] shadow-lg shadow-blue-500/25 hover:shadow-xl'
                } text-white px-8 py-4 rounded-2xl w-full font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer tracking-wide`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Booking...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay ${flight.price}</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-emerald-800 bg-emerald-50 py-3 rounded-xl text-xs font-bold border border-emerald-200">
                <ShieldCheck size={16} className="text-emerald-600" /> 
                <span>256-bit SSL Bank-Grade Encryption Guaranteed</span>
              </div>
            </div>

          </div>

          {/* Right Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm p-7 sticky top-28 space-y-6">
              <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center justify-between font-heading">
                <span>Fare Summary</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold">USD</span>
              </h2>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Base Fare ({passengers.length} Traveler{passengers.length > 1 ? 's' : ''})</span>
                  <span className="font-bold text-slate-900">${flight.price}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Taxes & Airline Surcharges</span>
                  <span className="font-bold text-slate-900">$0.00</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Concierge Booking Fee</span>
                  <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-xs">FREE</span>
                </div>

                <div className="border-t border-slate-200 pt-5 mt-5 flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-900 text-base font-heading">Total Amount</span>
                  <span className="font-black text-3xl text-blue-600 font-heading">${flight.price}</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/70 p-4 rounded-2xl text-xs text-slate-500 leading-relaxed space-y-2.5">
                <div className="flex items-start gap-2 text-slate-800 font-bold">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Free cancellation within 24 hours of booking</span>
                </div>
                <p className="font-normal text-[11px] text-slate-400">
                  By clicking "Proceed to Pay", you confirm traveler info matches government IDs and agree to our booking terms.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Overlay for BridgerPay Widget */}
        {showPayment && (
          <div
            className="payment-overlay"
            onClick={() => setShowPayment(false)}
          >
            <div
              className="payment-modal bg-white p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setShowPayment(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2 font-heading">
                <CreditCard size={20} className="text-blue-600" />
                <span>Complete Payment</span>
              </h3>

              {/* BridgerPay Widget Container */}
              <div id="bridgerpay-container" className="min-h-[300px]"></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { Plane, User, CreditCard, ShieldCheck } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// export default function CheckoutPage() {
//   const location = useLocation();
//   const searchPassengers = location.state?.passengers || { adults: 1, children: 0, infants: 0 };
//   const storedFlight = localStorage.getItem("selectedFlight");
//   const [showPayment, setShowPayment] = useState(false);

//   const navigate = useNavigate()

//   const [error, setError] = useState("")

//   const [flight, setFlight] = useState(
//     location.state?.flight || (storedFlight ? JSON.parse(storedFlight) : null)
//   );
//   const [loading, setLoading] = useState(false);
//   const [contactus, setContactUs] = useState({
//     email: "",
//     phone: ""
//   });

//   // const token = localStorage.getItem("token")


//   //   useEffect(()=>{
//   //     if(!token){
//   //       alert("Please Login Your Account")

//   //       navigate("/login")
//   //     }

//   //   },[])

//   const validateForm = () => {

//     // Passenger Validation
//     for (let i = 0; i < passengers.length; i++) {

//       const p = passengers[i];

//       if (!p.firstName.trim()) {
//         setError(`Passenger ${i + 1}: First Name is required`);
//         return false;
//       }

//       if (!p.lastName.trim()) {
//         setError(`Passenger ${i + 1}: Last Name is required`);
//         return false;
//       }

//       if (!p.gender) {
//         setError(`Passenger ${i + 1}: Gender is required`);
//         return false;
//       }

//       if (!p.dob) {
//         setError(`Passenger ${i + 1}: Age is required`);
//         return false;
//       }

//       if (isNaN(p.dob)) {
//         setError(`Passenger ${i + 1}: Age must be number`);
//         return false;
//       }

//       // if (!p.passport.trim()) {
//       //   setError(`Passenger ${i + 1}: Passport Number is required`);
//       //   return false;
//       // }

//       // if (!p.nationality.trim()) {
//       //   setError(`Passenger ${i + 1}: Nationality is required`);
//       //   return false;
//       // }
//     }

//     // Contact Validation
//     if (!contactus.email.trim()) {
//       setError("Email is required");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(contactus.email)) {
//       setError("Invalid Email");
//       return false;
//     }

//     if (!contactus.phone.trim()) {
//       setError("Phone Number is required");
//       return false;
//     }

//     if (contactus.phone.length < 10) {
//       setError("Invalid Phone Number");
//       return false;
//     }

//     setError("");
//     return true;
//   };

//   const [passengers, setPassengers] = useState(() => {
//     const list = [];
//     const counts = {
//       adult: searchPassengers.adults || 0,
//       child: searchPassengers.children || 0,
//       infant: searchPassengers.infants || 0
//     };


//     Object.keys(counts).forEach(type => {
//       for (let i = 0; i < counts[type]; i++) {
//         list.push({
//           firstName: "",
//           lastName: "",
//           gender: "",
//           dob: "", // Yahan age ya date of birth store hogi
//           type: type,
//           passport: "",
//           passportName: "",
//           nationality: ""
//         });
//       }
//     });
//     return list;
//   });

//   const handleChange = (index, field, value) => {
//     const updated = [...passengers];
//     updated[index][field] = value
//     setPassengers(updated)
//   };

//   const handlePayment = async () => {
//     if (!validateForm()) return;


//     try {
//       setLoading(true);

//       // =========================
//       // STEP 1: CREATE BOOKING
//       // =========================

//       const bookingRes = await fetch(
//         "https://kradtravel.com/api/checkout/booking",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           },

//           body: JSON.stringify({
//             offerId: flight?.id,

//             passengers: passengers.map((p) => ({
//               name: `${p.firstName} ${p.lastName}`,
//               age: p.dob,
//               gender: p.gender,
//             })),

//             contact: contactus,

//             flightData: {
//               airline: flight.airline,

//               from: flight.originCity,

//               to: flight.destinationCity,

//               departureTime: flight.departure,

//               arrivalTime: flight.arrival,

//               price: Number(flight.price),

//               currency: "USD",
//             },
//           }),
//         }
//       );

//       const bookingData = await bookingRes.json();

//       // console.log("BOOKING DATA:", bookingData);

//       if (!bookingData?.booking?._id) {
//         alert("Booking Failed");
//         return;
//       }

//       const paymentRes = await fetch(
//         "https://kradtravel.com/api/payment/initiate",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           },

//           body: JSON.stringify({
//             bookingId: bookingData.booking._id,
//           }),
//         }
//       );

//       const paymentData = await paymentRes.json();

//       // console.log("PAYMENT DATA:", paymentData);

//       if (!paymentData?.cashier_token) {
//         // console.log(paymentData);

//         alert(
//           paymentData.message || "Cashier Token Missing"
//         );

//         return;
//       }

//       const oldScript = document.getElementById(
//         "bridgerpay-widget"
//       );

//       if (oldScript) {
//         oldScript.remove();
//       }


//       const oldContainer = document.getElementById(
//         "bridgerpay-container"
//       );

//       if (oldContainer) {
//         oldContainer.innerHTML = "";
//       }


//       const script = document.createElement("script");

//       script.id = "bridgerpay-widget";

//       script.src =
//         "https://checkout.bridgerpay.com/v2/launcher";

//       script.async = true;

//       // IMPORTANT

//       script.setAttribute(
//         "data-cashier-key",
//         paymentData.cashier_key
//       );

//       script.setAttribute(
//         "data-cashier-token",
//         paymentData.cashier_token
//       );

//       setShowPayment(true)

//       setTimeout(() => {

//         const container = document.getElementById(
//           "bridgerpay-container"
//         );

//         if (container) {
//           container.appendChild(script);

//           // console.log("BRIDGERPAY WIDGET LOADED");
//         } else {
//           console.log("Container Not Found");
//         }

//       }, 300);

//     } catch (error) {
//       console.log("PAYMENT ERROR:", error);

//       alert("Payment Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!flight) return (
//     <div className='text-center mt-40'>
//       <p>No Flight Selected</p>
//       <Link to="/" className='text-blue-600 hover:underline'>Return To Search</Link>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 mt-20">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Review & Pay</h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">

//             <div className="bg-white rounded-xl shadow border overflow-hidden">
//               <div className="bg-blue-600 px-6 py-3 flex items-center gap-2 text-white">
//                 <Plane size={20} /> Flight Information
//               </div>
//               <div className="p-6 flex justify-between items-center">
//                 <div>
//                   <p className="text-xl font-bold">{flight.originCity}</p>
//                   <p className="text-sm text-gray-500">{flight.departure}</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-xs text-gray-400">{flight.departureDate}</p>
//                   <div className="h-[1px] bg-gray-300 w-20 my-1"></div>
//                   <p className="text-xs font-semibold">{flight.duration}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xl font-bold">{flight.destinationCity}</p>
//                   <p className="text-sm text-gray-500">{flight.arrival}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow border p-6">
//               <div className="flex items-center gap-2 mb-4 font-bold border-b pb-3">
//                 <User size={20} className="text-blue-600" />
//                 <h2>Travellers Detail</h2>
//               </div>

//               {passengers.map((p, i) => (
//                 <div key={i} className="mb-6 p-4 border rounded-xl bg-gray-50">
//                   <p className="text-sm font-bold text-blue-600 mb-3 capitalize">{p.type} {i + 1}</p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                     <input
//                       type="text"
//                       placeholder="First Name"
//                       value={p.firstName}
//                       onChange={(e) => handleChange(i, "firstName", e.target.value)}
//                       className="border p-2 rounded-lg bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Last Name"
//                       value={p.lastName}
//                       onChange={(e) => handleChange(i, "lastName", e.target.value)}
//                       className="border p-2 rounded-lg bg-white"
//                     />
//                     <select
//                       value={p.gender}
//                       onChange={(e) => handleChange(i, "gender", e.target.value)}
//                       className="border p-2 rounded-lg bg-white"
//                     >
//                       <option value="">Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                     <input
//                       type="text"
//                       placeholder="Age (e.g. 25)"
//                       value={p.dob}
//                       onChange={(e) => handleChange(i, "dob", e.target.value)}
//                       className="border p-2 rounded-lg bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Passport Number"
//                       value={p.passport}
//                       onChange={(e) => handleChange(i, "passport", e.target.value)}
//                       className="border p-2 rounded-lg bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Nationality"
//                       value={p.nationality}
//                       onChange={(e) => handleChange(i, "nationality", e.target.value)}
//                       className="border p-2 rounded-lg bg-white"
//                     />
//                   </div>
//                 </div>
//               ))}

//               <div className="mt-4 pt-4 border-t">
//                 <h3 className="font-bold mb-3">Contact Details</h3>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     value={contactus.email}
//                     onChange={(e) => setContactUs({ ...contactus, email: e.target.value })}
//                     className="border p-2 rounded-lg"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Phone Number"
//                     value={contactus.phone}
//                     onChange={(e) => setContactUs({ ...contactus, phone: e.target.value })}
//                     className="border p-2 rounded-lg"
//                   />
//                 </div>
//               </div>
//               {error && (
//                 <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center font-medium animate-bounce">
//                   {error}
//                 </div>
//               )}
//             </div>

//             <div className="bg-white rounded-xl shadow border p-6">
//               <div className="flex items-center gap-2 mb-6 font-bold border-b pb-3">
//                 <CreditCard size={20} className="text-blue-600" /> Secure Payment
//               </div>
//               <button

//                 className={`${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-4 rounded-xl w-full font-bold text-lg transition-colors`}
//               >
//                 {loading ? 'Processing...' : `Pay $${flight.price}`}
//               </button>
//               <div className="mt-4 flex justify-center gap-2 text-green-600 text-xs font-semibold">
//                 <ShieldCheck size={16} /> 256-bit SSL Secure Payment
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow border p-6 sticky top-24">
//               <h2 className="text-lg font-bold mb-4 border-b pb-3">Price Summary</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Base Fare</span>
//                   <span>${flight.price}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Taxes & Fees</span>
//                   <span>$0.00</span>
//                 </div>
//                 <div className="border-t pt-3 flex justify-between font-bold text-xl text-blue-600">
//                   <span>Total Amount</span>
//                   <span>${flight.price}</span>
//                 </div>
//               </div>
//               <div className="mt-6  p-4 rounded-lg text-xs text-blue-700">
//                 Tickets are non-refundable after 24 hours of booking. By clicking "Pay", you agree to our .
//               </div>
//             </div>
//           </div>
//         </div>
//         {showPayment && (
//           <div
//             className="payment-overlay"
//             onClick={() => setShowPayment(false)}
//           >
//             <div
//               className="payment-modal"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="close-btn"
//                 onClick={() => setShowPayment(false)}
//               >
//                 ✕
//               </button>

//               <div id="bridgerpay-container"></div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }