import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationCode } from '../utils/auth/authService';

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = getAuthorizationCode(window.location.href);
        console.log(code);
        if (code) {
            navigate('/profile');
        } else {
            // Handle the case when the code is not present in the URL
            console.error('No code parameter found in the URL');
            navigate('/login');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;