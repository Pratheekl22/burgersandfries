import {UserTokens} from "../types/UserTokens.ts";
import {createAuthTokenFromResponse, createRefreshTokenFromResponse, setToken} from "../utils/tokenUtils.ts";
import {buildAccessTokenBody} from "../utils/oauthUtils.ts";
import {OAuthTokenResponse} from "../types/OAuthTokenResponse.ts";

const TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token'

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
        const userToken = handleAccessTokenResponse(await(response.json()) as OAuthTokenResponse);
        setToken(userToken);
        console.log('Successfully set user token')
    } else {
        throw Error(response.statusText);
    }
}

function handleAccessTokenResponse(response: OAuthTokenResponse): UserTokens {
    const inception = Date.now();
    const accessToken=  createAuthTokenFromResponse(response, inception);
    const refreshToken = createRefreshTokenFromResponse(response, inception);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        bungieMembershipId: response.membership_id,
    }
}