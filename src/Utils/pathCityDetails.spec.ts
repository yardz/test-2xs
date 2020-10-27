import { pathCityDetails } from './pathCityDetails';

const mockHostname = (pathname: string) => {
	const spy = jest.spyOn(window, 'location', 'get');
	spy.mockReturnValue({ pathname } as Location);
};

describe('pathCityDetails', () => {
	it('garantindo url correta', () => {
		expect(pathCityDetails(123)).toBe('/?city=123');
	});

	it('garantindo url correta', () => {
		mockHostname('/test/');
		expect(pathCityDetails(123)).toBe('/test/?city=123');
	});
});
