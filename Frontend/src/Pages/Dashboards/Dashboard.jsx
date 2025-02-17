import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../Components/SideBar/SideBar'
import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux';

function Dashboard() {
  console.log("Dashboard Component Rendered");
  const [isOpen, setOpen] = useState(false)
  const { role, user } = useSelector(state => state.auth)
  const toggleSidbare = () => {
      console.log("menu is open")
      setOpen(!isOpen)
      console.log("check siOpen state: ", isOpen)
  }

  return (
    <div className='flex gap-6 h-screen overflow-auto min-w-[580px]'>
        {console.log("Rendering App Component")}
          <SideBar role={role} open={isOpen} toggleSidbare={toggleSidbare}/>
          <div className="content relative flex flex-col gap-3 px-[32px] w-full ">
              <Header open={toggleSidbare}/>
              <div className="page-content w-full  overflow-x-hidden overflow-y-scroll no-scrollbar">
                  <Outlet />
              </div>
          </div>
      </div>
  )
}

export default Dashboard