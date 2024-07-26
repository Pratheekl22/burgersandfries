import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom';
import {getToken, hasValidRefreshToken} from "../utils/tokenUtils.ts";
import {getAuthorizationURL} from "./bungie/authorization/authorizationEndpoints.ts";
import {REDIRECT_URL_KEY} from "../constants/constants.ts";
import {getAuthorizationCode} from "../utils/oauthUtils.ts";
import {refreshUserTokens, setUserTokens} from "./tokenService.ts";

const OAUTH_STATE_STRING = 'oauthState';

/**
 * Workflow if the user goes through the base login page
 * Default navigates them to the dashboard
 */
export const beginAuthWorkflow = () => {
    const navigate = useNavigate();
    const userToken = getToken();

    if(userToken === null || !hasValidRefreshToken(userToken)) {
        const state = nanoid();
        sessionStorage.setItem(OAUTH_STATE_STRING, state);
        window.location.href = getAuthorizationURL(state);
    } else if(hasValidRefreshToken(userToken)) {
        const redirectUrl = localStorage.getItem(REDIRECT_URL_KEY);
        if(redirectUrl) {
            refreshUserTokens().then(() => navigate(redirectUrl));
        } else {
            refreshUserTokens().then(() => navigate('/dsahboard'));
        }
    }
}

export const handleOAuthCallback = async () => {
    const code = getAuthorizationCode(window.location.href);
    if (code) {
        await setUserTokens(code);
        //If the user was redirected from a URL, send them back to the URL after auth
        const redirectUrl = localStorage.getItem(REDIRECT_URL_KEY);
        if(redirectUrl) {
            return redirectUrl;
        } else {
            return '/dashboard';
        }
    } else {
        throw Error("Failed to handle OAuth Callback")
    }
};




