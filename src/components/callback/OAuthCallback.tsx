import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleOAuthCallback } from "../../auth/services/authService";

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const redirectUrl = await handleOAuthCallback();
                navigate(redirectUrl);
            } catch (error) {
                console.error('Error handling OAuth callback:', error);
                navigate('/login'); // Redirect to the login page in case of an error
            }
        };

        handleRedirect();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;