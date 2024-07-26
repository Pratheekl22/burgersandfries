import {ACCESS_TOKEN_GRANT_TYPE, REFRESH_TOKEN_GRANT_TYPE} from "../../../constants/constants.ts";
import {Token} from "../../../types/Token.ts";


export function oauthClientId(): string {
    return import.meta.env.VITE_OAUTH_CLIENT_ID;
}

export function oauthClientSecret(): string {
    return import.meta.env.VITE_OAUTH_CLIENT_SECRET;
}

/**
 * Build body to make access code -> access token POST request
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

/**
 * Build body to make refresh token -> access token POST request
 * @param refreshToken
 */
export function buildRefreshTokenBody(refreshToken: Token): URLSearchParams {
    return new URLSearchParams({
        grant_type: REFRESH_TOKEN_GRANT_TYPE,
        refresh_token: refreshToken.value,
        client_id: oauthClientId(),
        client_secret: oauthClientSecret(),
    })
}