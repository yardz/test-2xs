import React from 'react';
import { render } from '../../test-utils';

import { City } from './City';

const list = [{ id: 1, name: 'nome da cidade', main: { temp_min: 300.15, temp_max: 321.15 } }];

describe('City', () => {
	it('Deve mostrar somente o nome da cidade, caso a prop "small" exista', () => {
		const { queryByTestId } = render(<City cityId={1} />, {
			initialState: { cities: { cities: list } },
		});

		expect(queryByTestId('city-name').textContent).toBe('nome da cidade');
		expect(queryByTestId('temp-min').textContent).toBe('Minimum: 27');
		expect(queryByTestId('temp-max').textContent).toBe('Maximum: 48');
	});

	it('Deve mostrar somente o nome da cidade, caso a prop "small" exista', () => {
		const { queryByTestId } = render(<City cityId={1} small />, {
			initialState: { cities: { cities: list } },
		});
		expect(queryByTestId('city-name').textContent).toBe('nome da cidade');
		expect(queryByTestId('temp-min')).toBeNull();
		expect(queryByTestId('temp-max')).toBeNull();
	});

	it('Caso a cidade não exista na lista, não deve reenderizar nada', () => {
		const { queryByTestId } = render(<City cityId={2} />, {
			initialState: { cities: { cities: list } },
		});
		expect(queryByTestId('city-name')).toBeNull();
	});
});
