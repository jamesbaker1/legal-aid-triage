// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import MyCase from './pages/MyCase';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <Router>
      <div className="app d-flex flex-column vh-100">
        {/* <Header /> */}
        
        <main className="flex-fill py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-case" element={<MyCase />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
