import {Token} from "../types/Token.ts";
import {UserTokens} from "../types/UserTokens.ts";
import {OAuthTokenResponse} from "../types/OAuthTokenResponse.ts";

const localStorageKey = 'authorization';

export function getToken(): UserTokens | null {
    const userTokenString = localStorage.getItem(localStorageKey);
    return userTokenString ? (JSON.parse(userTokenString) as UserTokens) : null;
}

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
        value: response.access_token,
        expires: response.refresh_expires_in,
        name: 'refresh',
        inception,
    };
}