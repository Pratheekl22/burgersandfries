import {oauthClientId} from "../utils/apiUtils.ts";
import {AUTHENICATION_URL} from "../../../constants/constants.ts";

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
    return `${AUTHENICATION_URL}${queryParams.toString()}`;
}