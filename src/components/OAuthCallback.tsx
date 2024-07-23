import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {setUserTokensFromAccessCode} from "../auth/services/tokenService.ts";
import {getAuthorizationCode} from "../auth/services/authService.ts";
import {REDIRECT_URL_KEY} from "../auth/constants/constants.ts";

const OAuthCallback = () => {
    const navigate = useNavigate();

    /**
     * When the user is redirected here from bungie, harvest the code and state from the url to verify
     * successful auth occurred and no CSRF
     *
     * Then exchange code for user access and refresh tokens, and navigate to homepage
     */
    useEffect(() => {
        const handleOAuthCallback = async () => {
            const code = getAuthorizationCode(window.location.href);
            if (code) {
                await setUserTokensFromAccessCode(code);
                //If the user was redirected from a URL, send them back to the URL after auth
                const redirectUrl = localStorage.getItem(REDIRECT_URL_KEY);
                if(redirectUrl) {
                    navigate(redirectUrl);
                } else {
                    navigate('/dashboard');
                }
            } else {
                navigate('/login');
            }
        };

        handleOAuthCallback();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;