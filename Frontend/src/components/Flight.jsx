import React, { useState } from 'react'
import LatestNews from '../pages/LatestNewsPage'
import FlightDestination from '../pages/Destination/FlightDestination';
import FlightSearchSection from './FlightSearchSection';

export default function Flight() {
   
  return (
    <>
    <div className="w-full font-sans">
      <FlightSearchSection/>
    <FlightDestination/>
    <LatestNews/>
</div>
    </>
  )
}
