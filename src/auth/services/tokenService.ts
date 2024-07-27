import {UserTokens} from "../types/UserTokens.ts";
import {
    createAuthTokenFromResponse,
    createRefreshTokenFromResponse,
    getToken,
    hasValidAccessToken,
    setToken
} from "../utils/tokenUtils.ts";
import {OAuthTokenResponse} from "../types/OAuthTokenResponse.ts";
import {setUserTokensFromAccessCode, setUserTokensFromRefreshToken} from "./bungie/api/authenticationAPIs.ts";
import {needReauthentication} from "../utils/oauthUtils.ts";

/**
 * Sets the user tokens from the access code in the callback URL
 * @param code
 */
export async function setUserTokens(code: string)  {
    const response = await setUserTokensFromAccessCode(code);

    if (response.ok) {
        const userToken = handleAccessTokenResponse(await(response.json()) as OAuthTokenResponse);
        setToken(userToken);
        console.log('Successfully set user token')
    } else {
        throw Error(response.statusText);
    }
}

export async function refreshUserTokens() {
    const userToken = getToken();

    if(userToken !== null) {
        const response = await setUserTokensFromRefreshToken(userToken)
        if (response.ok) {
            handleRefreshTokenResponse(await(response.json()) as OAuthTokenResponse);
            console.log('Successfully refreshed user access token')
        } else {
            throw Error(response.statusText);
        }
    }

}

/**
 * Function to get the user's access token value
 * If we return null, reauthenticate user
 */
export function getAccessTokenValue(): string | null {
    const userToken = getToken();
    console.log(userToken)
    if (userToken) {
        console.log(hasValidAccessToken(userToken))
    }
    if(userToken !== null && hasValidAccessToken(userToken)) {
        return userToken.accessToken.value;
    } else if(userToken !== null && !needReauthentication(userToken)) {
        refreshUserTokens().then();
        return userToken.accessToken.value;
    } else {
        return null
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

function handleRefreshTokenResponse(response: OAuthTokenResponse) {
    const inception = Date.now();
    const accessToken=  createAuthTokenFromResponse(response, inception);
    console.log(`Created new inception time at: ${inception}`)
    const userTokens = getToken();
    if(userTokens) {
        userTokens.accessToken = accessToken;
    } else {
        throw Error("Error while handling refresh token response")
    }
}