import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import OAuthCallback from './components/callback/OAuthCallback';
import ProtectedRoute from "./components/routes/ProtectedRoute.tsx";
import Search from './components/search/Search';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<OAuthCallback />} />
                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute>
                            <div>This page is under construction...</div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            {<Search/>}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
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