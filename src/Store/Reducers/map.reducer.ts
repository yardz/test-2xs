import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

interface Position {
	lat: number;
	lng: number;
}

interface State {
	markers: Position[];
}

const initialState: State = {
	markers: [],
};

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		clean: state => {
			state.markers = [];
		},
		addMarker: (state, action: PayloadAction<Position>) => {
			state.markers.push(action.payload);
		},
	},
});

export const mapActions = {
	...mapSlice.actions,
};

export const mapSelectors = { markers: (state: RootState) => state.map.markers };
