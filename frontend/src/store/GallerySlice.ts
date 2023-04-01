import { createSlice } from "@reduxjs/toolkit";
import {getAllPhoto} from './GalleryThunks';
import {Photo} from '../types';
import {RootState} from '../app/store';

interface galleryState {
	allPhoto: Photo[];
}

const initialState: galleryState = {
	allPhoto: []
};

export const gallerySlice = createSlice({
	name: "gallery",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getAllPhoto.fulfilled, (state, action) => {
			state.allPhoto = action.payload;
		});
	},
});

export const galleryReducer = gallerySlice.reducer;
export const AllPhoto = (state: RootState) => state.gallery.allPhoto;
