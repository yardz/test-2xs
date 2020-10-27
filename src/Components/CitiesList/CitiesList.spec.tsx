import React from 'react';
import { render } from '../../test-utils';

import { CitiesList } from './CitiesList';

jest.mock('../City', () => ({
	City: props => <div data-city-id={props.cityId} data-small={props.small ? '1' : '0'} />,
}));

// jest.mock('./subroutes/rotasRenovacao/RotasRenovacao', () => ({
// 	RotasRenovacao: props => <div id="page-renovacao" />,
// }));

const list = [
	{ id: 1, name: 'cidade 01', main: { temp_min: 300.15, temp_max: 321.15 } },
	{ id: 2, name: 'cidade 02', main: { temp_min: 279.15, temp_max: 312.15 } },
];

describe('City', () => {
	it('Deve mostrar a lista das cidades', () => {
		const { queryByTestId } = render(<CitiesList />, {
			initialState: { cities: { cities: list } },
		});
		expect(queryByTestId('list').children.length).toBe(2);
		expect(queryByTestId('city-id-1').childElementCount).toBe(1);
		expect(queryByTestId('city-id-1').children[0].getAttribute('data-city-id')).toBe('1');
		expect(queryByTestId('city-id-1').children[0].getAttribute('data-small')).toBe('1');
		expect(queryByTestId('city-id-2').childElementCount).toBe(1);
		expect(queryByTestId('city-id-2').children[0].getAttribute('data-city-id')).toBe('2');
		expect(queryByTestId('city-id-2').children[0].getAttribute('data-small')).toBe('1');
	});

	it('Caso não haja cidades na lista, deve mostrar a lista vazia', () => {
		const { queryByTestId } = render(<CitiesList />, {
			initialState: { cities: { cities: [] } },
		});
		expect(queryByTestId('list').children.length).toBe(0);
	});

	it('Deve mostrar a lista das cidades', () => {
		const { queryByTestId } = render(<CitiesList />, {
			initialState: { cities: { cities: list } },
		});
		expect(queryByTestId('city-id-1').getAttribute('href')).toBe('/?city=1');
		expect(queryByTestId('city-id-2').getAttribute('href')).toBe('/?city=2');
	});
});
