import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

interface Position {
	lat: number;
	lng: number;
}

interface Props {
	center: Position;
	markers: Position[];
	addMarker: (marker: Position) => void;
}

const MyGoogleMap = withScriptjs(
	withGoogleMap<Props>(({ markers, center, addMarker }) => {
		return (
			<GoogleMap
				onClick={e => {
					const marker = {
						lat: e.latLng.lat(),
						lng: e.latLng.lng(),
					};
					addMarker(marker);
				}}
				defaultZoom={8}
				defaultCenter={center}>
				{markers.map(position => (
					<Marker key={`key-${position.lat}-${position.lng}`} position={position} />
				))}
			</GoogleMap>
		);
	}),
);

export const Map: React.FC<Props> = props => (
	<MyGoogleMap
		{...props}
		googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
		loadingElement={<div style={{ height: `100%` }} />}
		mapElement={<div style={{ height: `100%` }} />}
		containerElement={<div style={{ height: `500px` }} />}
	/>
);
