import { kelvinToCelsius } from './kelvinToCelsius';

describe('kelvinToCelsius', () => {
	it('garantindo 0 graus', () => {
		expect(kelvinToCelsius(273.15)).toBe(0);
	});

	it('garantindo 1 graus', () => {
		expect(kelvinToCelsius(274.15)).toBe(1);
	});

	it('garantindo -1 graus', () => {
		expect(kelvinToCelsius(272.15)).toBe(-1);
	});
});
