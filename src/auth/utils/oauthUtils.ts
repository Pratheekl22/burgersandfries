import {OAUTH_STATE_STRING, REDIRECT_URL_KEY} from "../constants/constants.ts";
import {UserTokens} from "../types/UserTokens.ts";
import {hasValidRefreshToken} from "./tokenUtils.ts";

/**
 * Return the authorization code if code is present and the saved state and url param state match
 * Else return null
 * @param callbackUrl
 */
export const getAuthorizationCode = (callbackUrl: string) =>  {
    const url = new URL(callbackUrl);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && verifyAuthorizationCode(state)) {
        return code;
    }

    return null;
}

export const verifyAuthorizationCode = (state: string | null) => {
    return state === sessionStorage.getItem(OAUTH_STATE_STRING)
}

export const getRedirectURL = (): string => {
    return localStorage.getItem(REDIRECT_URL_KEY) ?? "/dashboard"
}

export const needReauthentication = (userToken: UserTokens | null): boolean => {
    if(userToken === null) {
        return true
    } else {
        return !hasValidRefreshToken(userToken);
    }
}