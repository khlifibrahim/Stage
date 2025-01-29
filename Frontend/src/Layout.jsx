import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from './Routes/Protected.route'
import AppRoutes from './Routes/App.routes'
import SideBar from './Components/SideBar/SIdeBar'
import Header from './Components/Header/Header'

function Layout() {
    const { isAuthenticated } = useSelector((state) => state.auth);


    return (
        <div className='flex gap-6 h-screen overflow-auto'>
            {/* <SideBar /> */}
            <div className="content relative flex flex-col gap-3 px-[32px] w-full ">
                {/* <Header /> */}
                <div className="page-content w-full  overflow-x-hidden overflow-y-scroll no-scrollbar">
                    {/* <AppRoutes /> */}
                </div>
            </div>
        </div>
    )
}

export default Layout