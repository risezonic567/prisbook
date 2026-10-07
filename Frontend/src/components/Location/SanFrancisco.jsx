import React from 'react'
import FlightSearchSection from '../FlightSearchSection'
import HowItWorks from '../../pages/HowItWorks'
import { useNavigate } from 'react-router-dom'
import LatestNews from '../../pages/LatestNewsPage'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'


export default function NewYork() {
    const navigate = useNavigate()
    return (
        <>
            <FlightSearchSection />
            <HowItWorks />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
               
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl"
                >

                    <div className="absolute -top-20 -right-20 w-72 h-72 0/20 blur-3xl rounded-full"></div>

                    <div className="relative z-10 max-w-2xl text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            Your Next Adventure Awaits 🌍
                        </h2>

                        <p className="mt-5 text-slate-300 text-lg leading-relaxed">
                            Book flights, discover dream destinations, and create unforgettable memories with premium travel experiences.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/flight")}
                        className="relative z-10 cursor-pointer bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:bg-slate-100 transition-all duration-300 shadow-xl flex items-center gap-3"
                    >
                        Book a Flight
                        <ArrowRight size={20} />
                    </button>
                </motion.div>

                <div className='max-w-5xl py-10 rounded-3xl bg-gray-100 p-5 mx-auto'>
                    <h2 className='text-lg sm:text-xl font-bold mt-5 mb-5'>Discover San Francisco: The Golden City</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                       San Francisco, located in northern California, is a city bursting with culture, iconic landmarks, and unforgettable experiences. From the majestic Golden Gate Bridge to the historic streets of Chinatown, this city offers something for every traveler.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>1. Golden Gate Bridge</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                      No visit to San Francisco is complete without walking or biking across the world-famous Golden Gate Bridge. It's a masterpiece of engineering and a symbol of the city.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>2. Alcatraz Island</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                       Explore the notorious former prison on Alcatraz Island. Take a ferry from Pier 33 and dive into the island's fascinating history with an audio-guided tour.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>3. Ride the Historic Cable Cars</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                       Hop aboard the city's beloved cable cars and enjoy scenic views as you travel up and down San Francisco's steep hills.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>4. Fisherman’s Wharf</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                      This bustling waterfront area is perfect for seafood lovers and sightseers alike. Don't forget to say hello to the sea lions at Pier 39!
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>5. Visit Chinatown</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                      San Francisco’s Chinatown is the oldest and one of the most vibrant in North America. Try authentic Chinese cuisine and shop for unique souvenirs.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>6. Explore the Mission District</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                     The Mission is known for its colorful murals, hip eateries, and Latin culture. Be sure to visit Mission Dolores Park for great views of the skyline.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>7. Twin Peaks</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                      For breathtaking panoramic views of the city, head to Twin Peaks. It’s a favorite spot for both tourists and locals.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>8. The Painted Ladies</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                       These iconic Victorian homes at Alamo Square Park are best known from the opening credits of "Full House." A great photo op!
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>9. Exploratorium</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                      A fantastic interactive science museum for kids and adults alike. Located at Pier 15, it’s both fun and educational.
                    </p>

                    <h2 className='text-sm sm:text-md font-semibold mt-5 mb-3'>10. Why San Francisco?</h2>
                    <p className='text-gray-500 mb-5 text-sm sm:text-base leading-relaxed'>
                     Whether you're into nature, history, food, or tech, San Francisco offers a rich mix of experiences in one compact, beautiful city. Come and explore its unique charm!
                    </p>
                 </div>

                 <LatestNews/>
            </div>
        </>
    )
}