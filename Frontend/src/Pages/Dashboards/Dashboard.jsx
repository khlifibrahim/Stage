import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { useSelector } from 'react-redux';
import Sidebar from '../../Components/SideBar/SideBar';

function Dashboard() {
  console.log("Dashboard Component Rendered");
  const { role } = useSelector(state => state.auth);

  // State to manage the sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-auto relative'>
      {/* Overlay to make everything beneath the sidebar invisible when it's open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)} // Clicking on overlay closes sidebar
        />
      )}

      {/* * Hamburger Button - Visible only on mobile */}
      <button 
        className="sm:hidden fixed top-4 left-4 z-50 p-2 text-black rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg> : <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>}
      </button>

      {/* Sidebar - Hidden on mobile, shown when clicked */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-40
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:static sm:translate-x-0`}
      >
        <Sidebar role={role} />
      </div>

      {/* Main Content */}
      <div className="content relative flex flex-col gap-3 px-8 w-full z-10">
        <Header />
        <div className="page-content w-full overflow-x-hidden overflow-y-scroll no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;