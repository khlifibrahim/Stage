import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SIdeBar'
import Header from '../../Components/Header/Header'

function DirecteurDashboard() {


  return (
        <div className="page-content">
          <h1>Directeur Dashboard</h1>
          <p>Welcome, Directeur! Here are your tools and features.</p>
        </div>
  )
}

export default DirecteurDashboard