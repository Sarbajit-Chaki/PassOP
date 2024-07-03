import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-[#2f2f2f] text-white text-sm font-bold py-1 fixed bottom-0 w-full flex justify-center'>
        <div className=' flex items-center gap-x-1'>
            <span>Created with</span>
            <span className="material-symbols-outlined text-red-500">favorite</span>
            <span className=' hover:underline cursor-pointer' onClick={()=>window.open("https://www.linkedin.com/in/sarbajit-chaki/","_blank")}>by SarbajitChaki</span>
        </div>
    </div>
  )
}

export default Footer
