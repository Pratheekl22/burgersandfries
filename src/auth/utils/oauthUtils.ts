import {Token} from "../types/Token.ts";
import {getToken} from "./tokenUtils.ts";

const ACCESS_TOKEN_GRANT_TYPE = 'authorization_code';
const REFRESH_TOKEN_GRANT_TYPE = 'refresh_token';

export function oauthClientId(): string {
    return import.meta.env.VITE_OAUTH_CLIENT_ID;
}

export function oauthClientSecret(): string {
    return import.meta.env.VITE_OAUTH_CLIENT_SECRET;
}

/**
 * Build body to make code -> access token POST request
 * @param code
 */
export function buildAccessTokenBody(code: string): URLSearchParams {
    return new URLSearchParams({
        grant_type: ACCESS_TOKEN_GRANT_TYPE,
        code,
        client_id: oauthClientId(),
        client_secret: oauthClientSecret(),
    })
}

export function buildRefreshTokenBody(refreshToken: Token): URLSearchParams {
    return new URLSearchParams({
        grant_type: REFRESH_TOKEN_GRANT_TYPE,
        refresh_token: refreshToken.value,
        client_id: oauthClientId(),
        client_secret: oauthClientSecret(),
    })
}

export function hasValidAccessToken(): boolean {
    const userToken = getToken();
    if(userToken && userToken.accessToken) {
        return Date.now() < (userToken.accessToken.inception + userToken.accessToken.expires * 1000)
    } else {
        return false;
    }
}

export function hasValidRefreshToken(): boolean {
    const userToken = getToken();
    if(userToken && userToken.refreshToken) {
        return Date.now() < (userToken.refreshToken.inception + userToken.refreshToken.expires * 1000)
    } else {
        return false;
    }
}

