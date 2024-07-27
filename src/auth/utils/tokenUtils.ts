import {Token} from "../types/Token.ts";
import {UserTokens} from "../types/UserTokens.ts";
import {OAuthTokenResponse} from "../types/OAuthTokenResponse.ts";
import {localStorageKey} from "../constants/constants.ts";

/**
 * Utility function to return the stored user tokens
 */
export function getToken(): UserTokens | null {
    const userTokenString = localStorage.getItem(localStorageKey);
    return userTokenString ? (JSON.parse(userTokenString) as UserTokens) : null;
}

/**
 * Util function to store the UserTokens in localStorage, so it is persistent across sessions
 * ToDo replace local storage usage with more secure cookies approach
 * @param token
 */
export function setToken(token: UserTokens) {
    localStorage.setItem(localStorageKey, JSON.stringify(token));
}

export function hasValidUserToken() {
    return getToken() !== null;
}

/**
 * Returns if UserToken has valid accessToken
 * @param userToken
 */
export function hasValidAccessToken(userToken: UserTokens): boolean {
    console.log(userToken.accessToken.expires)
    console.log(userToken.accessToken.inception)
    console.log(Date.now())
    if(userToken && userToken.accessToken) {
        return Date.now() < (userToken.accessToken.inception + userToken.accessToken.expires * 1000)
    } else {
        return false;
    }
}

/**
 * Returns if UserToken has valid refreshToken
 * @param userToken
 */
export function hasValidRefreshToken(userToken: UserTokens): boolean {
    if(userToken && userToken.refreshToken) {
        return Date.now() < (userToken.refreshToken.inception + userToken.refreshToken.expires * 1000)
    } else {
        return false;
    }
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