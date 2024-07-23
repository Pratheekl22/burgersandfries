import {Token} from "../types/Token.ts";
import {UserTokens} from "../types/UserTokens.ts";
import {OAuthTokenResponse} from "../types/OAuthTokenResponse.ts";
import {hasValidAccessToken} from "./oauthUtils.ts";
import {beginAuthWorkflow} from "../services/authService.ts";
import {useLocation} from "react-router-dom";
import {REDIRECT_URL_KEY} from "../constants/constants.ts";

const localStorageKey = 'authorization';

/**
 * Utility function to return the stored user tokens
 */
export function getToken(): UserTokens | null {
    const userTokenString = localStorage.getItem(localStorageKey);
    return userTokenString ? (JSON.parse(userTokenString) as UserTokens) : null;
}

export function getAccessTokenValue(): string | null {
    const userToken = getToken();
    if(userToken && hasValidAccessToken()) {
        return userToken.accessToken.value;
    } else {
        // Store the current URL in localStorage or sessionStorage
        const location = useLocation();
        const currentUrl = `${location.pathname}${location.search}`;
        localStorage.setItem(REDIRECT_URL_KEY, currentUrl);

        // Initiate the OAuth authorization flow
        beginAuthWorkflow();

        return null;
    }
}

/**
 * Util function to store the UserTokens in localStorage, so it is persistent across sessions
 * ToDo replace local storage usage with more secure cookies approach
 * @param token
 */
export function setToken(token: UserTokens) {
    localStorage.setItem(localStorageKey, JSON.stringify(token));
}

export function createAuthTokenFromResponse(response: OAuthTokenResponse, inception: number): Token {
    return {
        value: response.access_token,
        expires: response.expires_in,
        name: 'access',
        inception,
    };
}

export function createRefreshTokenFromResponse(response: OAuthTokenResponse, inception: number): Token {
    return {
        value: response.refresh_token,
        expires: response.refresh_expires_in,
        name: 'refresh',
        inception,
    };
}