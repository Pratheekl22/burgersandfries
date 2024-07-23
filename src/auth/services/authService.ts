import {hasValidAccessToken, hasValidRefreshToken, oauthClientId} from '../utils/oauthUtils.ts';
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom';

const OAUTH_STATE_STRING = 'oauthState';

export const beginAuthWorkflow = () => {
    const navigate = useNavigate();

    //If we don't have valid user tokens, send user through refresh workflow again
    if(!hasValidAccessToken() || !hasValidRefreshToken()) {
        const state = nanoid();
        sessionStorage.setItem(OAUTH_STATE_STRING, state);
        window.location.href = getAuthorizationURL(state);
    } else {
        navigate('/inventory')
    }
}

/**
 * Returns the URL that bungie supports for OAuth authorization
 * On successful authorization, the user will be sent back to /callback with a code
 * @param state
 */
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
