import React from 'react'
import Profile from '../Utilities/Profile'

function Header() {
  
  return (
    <div className='sticky top-0 z-50 w-full min-h-[102px] flex justify-between items-center px-4 py-2'>
      <div className='globalSearch w-full sm:w-auto'>
          <div className='searchBox flex justify-center items-center w-full sm:w-[334px] h-[38px] px-3 rounded-[10px] border-border border focus-within:border-blue overflow-hidden'>
              <span className=''>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="#B6B6B6"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
              </span>
              <input type="text" placeholder='Chercher....' className='w-full h-full bg-transparent outline-none '/>
          </div>
      </div>
      <div className='flex items-center gap-3'>
          <div className="icons flex gap-2">
            <span>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="#B6B6B6"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
            </span>
          </div>
          <Profile />
      </div>
    </div>
  )
}

export default Header