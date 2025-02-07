import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../Components/SideBar/SideBar'
import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux';

function Dashboard() {
  console.log("Dashboard Component Rendered");
  const { role, user } = useSelector(state => state.auth)

  return (
    <div className='flex gap-6 h-screen overflow-auto'>
        {console.log("Rendering App Component")}
          <SideBar role={role}/>
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