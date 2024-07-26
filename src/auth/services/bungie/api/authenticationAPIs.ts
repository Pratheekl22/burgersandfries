
import {buildAccessTokenBody, buildRefreshTokenBody} from "../utils/apiUtils.ts";
import {TOKEN_URL} from "../../../constants/constants.ts";
import {UserTokens} from "../../../types/UserTokens.ts";

/**
 * API call that exchanges access code from bungie callback for user tokens
 * @param code access code from bungie callback
 */
export async function setUserTokensFromAccessCode(code: string)  {
    const body = buildAccessTokenBody(code);
    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    if (response.ok) {
        return response;
    } else {
        throw Error(response.statusText);
    }
}

/**
 * API call that exchanges valid refresh token for new access token
 * @param userToken
 */
export async function setUserTokensFromRefreshToken(userToken: UserTokens) {
    const body = buildRefreshTokenBody(userToken.refreshToken);
    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    if (response.ok) {
        return response;
    } else {
        throw Error(response.statusText);
    }
}