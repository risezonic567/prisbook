import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiTag } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export default function PromoSection() {
const promos = [
  {
    title: "Book & Enjoy",
    desc: "20% off on the best available room rate.",
    img: "/images/hotelcruise/book & enjoy image.jpg.jpeg",
    path:"/travel-deals"
  },
 {
  title: "Hot Summer Nights",
  desc: "Up to 2 nights free!",
  img: "/images/hotelcruise/Hot summer night.jpg.jpeg",
  path:"/travel-deals"
},
 
  {
    title: "Weekend Deals",
    desc: "Flat 30% off on weekends",
    img: "/images/hotelcruise/weakend deals.jpg.jpeg",
    path:"/travel-deals"
  },
  {
    title: "Mega Offer",
    desc: "50% discount today only",
    img: "/images/hotelcruise/Mega offers.jpg.jpeg",
    path:"/travel-deals"
  }
];
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 relative group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/50">
            <FiTag size={12} /> Exclusive Savings
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Seasonal Luxury Offers
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="prevBtn w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-purple-300 hover:text-purple-600 flex items-center justify-center text-slate-600 transition cursor-pointer">
            <FiChevronLeft size={18} />
          </button>
          <button className="nextBtn w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-purple-300 hover:text-purple-600 flex items-center justify-center text-slate-600 transition cursor-pointer">
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".nextBtn",
          prevEl: ".prevBtn",
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!overflow-visible"
      >
        {promos.map((promo, index) => (
          <SwiperSlide key={index}>
            <Link to={promo.path} className="block group/card">
              <div className="flex items-center p-4 bg-white/80 hover:bg-white backdrop-blur-xl border border-slate-200/70 hover:border-purple-300/80 rounded-2xl shadow-xs hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 group-hover/card:-translate-y-1">
                
                <div className="w-24 h-24 sm:w-28 sm:h-24 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={promo.img}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition duration-500"
                  />
                </div>

                <div className="ml-4 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md inline-block mb-1">
                    Special Promo
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 truncate group-hover/card:text-purple-600 transition">
                    {promo.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                    {promo.desc}
                  </p>
                </div>

              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}