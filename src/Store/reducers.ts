import { combineReducers } from '@reduxjs/toolkit';
import { citiesSlice } from './Reducers/cities.reducer';
import { mapSlice } from './Reducers/map.reducer';

export const reducers = combineReducers({
	map: mapSlice.reducer,
	cities: citiesSlice.reducer,
});
