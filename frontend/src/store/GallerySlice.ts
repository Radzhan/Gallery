import { createSlice } from "@reduxjs/toolkit";

interface galleryState {
}

const initialState: galleryState = {
};

export const gallerySlice = createSlice({
	name: "gallery",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
	},
});

export const galleryReducer = gallerySlice.reducer;