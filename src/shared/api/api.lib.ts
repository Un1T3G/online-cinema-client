export const errorCatch = (error: any): string =>
	error.response && error.response.data
		? typeof error.response.data.message === "object"
			? error.response.data.message.join("\n")
			: error.response.data.message
		: error.message;
