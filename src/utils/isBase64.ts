const REGEXP = /^[A-Za-z0-9_-]+={0,2}$/i;

export function isBase64(input: string) {
	return REGEXP.test(input);
}
