import React from 'react';
import { 
  Phone, Mail, Hotel, Ship, Car, PlaneTakeoff, 
  MapPin, Send, ArrowRight, Globe, ShieldCheck, Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-24 pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans border-t border-slate-900">
      
      {/* Background ambient lighting */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" /> */}
      {/* <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-0" /> */}

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* Top Floating VIP Newsletter Banner */}
       

        {/* Main Footer Container */}
        <div className="bg-slate-900/60 rounded-[2.5rem] p-8 sm:p-12 border border-slate-800/80 backdrop-blur-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-block transition-transform hover:scale-105 duration-200">
                <img 
                  src="/logo/kradtravel.png" 
                  alt="kradtravel" 
                  className="h-18 w-auto bg-white rounded-xl p-2 shadow-md object-contain"
                />
              </Link>
              <p className="text-sm text-white leading-relaxed max-w-sm">
                Crafting memorable journeys with unmatched luxury, unpublished rates, and 24/7 dedicated travel concierge support worldwide.
              </p>
              
              <div className="pt-2 space-y-3 text-sm">
                <a 
                  href="tel:+18663075957" 
                  className="group inline-flex items-center gap-3 text-white hover:text-white "
                >
                  <div className="w-9 h-9 rounded-xl 0/10 border border-blue-500/20 flex items-center justify-center  group-hover:text-white transition-all">
                    <Phone size={15} />
                  </div>
                  <span className="font-semibold">+1 (866) 307-5957</span>
                </a>
                <br />
                <a 
                  href="mailto:support@kradtravel.com" 
                  className="group inline-flex items-center gap-3 text-white hover:text-white "
                >
                  <div className="w-9 h-9 rounded-xl 0/10 border border-blue-500/20 flex items-center justify-center  group-hover:text-white transition-all">
                    <Mail size={15} />
                  </div>
                  <span className="font-semibold">support@kradtravel.com</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full 0"></span>
                Explore
              </h4>
              <ul className="space-y-3 text-sm">
                {['Home', 'About us', 'Contact us', 'FAQ'].map((link) => (
                  <li key={link}>
                    <Link 
                      to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-white hover:text-white transition-all flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-400" />
                      <span>{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Bookings
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'Flight', icon: PlaneTakeoff, path: '/' },
                  { label: 'Hotel', icon: Hotel, path: '/hotel' },
                  { label: 'Car Rental', icon: Car, path: '/car-rental' },
                  { label: 'Cruise', icon: Ship, path: '/cruise' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="text-slate-white hover:text-white  flex items-center gap-2.5 group">
                      <item.icon size={15} className="text-white group-hover:text-blue-400 " />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations Column */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2">
                <Globe size={15} className="text-blue-400" /> Top Destinations
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Los Angeles', 'Miami', 'New York', 'Las Vegas'].map((city) => (
                  <Link 
                    key={city} 
                    to={`/${city.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/90 text-white hover:text-white hover:bg-slate-800 hover:border-blue-500/50 transition-all text-xs font-semibold text-center shadow-xs"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Offices Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/80">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin size={14} className="text-blue-400" /> Corporate Headquarters
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs white">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700 ">
                <span className="font-bold text-slate-200 block mb-1">USA Office</span>
                <p>17662 Irvine Blvd, Suite 9 Tustin, CA 92780</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white gap-4 px-2">
          <p>© {currentYear} Krad Travel LLC. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-white font-medium">
            <Link to="/privacy-policy" className="">Privacy Policy</Link>
            <Link to="/terms-condition" className="">Terms & Conditions</Link>
            <Link to="/cancellation" className="">Cancellation</Link>
            <Link to="/disclaimer" className="">Disclaimer</Link>
            <Link to="/refund-policy" className="">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}