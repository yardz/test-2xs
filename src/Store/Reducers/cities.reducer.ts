import axios from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../Store';

interface Position {
	lat: number;
	lon: number;
}
interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface City {
	clouds: { all: number };
	coord: { lat: number; lon: number };
	dt: number;
	id: number;
	main: { feels_like: number; humidity: number; pressure: number; temp: number; temp_max: number; temp_min: number };
	name: string;
	// tslint:disable-next-line: no-any
	rain: any;
	// tslint:disable-next-line: no-any
	snow: any;
	sys: { country: string };
	weather: Weather[];
	wind: { speed: number; deg: number };
}

interface State {
	marker: Position | undefined;
	cities: City[];
}

const initialState: State = {
	marker: undefined,
	cities: [],
};

export const citiesSlice = createSlice({
	name: 'cities',
	initialState,
	reducers: {
		clean: state => {
			state.marker = undefined;
			state.cities = [];
		},
		setCities: (state, action: PayloadAction<{ marker: Position; cities: City[] }>) => {
			state.marker = action.payload.marker;
			state.cities = action.payload.cities;
		},
	},
});

interface API {
	cod: string;
	count: number;
	list: City[];
	message: string;
}

const loadCities = ({ point, cities }: { point: Position; cities: number }): AppThunk => async dispatch => {
	const api = ` http://api.openweathermap.org/data/2.5/find?lat=${point.lat}&lon=${point.lon}&cnt=${cities}&APPID=${
		process.env.REACT_APP_OPENWEATHERMAP_API_KEY
	}`;
	axios
		.get<API>(api)
		.then(response => {
			dispatch(citiesSlice.actions.setCities({ marker: point, cities: response.data.list }));
		})
		.catch(error => {
			// log error
		});
};

export const citiesActions = {
	...citiesSlice.actions,
	loadCities,
};

export const citiesSelectors = { cities: (state: RootState) => state.cities.cities };
