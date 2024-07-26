import {Token} from "./Token.ts";

export interface UserTokens {
    accessToken: Token;
    refreshToken: Token;
    bungieMembershipId: string;
}