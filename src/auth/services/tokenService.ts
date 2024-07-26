import {UserTokens} from "../types/UserTokens.ts";
import {
    createAuthTokenFromResponse,
    createRefreshTokenFromResponse,
    getToken,
    hasValidAccessToken,
    setToken
} from "../utils/tokenUtils.ts";
import {OAuthTokenResponse} from "../types/OAuthTokenResponse.ts";
import {useLocation} from "react-router-dom";
import {REDIRECT_URL_KEY} from "../constants/constants.ts";
import {beginAuthWorkflow} from "./authService.ts";
import {setUserTokensFromAccessCode, setUserTokensFromRefreshToken} from "./bungie/api/authenticationAPIs.ts";

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

export function getAccessTokenValue(): string | null {
    const userToken = getToken();
    if(userToken && hasValidAccessToken(userToken)) {
        return userToken.accessToken.value;
    } else {
        // Store the current URL in localStorage or sessionStorage
        const location = useLocation();
        const currentUrl = `${location.pathname}${location.search}`;
        localStorage.setItem(REDIRECT_URL_KEY, currentUrl);

        // Do auth authorization flow
        beginAuthWorkflow();
        return null;
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

    const userTokens = getToken();
    if(userTokens) {
        userTokens.accessToken = accessToken;
    } else {
        throw Error("Error while handling refresh token response")
    }
}