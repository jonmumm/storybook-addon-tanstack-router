export interface LocationConfig {
	/** Route path pattern, e.g. '/users/$userId' */
	path?: string;
	/** Route params to substitute into the path, e.g. { userId: '42' } */
	params?: Record<string, string>;
	/** Search params (query string), e.g. { tab: 'settings' } */
	search?: Record<string, unknown>;
	/** URL hash fragment, e.g. '#section-1' */
	hash?: string;
}

export interface LoaderConfig {
	/** Static data returned by the route loader */
	data?: unknown;
}

export interface TanStackRouterParameters {
	/** Configure the router location, params, and search */
	location?: LocationConfig;
	/** Configure route loader data */
	loader?: LoaderConfig;
}
