import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {Photo, PhotoMutation} from '../types';

export const getAllPhoto = createAsyncThunk<Photo[]>('gallery/GetAll', async () => {
	const response = await axiosApi.get('photos');

	return response.data;
});

export const getAllPhotoAuthor = createAsyncThunk<Photo[], string>('gallery/GetAllAuthor', async (arg) => {
	const response = await axiosApi.get('photos?cameramen=' + arg);

	return response.data;
});

export const PostPhoto = createAsyncThunk<void, PhotoMutation>('gallery/Post', async (arg) => {
	await axiosApi.post('photos', arg);
});

export const DeleteOne = createAsyncThunk<void, string>('gallery/delete', async (arg) => {
	await axiosApi.delete('photos/' + arg);
});