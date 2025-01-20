import React, { useState } from 'react'

function Profile() {
  const [isprofileMenuActive, setprofileMenuActive] = useState(false)
  const handleProfileMenu = () => {
    setprofileMenuActive(!isprofileMenuActive)
  }

  return (
    <div className='relative flex items-center justify-center gap-3 cursor-pointer'>
      <div className='avatar w-10 h-10 rounded-full bg-blue'>
        {/* <img src="" alt="" /> */}
      </div>
      <div className=''>
        <p className='font-poppins font-medium leading-5 text-[12px]'>Ch. de service</p>
        <p>Brahim Khlifi</p>
      </div>
      <div className={`rotate-90 ${isprofileMenuActive ? '' : 'rotate-0'}`} onClick={handleProfileMenu}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className={`hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-chevron-right`}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
      </div>

      {
        isprofileMenuActive && (
          <div className='absolute top-16 right-0 bg-white p-4 rounded-md shadow flex flex-col gap-2'>
            <div className='flex items-center justify-start gap-2 px-2 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
              <span className="icon hover:svg>stroke-blue">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-user-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h.5" /><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /></svg>
              </span>
              <p className='font-poppins font-medium text-[14px] leading-5 '>Profile</p>
            </div>

            <div className='flex items-center justify-start gap-2 px-2 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
              <span className="icon hover:svg>stroke-blue">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue  icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
              </span>
              <p className='font-poppins font-medium text-[14px] leading-5 '>Deconnexion</p>
            </div>
            
          </div>
        )
      }
    </div>
  )
}

export default Profile