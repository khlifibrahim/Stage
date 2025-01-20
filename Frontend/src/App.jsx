import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login'
import DirecteurDashboard from "./Pages/Dashboards/DirecteurDashboard";
import ChefDeServiceDashboard from "./Pages/Dashboards/ChefServiceDashboard";
import CadreDashboard from "./Pages/Dashboards/CadreDashboard";
import SecretaireDashboard from "./Pages/Dashboards/SecretaireDashboard";


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/directeur" element={<DirecteurDashboard />} />
        <Route path="/chef-de-service" element={<ChefDeServiceDashboard />} />
        <Route path="/cadre" element={<CadreDashboard />} />
        <Route path="/secretaire" element={<SecretaireDashboard />} />
      </Routes>
  </Router>
  );
}

export default App;