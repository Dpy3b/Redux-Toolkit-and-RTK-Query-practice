import { userSlice } from './UserSlice';
import { IUser } from './../../models/IUser';
import axios from 'axios';
import { AppDispatch } from './../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

// немного странно выглядит, мы из стрелочной функици возвращаем другую стрелочную функцию, которая параметром принимает диспатч
/*
export const fetchUsers = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(userSlice.actions.usersFetching());
		const response = await axios.get<IUser[]>(
			'https://jsonplaceholder.typicode.com/users'
		);
		dispatch(userSlice.actions.usersFetchingSuccess(response.data));
	} catch (e) {
		dispatch(
			userSlice.actions.usersFetchingError('Не удалось загрузить пользователей')
		);
	}
};
 */
// ниже специальная надстройка редакс тулкита
// тут мы ничего никуда не диспатчим
export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
	try {
		const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
	}
});
