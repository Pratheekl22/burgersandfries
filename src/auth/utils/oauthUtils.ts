const ACCESS_TOKEN_GRANT_TYPE = 'authorization_code';

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

export function isAuthenticated(): boolean {
    // Check if the access token exists in local storage or state
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
}