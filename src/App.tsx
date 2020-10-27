import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parse } from 'query-string';

import { Map } from 'Components/Map';
import { Search } from 'Components/Search';
import { CitiesList } from 'Components/CitiesList';
import { City } from 'Components/City';

import { mapActions, mapSelectors } from 'Store/Reducers/map.reducer';

import style from './App.module.scss';

function App() {
	const { city } = parse(window.location.search);

	const dispatch = useDispatch();
	const markers = useSelector(mapSelectors.markers);
	const [showDetails, setDetails] = useState(false);

	useEffect(() => {
		if (city) {
			setDetails(true);
		}
	}, [city]);

	if (showDetails) {
		return (
			<div className={style.cityDetails}>
				<City cityId={Number(city)} />
			</div>
		);
	}

	return (
		<div className="App">
			<Map
				center={{ lat: -19.932549018216584, lng: -43.94139916657121 }}
				markers={markers}
				addMarker={marker => {
					dispatch(mapActions.clean());
					dispatch(mapActions.addMarker(marker));
				}}
			/>
			<Search />
			<CitiesList />
		</div>
	);
}

export default App;
