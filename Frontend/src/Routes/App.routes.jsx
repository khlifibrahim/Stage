import React from 'react'
import { useSelector } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from './Protected.route'

import { ROLE_PERMISSIONS, ROLE_NAMES, ROLES } from '../Components/Utilities/role.permissions'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboards/Dashboard'
import Statistic from '../Pages/Statisctic/Statisctic'
import ListMissions from '../Pages/Mission/ListMissions'
import NewMission from '../Pages/Mission/NewMission'
import ListControl from '../Pages/Mission/Control/listControl'
import NewControl31 from '../Pages/Mission/Control/Control-31-08'
import NewControl24 from '../Pages/Mission/Control/Control-24-09'
import ListEnterprise from '../Pages/Enterprise/ListEnterprise'
import AddEnterprise from '../Pages/Enterprise/AddEnterprise'
import IndhList from '../Components/INDH/IndhList'
import IndhForm from '../Components/INDH/IndhForm'
import IndhDetail from '../Components/INDH/IndhDetail'
import Unauthorized from '../Pages/unauthorized/unauthorized'
import CarsList from '../Pages/Cars/CarsList'
import ProfilePage from '../Pages/Profile/ProfilePage'


function AppRoutes() {
  const {role, user} = useSelector( state => state.auth)
  console.log("App Rout accessed...")
  return (
    <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}


        {/* Routes without protection */}
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Statistic />} />

          <Route path="orderMissions" >
            <Route path="listMissionOrders" element={<ListMissions role={role} user={user} />} />
            <Route path="addMissionOrders" element={<NewMission />} />

            <Route path="control">
              <Route path="list" element={<ListControl role={role} user={user} />} />
              <Route path='add'>
                <Route path="31-08" element={<NewControl31 />} />
                <Route path='24-09' element={<NewControl24 />} />
              </Route>
            </Route>
          </Route>
          
          <Route path="entreprise" >
            <Route path="list" element={<ListEnterprise role={role} />} />
            <Route path="add" element={<AddEnterprise />} />
          </Route>

          <Route path="indh" >
            <Route path="list" element={<IndhList />} />
            <Route path="add" element={<IndhForm />} />
            <Route path="edit/:id" element={<IndhForm />} />
            <Route path="view/:id" element={<IndhDetail />} />
          </Route>

          <Route path="voitures" element={<CarsList />} />

          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        
        {/* Routes with protections */}
        {/* <Route element={<ProtectedRoute feature="dashboard" reqPermission="canViewDashboard" />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Statistic />} />
            <Route path="orderMissions">
              <Route path="listMissionOrders" feature="listMission" reqPermission="canViewMissionOrders" element={<ListMissions />} />
              <Route path="addMissionOrders" element={<NewMission />} />
            </Route>
            <Route path="voitures" element={<CarsList />} />
          </Route>
        </Route> */}

{/* <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute feature="dashboard" reqPermission="canViewDashboard">
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard/orderMissions/listMissionOrders" 
          element={
            <ProtectedRoute feature="listMission" reqPermission="canViewMissionOrders">
              <ListMissions />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard/orderMissions/addMissionOrders" 
          element={
            <ProtectedRoute feature="addOrderMission" reqPermission="canCreateMissionOrders">
              <NewMission />
            </ProtectedRoute>
          } 
        />

      <Route element={<ProtectedRoute />}>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route> */}

    </Routes>

  )
}

export default AppRoutes