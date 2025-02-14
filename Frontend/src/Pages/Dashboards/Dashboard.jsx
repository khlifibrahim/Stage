import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../Components/SideBar/SideBar'
import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux';

function Dashboard() {
  console.log("Dashboard Component Rendered");
  const { role, user } = useSelector(state => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // true pour afficher la sidebar par défaut


  return (
    <div className='flex gap-6 h-screen overflow-auto'>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xl-heavy md:hidden"><path fill-rule="evenodd" clip-rule="evenodd" 
      d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z" fill="currentColor"></path></svg>
        {console.log("Rendering App Component")}
          <SideBar role={role} className={`transition-transform duration-300 fixed sm:static bg-gray-800 text-white h-full sm:w-auto w-64 z-40 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}/>

          <div className="content relative flex flex-col gap-3 px-[32px] w-full ">
              <Header />
              <div className="page-content w-full  overflow-x-hidden overflow-y-scroll no-scrollbar">
                  <Outlet />
              </div>
          </div>
      </div>
  )
}

export default Dashboard