import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProfilePage from './pages/Profile';
import { useAuth } from './services/auth';

function App() {
  const { isLoggedIn } = useAuth();

  return (
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Home />} />
          <Route
              path="/profile"
              element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
  );
}

export default App;