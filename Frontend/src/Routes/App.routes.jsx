import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './Protected.route'

import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboards/Dashboard'
import ListMissions from '../Pages/Mission/ListMissions'
import NewMission from '../Pages/Mission/NewMission'
import Unauthorized from '../Pages/unauthorized/unauthorized'

function AppRoutes() {
  return (
    <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboard Permission */}
        <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />}>
                <Route index element={<Navigate to="/dashboard" replace/>} />
                
                <Route element={<ProtectedRoute reqPermission="canEditMissionOrders" />}>
                    <Route path='listMissions' element={<ListMissions /> }/>
                </Route>
                
                <Route element={<ProtectedRoute reqPermission="canDeleteMissionOrders" />}>
                    <Route path='listMissions' element={<ListMissions /> }/>
                </Route>

                
                <Route element={<ProtectedRoute reqPermission="canCreateMissionOrders" />}>
                    <Route path='newMission' element={<NewMission /> }/>
                </Route>
                
                <Route element={<ProtectedRoute reqPermission="canEditMissionOrders" />}>
                    <Route path='newMission' element={<NewMission /> }/>
                </Route>
                
                <Route element={<ProtectedRoute reqPermission="canDeleteMissionOrders" />}>
                    <Route path='newMission' element={<NewMission /> }/>
                </Route>
                
                {/* Profile Permission */}
                <Route element={<ProtectedRoute reqPermission="canViewDashboard" />}>
                    <Route path='dashboard' element={<Dashboard /> }/>
                </Route>
            </Route>
        </Route>
        
        {/* Missions Orders Permission */}
        

    </Routes>

  )
}

export default AppRoutes