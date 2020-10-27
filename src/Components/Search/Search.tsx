import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { mapSelectors } from 'Store/Reducers/map.reducer';
import { citiesActions } from 'Store/Reducers/cities.reducer';

import style from './Search.module.scss';

export const Search: React.FC = () => {
	const dispatch = useDispatch();
	const markers = useSelector(mapSelectors.markers);
	const onClick = () => {
		if (markers.length) {
			dispatch(citiesActions.loadCities({ point: { lat: markers[0].lat, lon: markers[0].lng }, cities: 15 }));
		}
	};

	return (
		<button className={style.button} onClick={onClick}>
			Search
		</button>
	);
};
