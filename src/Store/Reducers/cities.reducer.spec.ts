import { citiesActions, citiesSelectors, citiesSlice } from './cities.reducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from 'Store';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

const reducer = citiesSlice.reducer;

const initialState = { marker: undefined, cities: [] };

describe('cities.reducer', () => {
	describe('actions', () => {
		it('setCities', () => {
			// tslint:disable-next-line: no-any
			const city = { id: 1, name: 'test' } as any;
			expect(reducer(undefined, citiesActions.setCities({ marker: { lon: 0, lat: 0 }, cities: [city] }))).toEqual({
				marker: { lat: 0, lon: 0 },
				cities: [city],
			});
		});

		it('clean', () => {
			expect(reducer(undefined, citiesActions.clean())).toEqual(initialState);
		});

		it('loadCities', async () => {
			// tslint:disable-next-line: no-any
			const city = { id: 1, name: 'test' } as any;
			axios.get = jest.fn().mockResolvedValue({ data: { list: [city] } });

			const store = mockStore({ cities: initialState });

			const action = (citiesActions.loadCities({ point: { lat: 0, lon: 0 }, cities: 15 }) as unknown) as AnyAction;

			const expectedActions = [citiesActions.setCities({ marker: { lon: 0, lat: 0 }, cities: [city] })];

			return store.dispatch(action).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
	});

	describe('selectors', () => {
		it('cities', () => {
			// tslint:disable-next-line: no-any
			const city = { id: 1, name: 'test' } as any;
			const cities = reducer(undefined, citiesActions.setCities({ marker: { lon: 0, lat: 0 }, cities: [city] }));
			const rootState = { cities };

			expect(citiesSelectors.cities(rootState as RootState)).toEqual([city]);
		});
	});
});
