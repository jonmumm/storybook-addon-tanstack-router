import type { LocationConfig } from "../types.js";

/**
 * Converts a LocationConfig into a concrete URL string for createMemoryHistory.
 *
 * Substitutes $paramName placeholders with actual values and appends search params.
 */
export function normalizeLocation(config: LocationConfig): string {
	let url = config.path ?? "/";

	// Substitute $paramName with values from params
	if (config.params) {
		for (const [key, value] of Object.entries(config.params)) {
			url = url.replace(`$${key}`, encodeURIComponent(value));
		}
	}

	// Append search params
	if (config.search && Object.keys(config.search).length > 0) {
		const searchParams = new URLSearchParams();
		for (const [key, value] of Object.entries(config.search)) {
			searchParams.set(key, String(value));
		}
		url += `?${searchParams.toString()}`;
	}

	// Append hash
	if (config.hash) {
		const hash = config.hash.startsWith("#") ? config.hash : `#${config.hash}`;
		url += hash;
	}

	return url;
}
