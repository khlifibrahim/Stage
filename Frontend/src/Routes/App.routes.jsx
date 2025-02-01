import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from './Protected.route'

import { ROLE_PERMISSIONS, ROLE_NAMES, ROLES } from '../Components/Utilities/role.permissions'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboards/Dashboard'
import ListMissions from '../Pages/Mission/ListMissions'
import NewMission from '../Pages/Mission/NewMission'
import Unauthorized from '../Pages/unauthorized/unauthorized'
// import Layout from '../Layout';
import CarsList from '../Pages/Cars/CarsList'




function AppRoutes() {
  console.log("(App Rout accessed...")
  return (
    <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />


        <Route path="/dashboard" element={<Dashboard />} >
          <Route path="dashboard" element={<h2>dashboard page</h2>} />

          <Route path="orderMissions" >
            <Route path="listMissionOrders" element={<ListMissions />} />
            <Route path="addMissionOrders" element={<NewMission />} />
          </Route>

          <Route path="voitures" element={<CarsList />} />
        </Route>
        {/* <Route element={<ProtectedRoute feature="dashboard" reqPermission={["canViewDashboard"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<h1>Dashboard Content</h1>} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute feature="listMission" reqPermission={["canCreateMissionOrders", "canEditMissionOrders", "canDeleteMissionOrders"]} />}>
          <Route path="/missions" element={<Dashboard />}>
            <Route index element={<ListMissions />} />
            <Route path="new" element={<NewMission />} />
          </Route>
        </Route> */}

        {/* Catch-all Route (Optional) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>

  )
}

export default AppRoutes