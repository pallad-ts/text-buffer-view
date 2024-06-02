import {Encoding} from "./Encoding";
import {isHexString} from "./utils/isHexString";
import {isBase64} from "./utils/isBase64";
import {isBase64Url} from "./utils/isBase64Url";

export class TextBufferView {
	constructor(private buffer: ArrayBuffer) {
		if (!ArrayBuffer.isView(buffer) || buffer instanceof DataView) {
			throw new TypeError('Invalid ArrayBuffer');
		}

		Object.freeze(this);
	}

	toString(encoding: Encoding = 'utf8') {
		if (encoding === 'utf8' || encoding === 'ascii') {
			return new TextDecoder(encoding).decode(this.buffer);
		}
		return Buffer.from(this.buffer).toString(encoding);
	}

	/**
	 * Returns reference to original buffer
	 */
	get originalArrayBuffer() {
		return this.buffer;
	}

	/**
	 * Returns copy of buffer
	 */
	get arrayBuffer() {
		return this.buffer.slice(0)
	}

	static fromBuffer(buffer: Buffer) {
		return new TextBufferView(buffer);
	}

	static fromArrayBuffer(arrayBuffer: ArrayBuffer) {
		return new TextBufferView(arrayBuffer);
	}

	static fromString(input: string, encoding: Encoding) {
		if (encoding === 'utf8') {
			return new TextBufferView(new TextEncoder().encode(input));
		}

		if (encoding === 'hex') {
			if (isHexString(input)) {
				return new TextBufferView(Buffer.from(input, 'hex'));
			}
			throw new TypeError('Invalid hex string');
		}

		if (encoding === 'base64') {
			if (isBase64(input)) {
				return new TextBufferView(Buffer.from(input, 'base64'));
			}
			throw new TypeError('Invalid base64 string');
		}

		if (encoding === 'base64url') {
			if (isBase64Url(input)) {
				return new TextBufferView(Buffer.from(input, 'base64url'));
			}
			throw new TypeError('Invalid base64url string');
		}

		return new TextBufferView(Buffer.from(input, encoding));
	}
}
