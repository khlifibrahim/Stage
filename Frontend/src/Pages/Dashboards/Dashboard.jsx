import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { useSelector } from 'react-redux';
import Sidebar from '../../Components/SideBar/SideBar';

function Dashboard() {
  console.log("Dashboard Component Rendered");
  const { role } = useSelector(state => state.auth);

  // State pour gérer l'affichage de la sidebar sur mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-auto'>

      {/* Bouton hamburger - Visible seulement sur mobile */}
      <button 
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar - Masquée sur mobile et affichée lorsqu'on clique sur le menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-40 
                      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:static sm:translate-x-0`}>
        <Sidebar role={role} />
      </div>

      {/* Contenu principal */}
      <div className="content relative flex flex-col gap-3 px-8 w-full">
        <Header />
        <div className="page-content w-full overflow-x-hidden overflow-y-scroll no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
