import { nanoid } from 'nanoid'
import {getToken, hasValidRefreshToken} from "../utils/tokenUtils.ts";
import {getAuthorizationURL} from "./bungie/authorization/authorizationEndpoints.ts";
import {getAuthorizationCode} from "../utils/oauthUtils.ts";
import {refreshUserTokens, setUserTokens} from "./tokenService.ts";

const OAUTH_STATE_STRING = 'oauthState';

/**
 * Workflow if the user goes through the base login page
 * Default navigates them to the dashboard
 */
export const beginAuthWorkflow = () => {
    const userToken = getToken();

    if(userToken === null || !hasValidRefreshToken(userToken)) {
        const state = nanoid();
        sessionStorage.setItem(OAUTH_STATE_STRING, state);
        window.location.href = getAuthorizationURL(state);
    } else if(hasValidRefreshToken(userToken)) {
        refreshUserTokens();
    }
}

export const handleOAuthCallback = async () => {
    const code = getAuthorizationCode(window.location.href);
    if (code) {
        await setUserTokens(code);
    } else {
        throw Error("Failed to handle OAuth Callback")
    }
};




