import {apiKey, buildDestinyPlayerSearchBody} from "../utils/apiUtils.ts";

export async function searchDestinyPlayerByBungieName(displayName: string, displayCode: number)  {
    const body = buildDestinyPlayerSearchBody(displayName, displayCode);
    const response = await fetch('https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/All', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY': apiKey(),
        }
    });

    console.log(response)
    if (response.ok) {
        return response;
    } else {
        throw Error(response.statusText);
    }
}