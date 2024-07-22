declare const $BURGERSANDFRIES_WEB_CLIENT_ID: string;

export function oauthClientId(): string {
    return import.meta.env.VITE_OAUTH_CLIENT_ID;
}