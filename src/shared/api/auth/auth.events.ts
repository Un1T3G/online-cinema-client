export class AuthEvents {
	static onRefreshTokens = new Event("onRefreshTokens");
	static onTokensExpired = new Event("onTokensExpired");
}
