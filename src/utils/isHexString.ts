const REGEXP = /^[a-fA-F0-9]+$/;

export function isHexString(input: string) {
	return REGEXP.test(input);
}
