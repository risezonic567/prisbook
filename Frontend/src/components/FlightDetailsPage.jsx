import { ArrowBigDown, ArrowBigLeftIcon, Luggage } from 'lucide-react'
import React from 'react'

export default function FlightDetailsPage() {
  return (
    <div className= 'relative bg-gray-300/15 mt-20 min-h-screen mx-auto max-w-7xl'>
        <div className='max-w-xl p-5 m-5 py-5  bg-black/50 h-[250px]'>
            <h2 className='text-white p-5 m-4 text-center text-2xl'>
                Flight Detail
            </h2>
            <div className="text-white">
                <p>
                    From <ArrowBigLeftIcon/> To Date
                </p>
            </div>
        </div>
    </div>
  )
}
