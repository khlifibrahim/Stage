import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/Store';
import AppRoutes from './Routes/App.routes';
import SideBar from './Components/SideBar/SIdeBar';
import Header from './Components/Header/Header';
import Layout from './Layout';


function App() {
  

  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;