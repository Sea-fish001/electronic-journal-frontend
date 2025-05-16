import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import { useAuth } from './services/auth';

// function App() {
//     //const { isLoggedIn } = useAuth();
//
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <HomePage />} />
//                 <Route
//                     path="/profile"
//                     element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
//                 />
//             </Routes>
//         </Router>
//     );
// }

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;