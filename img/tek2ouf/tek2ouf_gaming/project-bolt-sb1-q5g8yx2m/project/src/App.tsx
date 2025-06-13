import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Games from './pages/Games';
import AddGame from './pages/AddGame';
import AddUser from './pages/AddUser';
import GamesList from './pages/GamesList';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import MatrixBackground from './components/MatrixBackground';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
            <MatrixBackground />
            <div className="relative z-10">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/add-game" element={<AddGame />} />
                  <Route path="/add-user" element={<AddUser />} />
                  <Route path="/games-list" element={<GamesList />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;