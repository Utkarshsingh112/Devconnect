'use client'
import Image from 'next/image'
import React from 'react'

const ExploreBtn = () => {
  return (
    <button type='button' id='explore-btn' className="mt-7 mx-auto flex items-center"  onClick={()=>console.log('CLICKED')}>
    <a href='#EventsSection' className="ml-2 text-light-100 ">
        <Image src="/icons/arrow-down.svg" alt="Explore Events" width={20} height={20}/>
        Explore Events
    </a>
    </button>
    
  )
}

export default ExploreBtn