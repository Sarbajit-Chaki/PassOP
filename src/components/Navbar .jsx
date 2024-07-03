import React from 'react'

const Navbar  = () => {
  return (
    <>
      <nav className=' bg-[#131314] text-white text-lg font-bold p-2 sm:p-3 flex justify-around items-center sticky top-0 '>
        <div className=' cursor-pointer'>
            <span className=' text-green-600'>&lt;</span>Pass<span className=' text-green-600'>OP/&gt;</span>
        </div>
        <div onClick={()=>window.open("https://github.com/Sarbajit-Chaki","_blank")} className=' flex items-center cursor-pointer  hover:text-slate-200'>
          <span className="material-symbols-outlined text-green-500 pr-1">code</span>
          <span>GitHub</span>
        </div>
      </nav>
    </>
  )
}

export default Navbar 
