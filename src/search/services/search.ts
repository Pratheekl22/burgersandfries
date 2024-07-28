import {searchDestinyPlayerByBungieName} from "./bungie/api/getApis.ts";

export async function getPlayer(bungieName: string) {
    const [displayName, number] = bungieName.split("#");
    const response = await searchDestinyPlayerByBungieName(displayName, +number);
    console.log(await(response.json()));
}

