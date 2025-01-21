import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login'
import Layout from './Layout';
import DirecteurDashboard from "./Pages/Dashboards/DirecteurDashboard";
import ChefDeServiceDashboard from "./Pages/Dashboards/ChefServiceDashboard";
import CadreDashboard from "./Pages/Dashboards/CadreDashboard";
import SecretaireDashboard from "./Pages/Dashboards/SecretaireDashboard";
import ListMissions from './Pages/Mission/ListMissions'
import NewMission from './Pages/Mission/NewMission'


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />} >
          <Route path="/directeur"  >
            <Route path='/directeur/listMission' element={<ListMissions/>}/>
            <Route path='/directeur/addMission' element={<NewMission/>} />
          </Route>
          <Route path="/chef-de-service" element={<ChefDeServiceDashboard />} />
          <Route path="/cadre" element={<CadreDashboard />} />
          <Route path="/secretaire" element={<SecretaireDashboard />} />
        </Route>
      </Routes>
  </Router>
  );
}

export default App;