import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import OAuthCallback from './components/OAuthCallback';
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<OAuthCallback />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <div>you're finally awake</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;