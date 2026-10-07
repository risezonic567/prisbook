import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate =useNavigate()
    const [second,setSecond]=useState(5)

    useEffect(()=>{
       const interval = setInterval(()=>{
            setSecond((prev)=>prev-1)
       },1000)

        const timer = setTimeout(()=>{
            navigate("/")
        },5000)

        return ()=>{
            clearTimeout(timer)
            clearInterval(interval)
        }
    },[navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      
      <h1 className="text-7xl font-black text-blue-600">404!</h1>

      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <p className="text-sm text-gray-400 mt-4">
        Redirecting to homepage in {""}
        <span className="font-semibold">{second} seconds...</span>
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95"
      >
        Go to Home
      </button>

    </div>
  )
}
