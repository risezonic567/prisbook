import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { clientReviews } from '../data/testimonials';

export default function Testimonials() {
  const [tabs] = useState([
    { title: "Flights", val: "flights" },
    { title: "Hotels", val: "hotels" },
    { title: "Cruise", val: "cruise" },
    { title: "Cars", val: "cars" }
  ]);

  const [selected, setSelected] = useState("flights");

  const filteredData = clientReviews[selected] || [];

  return (
    <section className="bg-[#17394a] py-16 font-sans text-white sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 grid max-w-7xl gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#f4bd8f]">Good journeys, good words</p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-sm leading-relaxed text-white/70 md:text-base">
            Read verified feedback from our clients about their flight, hotel, and travel booking experiences with Prisbook.
          </p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-5 md:grid-cols-4 md:gap-6">
            {[
              { num: "140+", label: "Years Experience" },
              { num: "4,000+", label: "Tours Managed" },
              { num: "1M+", label: "Satisfied Customers" },
              { num: "50+", label: "Industry Awards" }
            ].map((item, i) => (
              <div key={i} className="text-left">
                <span className="block text-2xl font-bold text-[#f4bd8f] sm:text-3xl">
                  {item.num}
                </span>
                <span className="mt-1 block text-xs font-medium text-white/65 sm:text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((item, id) => (
            <button
              key={id}
              onClick={() => setSelected(item.val)}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                item.val === selected
                  ? "bg-[#e8795c] text-white shadow-xs"
                  : "border border-white/20 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Testimonials Swiper Carousel */}
        <Swiper
          slidesPerView={3}
          spaceBetween={24}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-slate-800 !w-6 transition-all',
          }}
          modules={[Pagination, Autoplay]}
          className="!pb-14"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {filteredData.map((item, id) => (
            <SwiperSlide key={id} className="h-auto">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white p-6 text-[#17394a] shadow-[0_18px_50px_-28px_rgba(0,0,0,.45)] transition-transform hover:-translate-y-1">
                
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star key={starIndex} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={18} className="text-[#176b70]/35" />
                  </div>

                  {/* Message */}
                  <p className="text-slate-700 text-sm leading-relaxed min-h-[90px]">
                    "{item.message}"
                  </p>
                </div>

                {/* User Information */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                    {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

// import React, { useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'

// import 'swiper/css'
// import 'swiper/css/pagination'

// import { Pagination, Autoplay } from 'swiper/modules'
// import { Quote } from 'lucide-react'
// import { clientReviews } from '../data/testimonials'

// export default function Testimonials() {

//   const [tabs] = useState([
//     { title: "Flights", val: "flights" },
//     { title: "Hotels", val: "hotels" },
//     { title: "Cruise", val: "cruise" },
//     { title: "Cars", val: "cars" }
//   ])

//   const [selected, setSelected] = useState("flights")

//   const filteredData = clientReviews[selected] || []

//   return (
//     <section className='relative py-16 bg-gray-100'>

//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,#ff00cc20,transparent_40%),radial-gradient(circle_at_80%_70%,#00ffe520,transparent_40%)]"></div>

//       <div className='flex justify-center flex-wrap gap-3 mb-10 px-4'>
//         {tabs.map((item, id) => (
//           <button
//             key={id}
//             onClick={() => setSelected(item.val)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
//               ${item.val === selected
//                 ? "0 text-white shadow-lg scale-105"
//                 : "bg-black/20 text-gray-800 hover:bg-white/20"
//               }`}
//           >
//             {item.title}
//           </button>
//         ))}
//       </div>

//       <div className='text-center mb-10 px-4'>
//         <h2 className='text-3xl md:text-4xl font-bold text-black/70 mb-4'>
//           Why Customers Love Prisbook
//         </h2>

//         <div className='max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-6'>
//           {[
//             { num: "140+", label: "Years Legacy" },
//             { num: "4000+", label: "Tours" },
//             { num: "1M+", label: "Happy Travelers" },
//             { num: "50+", label: "Awards" }
//           ].map((item, i) => (
//             <div key={i} className="text-white">
//               <h3 className="text-2xl font-bold text-blue-400">
//                 {item.num}
//               </h3>

//               <p className="text-sm  text-gray-800">
//                 {item.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className='max-w-7xl mx-auto px-4'>

//         <Swiper
//           slidesPerView={3}
//           spaceBetween={30}
//           grabCursor={true}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           modules={[Pagination, Autoplay]}
//           className='!pb-14'
//           breakpoints={{
//             0: {
//               slidesPerView: 1,
//               spaceBetween: 12,
//             },
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 16,
//             },
//             1024: {
//               slidesPerView: 3,
//               spaceBetween: 24,
//             },
//           }}
//         >

//           {filteredData.map((item, id) => (
//             <SwiperSlide key={id} className='h-auto'>

//               <div className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-yellow-100 via-blue-200 to-purple-300 h-full">

//                 <div className="bg-white rounded-2xl p-6 h-full shadow-xl relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2">

                

//                   {/* Message */}
//                   <p className='text-sm text-gray-700 leading-relaxed min-h-[120px]'>
//                     {item.message}
//                   </p>

//                   {/* User */}
//                   <div className='flex items-center gap-3 mt-6'>

                  
//                     <div>
//                       <h3 className='font-semibold text-sm text-black'>
//                         {item.name}
//                       </h3>

//                       <p className='text-xs text-gray-500'>
//                         {item.date}
//                       </p>
//                     </div>

//                   </div>

//                   {/* Hover Glow */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-400/10 via-pink-500/10 to-purple-500/10 pointer-events-none"></div>

//                 </div>

//               </div>

//             </SwiperSlide>
//           ))}

//         </Swiper>

//       </div>

//     </section>
//   )
// }