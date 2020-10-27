import React from 'react';

import { useSelector } from 'react-redux';

import { City } from '../City';
import { citiesSelectors } from 'Store/Reducers/cities.reducer';

import style from './CitiesList.module.scss';

import { pathCityDetails } from 'Utils/pathCityDetails';

export const CitiesList: React.FC = () => {
	const cities = useSelector(citiesSelectors.cities);

	return (
		<div className={style.list} data-testid="list">
			{cities.map(city => (
				<a
					className={style.link}
					href={pathCityDetails(city.id)}
					rel="noreferrer"
					key={city.id}
					data-testid={`city-id-${city.id}`}
					target="_blank">
					<City cityId={city.id} small />
				</a>
			))}
		</div>
	);
};
