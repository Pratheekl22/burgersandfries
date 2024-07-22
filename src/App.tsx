import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import OAuthCallback from './components/OAuthCallback';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<OAuthCallback />} />
            </Routes>
        </Router>
    );
};

export default App;