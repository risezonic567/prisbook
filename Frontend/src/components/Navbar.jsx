import { Menu, X, Plane, Car, Hotel, Ship, Phone, PlaneTakeoffIcon, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    navigate("/login");
  }

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const auth = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("name");

    if (auth === "true") {
      setIsLoggedIn(true);
      setUserName(name || "User");
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path) => location.pathname === path;

  const navClass = (path) =>
    `relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 ${
      isActive(path)
        ? "text-blue-600  shadow-xs ring-1 ring-blue-500/20"
        : "text-slate-600 hover:text-blue-600 hover:bg-slate-100/70"
    }`;

  return (
    <header className="w-full bg-white/85 backdrop-blur-xl border-b border-slate-200/70 h-[76px] sm:h-[84px] md:h-[90px] fixed top-0 left-0 z-[100]  transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        
        <Link 
          to="/" 
          className="flex items-center shrink-0 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src="/logo/kradtravel.png"
            alt="Krad Travel"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-opacity group-hover:opacity-95"
          />
        </Link>

        {/* Desktop Nav Items */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60 shadow-2xs">
          <Link to="/" className={navClass("/")}>
            <PlaneTakeoffIcon size={15} className={isActive("/") ? "text-blue-600" : "text-slate-400"} />
            <span>Flight</span>
          </Link>
          <Link to="/hotel" className={navClass("/hotel")}>
            <Hotel size={15} className={isActive("/hotel") ? "text-blue-600" : "text-slate-400"} />
            <span>Hotel</span>
          </Link>
          <Link to="/car-rental" className={navClass("/car-rental")}>
            <Car size={15} className={isActive("/car-rental") ? "text-blue-600" : "text-slate-400"} />
            <span>Car Rental</span>
          </Link>
          <Link to="/cruise" className={navClass("/cruise")}>
            <Ship size={15} className={isActive("/cruise") ? "text-blue-600" : "text-slate-400"} />
            <span>Cruise</span>
          </Link>
          <div className="w-[1px] h-4 bg-slate-200 mx-1" />
          <Link to="/about-us" className={navClass("/about-us")}>
            <span>About Us</span>
          </Link>
          <Link to="/contact-us" className={navClass("/contact-us")}>
            <span>Contact Us</span>
          </Link>
        </nav>

        {/* Right Action Items (Desktop) */}
        <div className="hidden xl:flex items-center gap-3">
          <a
            href="tel:18663075957"
            className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <Phone size={14} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-wide">18663075957</span>
          </a>
        </div>

        {/* Hamburger Button (Mobile / Tablet) */}
        <button
          className="xl:hidden p-2.5 rounded-2xl text-slate-700 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-blue-600 active:scale-90 transition-all cursor-pointer shadow-2xs"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Drawer Overlay via Portal */}
      {createPortal(
        <>
          {/* Backdrop */}
          <div
            className={`xl:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 z-[1000] ${
              open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
            onClick={() => setOpen(false)}
          />

          {/* Drawer Sidebar */}
          <aside
            className={`xl:hidden fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out z-[1001] border-l border-slate-100 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
                  <img
                    src="/logo/kradtravel.png"
                    alt="Krad Travel"
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tag Banner */}
              <div className="mx-5 mt-4 p-3 rounded-2xl  border-blue-100/60 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider ">VIP Concierge</p>
                  <p className="text-xs text-slate-600 font-medium">Unpublished Global Travel Fares</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* Navigation Links */}
              <ul className="flex flex-col gap-1.5 p-5 text-sm font-semibold">
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/"
                    className={`flex items-center gap-3 py-3 px-4 rounded-2xl transition-all ${
                      isActive("/")
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <Plane size={18} className={isActive("/") ? "text-white" : "text-blue-600"} />
                    <span>Flight</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/hotel"
                    className={`flex items-center gap-3 py-3 px-4 rounded-2xl transition-all ${
                      isActive("/hotel")
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <Hotel size={18} className={isActive("/hotel") ? "text-white" : "text-blue-600"} />
                    <span>Hotel</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/car-rental"
                    className={`flex items-center gap-3 py-3 px-4 rounded-2xl transition-all ${
                      isActive("/car-rental")
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <Car size={18} className={isActive("/car-rental") ? "text-white" : "text-blue-600"} />
                    <span>Car Rental</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/cruise"
                    className={`flex items-center gap-3 py-3 px-4 rounded-2xl transition-all ${
                      isActive("/cruise")
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <Ship size={18} className={isActive("/cruise") ? "text-white" : "text-blue-600"} />
                    <span>Cruise</span>
                  </Link>
                </li>
                <li className="my-2 border-t border-slate-100" />
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/about-us"
                    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all ${
                      isActive("/about-us")
                        ? "text-blue-600 font-bold "
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/contact-us"
                    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all ${
                      isActive("/contact-us")
                        ? "text-blue-600 font-bold "
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-slate-100 space-y-3 bg-slate-50/70">
              <a
                onClick={() => setOpen(false)}
                href="tel:18663075957"
                className="flex items-center justify-center gap-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 font-bold py-3.5 px-5 rounded-2xl text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <Phone size={16} />
                <span>Call Us: 18663075957</span>
              </a>
              <p className="text-[11px] text-center text-slate-400 font-medium">
                24/7 Dedicated Support & Unpublished Fares
              </p>
            </div>
          </aside>
        </>,
        document.body
      )}
    </header>
  );
}
