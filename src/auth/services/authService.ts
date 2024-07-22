import { oauthClientId } from '../utils/oauthUtils.ts';
import { nanoid } from 'nanoid'

const OAUTH_STATE_STRING = 'oauthState';

export const beginAuthWorkflow = () => {
    const state = nanoid();
    sessionStorage.setItem(OAUTH_STATE_STRING, state);
    window.location.href = getAuthorizationURL(state);
}

export const getAuthorizationURL = (state: string) => {
    const queryParams = new URLSearchParams({
        client_id: oauthClientId(),
        response_type: 'code',
        state: state,
    });
    return `https://www.bungie.net/en/OAuth/Authorize?${queryParams.toString()}`;
}

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
