import { AxiosInstance } from "axios";

import { errorCatch } from "./api.lib";
import { AuthEvents, authService, authTokenService } from "./auth";

interface FetchInstance {
	get instance(): AxiosInstance;
}

export class UseAuthInterceptors {
	private readonly fetchInstance: FetchInstance;

	constructor(fetchInstance: FetchInstance) {
		this.fetchInstance = fetchInstance;
		this.init();
	}

	private init() {
		this.fetchInstance.instance.interceptors.request.use((config) => {
			const accessToken = authTokenService.getAccessToken();

			if (config.headers && accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}

			return config;
		});

		const IS_CLIENT_SIDE = typeof document !== "undefined";

		this.fetchInstance.instance.interceptors.response.use(
			(config) => config,
			async (error) => {
				const originalRequest = error.config;

				if (
					(error.response.status === 401 ||
						errorCatch(error) === "jwt expired" ||
						errorCatch(error) === "jwt must be provided") &&
					error.config &&
					!error.config._isRetry
				) {
					originalRequest._isRetry = true;
					try {
						const refreshToken = authTokenService.getRefreshToken()!;
						const tokens = await authService.getNewTokens({ refreshToken });
						authTokenService.setTokens(tokens);

						if (IS_CLIENT_SIDE) {
							document.dispatchEvent(AuthEvents.onRefreshTokens);
						}

						return this.fetchInstance.instance.request(originalRequest);
					} catch (e: any) {
						if (e.response && errorCatch(e) === "jwt expired") {
							authTokenService.removeTokens();

							if (IS_CLIENT_SIDE) {
								document.dispatchEvent(AuthEvents.onTokensExpired);
							}
						}
					}
				}

				throw error;
			}
		);
	}
}
