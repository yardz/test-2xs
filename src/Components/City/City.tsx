import React from 'react';

import { useSelector } from 'react-redux';
import { citiesSelectors } from 'Store/Reducers/cities.reducer';

import { kelvinToCelsius } from 'Utils/kelvinToCelsius';

import style from './City.module.scss';

interface Props {
	cityId: number;
	small?: boolean;
}

export const City: React.FC<Props> = ({ cityId, small }) => {
	const cities = useSelector(citiesSelectors.cities);
	const city = cities.find(({ id }) => id === cityId);
	if (!city) {
		return null;
	}

	return (
		<div className={style.city}>
			<span data-testid="city-name" className={style.name}>
				{city.name}
			</span>
			{!small && (
				<div className={style.details} data-testid="details">
					<div data-testid="temp-min">
						<label>Minimum: </label>
						{kelvinToCelsius(city.main.temp_min)}
					</div>
					<div data-testid="temp-max">
						<label>Maximum: </label>
						{kelvinToCelsius(city.main.temp_max)}
					</div>
				</div>
			)}
		</div>
	);
};
