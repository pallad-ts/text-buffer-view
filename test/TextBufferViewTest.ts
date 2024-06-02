import {TextBufferView} from "@src/TextBufferView";

describe('TextBufferView', () => {

	describe('hex', () => {
		it('should create from string', () => {
			const input = '60cdac8b3938f188ed601cca46150196da1ff1c4';
			const buffer = TextBufferView.fromString(input, 'hex');
			expect(buffer.toString('hex')).toBe(input);
			expect(buffer).toMatchSnapshot();
		});

		it('should fail for invalid string', () => {
			expect(() => {
				TextBufferView.fromString('zzz', 'hex');
			}).toThrowError('Invalid hex string');
		});

		it('allows using empty string', () => {
			expect(TextBufferView.fromString('', 'hex').originalArrayBuffer.byteLength).toBe(0)
		})
	});

	describe('base64', () => {
		it('should create from string', () => {
			const input = 'HZB0oAfVQ890tA==';
			const buffer = TextBufferView.fromString(input, 'base64');
			expect(buffer.toString('base64')).toBe(input);
			expect(buffer).toMatchSnapshot();
		});

		it('should fail for invalid string', () => {
			expect(() => {
				TextBufferView.fromString(')(123asd', 'base64');
			}).toThrowError('Invalid base64 string');
		});

		it('allows using empty string', () => {
			expect(TextBufferView.fromString('', 'base64').originalArrayBuffer.byteLength).toBe(0)
		})
	});

	describe('base64url', () => {
		it('should create from string', () => {
			const input = 'n2f8bBHZEF-f6w';
			const buffer = TextBufferView.fromString(input, 'base64url');
			expect(buffer.toString('base64url')).toBe(input);
			expect(buffer).toMatchSnapshot();
		});

		it('should fail for invalid string', () => {
			expect(() => {
				TextBufferView.fromString(')(123asd', 'base64url');
			}).toThrowError('Invalid base64url string');
		});

		it('allows using empty string', () => {
			expect(TextBufferView.fromString('', 'base64url').originalArrayBuffer.byteLength).toBe(0)
		})
	});

	describe('ascii', () => {
		it('should create from string', () => {
			const input = 'ascii chars';
			const buffer = TextBufferView.fromString(input, 'ascii');
			expect(buffer.toString('ascii')).toBe(input);
			expect(buffer).toMatchSnapshot();
		});

		it('allows using empty string', () => {
			expect(TextBufferView.fromString('', 'ascii').originalArrayBuffer.byteLength).toBe(0)
		})
	});

	describe('utf8', () => {
		it('should create from string', () => {
			const input = 'ȕʹ*椻򕰱麑ѩ+ֳ뢜1񒩎עqGǤ󻚩𑊵򼼊恳Ϛm슺Ĭꄩ󮭷񈥇󥷽ዯ-񆇳';
			const buffer = TextBufferView.fromString(input, 'utf8');
			expect(buffer.toString('utf8')).toBe(input);
			expect(buffer).toMatchSnapshot();
		});
	});

	it('creating from buffer', () => {
		const input = 'some random string';
		const buffer = Buffer.from(input, 'utf8');
		const textBuffer = TextBufferView.fromBuffer(buffer);
		expect(textBuffer.toString()).toBe(input);
		expect(textBuffer.originalArrayBuffer).toBe(buffer);
		expect(textBuffer.arrayBuffer).not.toBe(buffer);
		expect(textBuffer.arrayBuffer).not.toBe(textBuffer.originalArrayBuffer);
	});

	it('creating from array buffer', () => {
		const input = 'some random string';
		const buffer = new TextEncoder().encode(input);
		const textBuffer = TextBufferView.fromArrayBuffer(buffer);
		expect(textBuffer.toString()).toBe(input);
		expect(textBuffer.originalArrayBuffer).toBe(buffer);
		expect(textBuffer.arrayBuffer).not.toBe(buffer);
		expect(textBuffer.arrayBuffer).not.toBe(textBuffer.originalArrayBuffer);
	});

	describe('creating from non buffer fails', () => {
		it('data view', () => {
			const buffer = new ArrayBuffer(2);
			const view = new DataView(buffer);
			expect(() => {
				new TextBufferView(view as any);
			}).toThrowError('Invalid ArrayBuffer');
		})
	})
});
