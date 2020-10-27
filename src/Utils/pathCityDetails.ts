export const pathCityDetails = (cityId: string | number) => {
	return window.location.pathname + '?city=' + cityId;
};
