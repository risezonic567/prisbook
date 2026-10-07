import { CarFront, Leaf, ShieldCheck, UserCheck, Wifi, Zap } from 'lucide-react'
import React from 'react'
import { FcElectricalSensor, FcElectricalThreshold } from 'react-icons/fc'

export default function WhyChooseUs() {
    const chooseItem=[
        {
            id:1,
            icon:<Zap/>,
            title:"Advance Booking",
            desc:"Book your travel plans in advance to enjoy peace of mind and avoid last-minute delays.",
            color:"bg-blue-200 text-blue-600"
        },
        {
            id:2,
            icon:<Leaf/>,
            title:"Economical Trip",
            desc:"Enjoy affordable travel options without compromising on comfort and quality.",
            color:"bg-green-100 text-green-600"

        },
        {
            id:3,
            icon:<ShieldCheck/>,
            title:"Secure and Safer",
            desc:"We prioritize your safety with reliable and continuous security measures for a worry-free experience.",
            color:"bg-yellow-100 text-yellow-800"

        },
        {
            id:4,
            icon:<CarFront/>,
            title:"Vehicle Options",
            desc:"Choose from a wide range of vehicles to suit your needs, ensuring comfort and convenience for every journey.",
            color:"bg-red-200 text-red-700"

        },
        {
            id:5,
            icon:<Wifi/>,
            title:"Cab Entertainment",
            desc:"Enjoy a range of entertainment options during your cab rides for a fun and relaxing journey.",
            color:"bg-orange-200 text-orange-600"

        },
        {
            id:6,
            icon:<UserCheck/>,
            title:"Polite Driver",
            desc:"Our drivers are courteous and professional, ensuring a pleasant and respectful travel experience.",
            color:"bg-blue-100 text-blue-600"

        },
    ]

  return (
    <div className='max-w-7xl px-6  mx-auto'>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {chooseItem.map((service, index) => (
      <div
        key={index}
        className="group relative p-6 cursor-pointer rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"></div>

        <div
          className={`${service.color} w-14 h-14 flex items-center justify-center rounded-xl  text-xl shadow-lg transform group-hover:scale-110 transition duration-300`}
        >
          {service.icon}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-5 group-hover:text-blue-600 transition">
          {service.title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-md font-semibold mt-2">
          {service.desc}
        </p>

        <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 group-hover:w-full transition-all duration-300 rounded-full"></div>
      </div>
    ))}
        </div>
        
    </div>
    
  )
}
