import { Menu, X, PlaneTakeoff, Car, Hotel, Ship, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MAIN_LINKS = [
  { to: "/", label: "Flight", icon: PlaneTakeoff },
  { to: "/hotel", label: "Hotel", icon: Hotel },
  { to: "/car-rental", label: "Car Rental", icon: Car },
  { to: "/cruise", label: "Cruise", icon: Ship },
];

const INFO_LINKS = [
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
];

const DESKTOP_LINKS = [...MAIN_LINKS, ...INFO_LINKS];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b70]/40";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Shadow on scroll (look only)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // Desktop underline links
  const navClass = (path) =>
    `group relative px-1 py-2 text-sm font-semibold transition-colors duration-200 ${focusRing} ${
      isActive(path)
        ? "text-[#176b70]"
        : "text-[#17394a]/75 hover:text-[#176b70]"
    }`;

  // Mobile drawer links
  const mobileClass = (path) =>
    `relative flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${focusRing} ${
      isActive(path)
        ? "bg-[#e6f2f1] font-bold text-[#176b70]"
        : "text-[#17394a] hover:bg-white"
    }`;

  return (
    <header
      className={`fixed left-0 top-0 z-[100] h-16 w-full border-b bg-white/95 backdrop-blur-xl transition-shadow duration-300 md:h-20 ${
        scrolled
          ? "border-transparent shadow-[0_6px_24px_rgba(23,57,74,0.10)]"
          : "border-[#e9e2d6]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className={`flex shrink-0 items-center rounded-lg ${focusRing}`}
        >
          <img
            src="/logo/PRISBOOK LOGO.png"
            alt="Prisbook"
            width="252"
            height="56"
            className="h-10 w-auto object-contain sm:h-11 md:h-12"
          />
        </Link>

        {/* Desktop Nav Items */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-7 xl:flex"
        >
          {DESKTOP_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={navClass(to)}>
              <span>{label}</span>
              <span
                className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-[#176b70] transition-all duration-300 ${
                  isActive(to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right Action Items (Desktop) */}
        <div className="hidden items-center xl:flex">
          <a
            href="tel:18663075957"
            className={`group flex items-center gap-3 rounded-full bg-[#176b70] py-1.5 pl-1.5 pr-5 text-white shadow-md shadow-[#176b70]/20 transition-all duration-200 hover:bg-[#125a5e] active:scale-95 ${focusRing}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Phone
                size={16}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/75">
                24/7 Support
              </span>
              <span className="text-sm font-bold tracking-wide">
                18663075957
              </span>
            </span>
          </a>
        </div>

        {/* Hamburger Button (Mobile / Tablet) */}
        <button
          className={`cursor-pointer rounded-xl bg-[#e6f2f1] p-2.5 text-[#176b70] transition-all hover:bg-[#d3e9e7] active:scale-90 xl:hidden ${focusRing}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Drawer via Portal */}
      {createPortal(
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[1000] bg-[#17394a]/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
              open
                ? "visible opacity-100"
                : "pointer-events-none invisible opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />

          {/* Drawer Sidebar */}
          <aside
            aria-hidden={!open}
            className={`fixed right-0 top-0 z-[1001] flex h-full w-[85%] max-w-sm flex-col justify-between bg-white shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="overflow-y-auto">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[#e9e2d6] px-5 py-4">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className={`shrink-0 rounded-lg ${focusRing}`}
                >
                  <img
                    src="/assets/prisbook/logo.svg"
                    alt="Prisbook"
                    width="252"
                    height="56"
                    className="h-9 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className={`rounded-xl bg-white p-2 text-[#17394a] transition-colors hover:bg-slate-50 ${focusRing}`}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4">
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Book
                </p>
                <ul className="flex flex-col gap-1 text-sm font-semibold">
                  {MAIN_LINKS.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        onClick={() => setOpen(false)}
                        className={mobileClass(to)}
                      >
                        {isActive(to) && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#176b70]" />
                        )}
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            isActive(to)
                              ? "bg-[#176b70] text-white"
                              : "bg-[#e6f2f1] text-[#176b70]"
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mb-2 mt-6 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Company
                </p>
                <ul className="flex flex-col gap-1 text-sm font-semibold">
                  {INFO_LINKS.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center rounded-xl px-3 py-2.5 transition-colors ${focusRing} ${
                          isActive(to)
                            ? "bg-[#e6f2f1] font-bold text-[#176b70]"
                            : "text-[#17394a]/80 hover:bg-white"
                        }`}
                      >
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="space-y-3 border-t border-[#e9e2d6] bg-white p-5">
              <a
                onClick={() => setOpen(false)}
                href="tel:18663075957"
                className={`flex items-center justify-center gap-2.5 rounded-xl bg-[#176b70] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#176b70]/20 transition-all hover:bg-[#125a5e] active:scale-95 ${focusRing}`}
              >
                <Phone size={16} />
                <span>Call Us: 18663075957</span>
              </a>
              <p className="text-center text-[11px] font-medium text-slate-500">
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