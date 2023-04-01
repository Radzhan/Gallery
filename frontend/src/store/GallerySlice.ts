import { createSlice } from "@reduxjs/toolkit";
import {getAllPhoto, getAllPhotoAuthor} from './GalleryThunks';
import {Photo} from '../types';
import {RootState} from '../app/store';

interface galleryState {
	allPhoto: Photo[];
	authorPhoto: Photo[];
}

const initialState: galleryState = {
	allPhoto: [],
	authorPhoto: [],
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
		builder.addCase(getAllPhotoAuthor.fulfilled, (state, action) => {
			state.authorPhoto = action.payload;
		})
	},
});

export const galleryReducer = gallerySlice.reducer;
export const AllPhoto = (state: RootState) => state.gallery.allPhoto;
export const AuthorPhoto = (state: RootState) => state.gallery.authorPhoto;
