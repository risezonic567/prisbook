import { ArrowUp } from 'lucide-react'
import React from 'react'

export default function ScrollButton() {
    
    function scrollTop(){
        window.scrollTo({
            top:0,behavior:"smooth"
        })
    }

  return (
    <div>
    <button onClick={scrollTop}
    className='fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition'
    >
     <ArrowUp size={20}/>   
    </button>        
    </div>
  )
}
