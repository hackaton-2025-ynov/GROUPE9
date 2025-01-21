import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Accueil from './pages/Accueil';
import Formulaire from './pages/Formulaire';

import ProtectedRoute from './pages/protectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/formulaire" element={<Formulaire />} />

      </Routes>
    </Router>
  );
}

export default App;
