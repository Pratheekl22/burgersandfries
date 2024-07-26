import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import OAuthCallback from './components/OAuthCallback';
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<OAuthCallback />} />
                <Route
                    path="/burgies"
                    element={
                        <ProtectedRoute>
                            <div>you're finally awake</div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/fries"
                    element={
                        <ProtectedRoute>
                            <div>you're eeping</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;