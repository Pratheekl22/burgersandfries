import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {setUserTokensFromAccessCode} from "../auth/services/tokenService.ts";
import {getAuthorizationCode} from "../auth/services/authService.ts";

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const code = getAuthorizationCode(window.location.href);
            if (code) {
                await setUserTokensFromAccessCode(code);
                navigate('/inventory');
            } else {
                navigate('/login');
            }
        };

        handleOAuthCallback();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;