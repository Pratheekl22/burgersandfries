import {ExactSearchRequest} from "../../../types/inputTypes.ts";

export function apiKey(): string {
    return import.meta.env.VITE_API_KEY;
}

export function buildDestinyPlayerSearchBody(displayName: string, displayNameCode: number): ExactSearchRequest {
    return {displayName: displayName, displayNameCode: displayNameCode}
}