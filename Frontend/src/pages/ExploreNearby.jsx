import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function ExploreNearby() {
  const places = [
    {
      id: 1,
      name: "San Francisco",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85",
      path: "/san-francisco",
    },
    {
      id: 2,
      name: "Los Angeles",
      img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85",
      path: "/los-angeles",
    },
    {
      id: 3,
      name: "Miami",
      img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85",
      path: "/miami",
    },
    {
      id: 4,
      name: "Switzerland",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
      path: "/switzerland",
    },
    {
      id: 5,
      name: "Thailand",
      img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=85",
      path: "/thailand",
    },
  ];

  return (
    <section className="relative bg-white px-4 py-16 font-sans sm:py-20">
      <div className="max-w-7xl mx-auto w-full">

        {/* Section Header with Custom Swiper Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider mb-1">
              <MapPin size={14} />
              <span>Trending Destinations</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#17394a] md:text-4xl">
              Explore Nearby
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              id="explore-prev-btn"
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-white-700  hover:text-white  shadow-xs flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-white-700"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              id="explore-next-btn"
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-white border border-white-200 text-white-700  hover:text-white  shadow-xs flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper Container */}
        <Swiper
          modules={[FreeMode, Navigation, Autoplay]}
          freeMode={true}
          navigation={{
            prevEl: "#explore-prev-btn",
            nextEl: "#explore-next-btn",
          }}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 3.5,
            },
          }}
          className="pb-4"
        >
          {places.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <Link to={item.path} className="group block h-full">
                <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-[#17394a] shadow-sm transition-all duration-300 hover:shadow-xl">

                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      width="900"
                      height="675"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102b3c]/90 via-[#102b3c]/10 to-transparent transition-opacity duration-300"></div>

                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                      Popular
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div className="text-white">
                      <h3 className="text-xl font-bold transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-white/75">
                        Explore exclusive deals
                      </p>
                    </div>

                    {/* Action Arrow Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-[#e8795c]">
                      <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

// import React from "react";
// import { Link } from "react-router-dom";

// import { Swiper, SwiperSlide } from "swiper/react";

// import { FreeMode, Navigation, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";

// export default function ExploreNearby() {
//   const places = [
//     {
//       id: 1,
//       name: "San Francisco",
//       img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85",
//       path: "/san-francisco",
//     },
//     {
//       id: 2,
//       name: "Los Angeles",
//       img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85",
//       path: "/los-angeles",
//     },
//     {
//       id: 3,
//       name: "Miami",
//       img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85",
//       path: "/miami",
//     },
//      {
//       id: 4,
//       name: "Switzerland",
//       img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
//       path: "/switzerland",
//     },
//      {
//       id: 5,
//       name: "Thailand",
//       img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=85",
//       path: "/thailand",
//     },
//   ];

//   return (
//     <section className="py-16 px-4 bg-gray-50/50">
//       <div className="max-w-7xl mx-auto w-full overflow-hidden">

//         <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10">
//           Explore Nearby
//         </h2>

//         <Swiper
//           modules={[FreeMode, Navigation, Autoplay]}
//           freeMode={true}
//           navigation={true}
//           grabCursor={true}
//           loop={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           spaceBetween={24}
//           slidesPerView={1.2}
//           // className="!overflow-visible"
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             768: {
//               slidesPerView: 2.5,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {places.map((item) => (
//             <SwiperSlide key={item.id} className="h-auto">
//               <Link to={item.path} className="group block h-full">
//                 <div className="flex flex-col h-full">

//                   <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>

//                   <div className="mt-5 flex justify-between items-center">
//                     <div>
//                       <p className="text-xl font-bold text-gray-800 group-hover:text-[#3aa0c9] transition-colors">
//                         {item.name}
//                       </p>

//                       <p className="text-sm text-gray-500 font-medium">
//                         Explore Deals
//                       </p>
//                     </div>

//                     <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#3aa0c9] group-hover:text-white group-hover:border-[#3aa0c9] transition-all">
//                       →
//                     </div>
//                   </div>

//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//       </div>
//     </section>
//   );
// }