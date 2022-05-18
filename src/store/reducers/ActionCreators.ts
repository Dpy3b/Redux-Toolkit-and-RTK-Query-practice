import { userSlice } from './UserSlice';
import { IUser } from './../../models/IUser';
import axios from 'axios';
import { AppDispatch } from './../store';
import { createAsyncThunk } from '@reduxjs/toolkit';


// делаем асихронный экшн-криэйтор
// немного странно выглядит, мы из стрелочной функици возвращаем другую стрелочную функцию, которая параметром принимает диспатч
// вот так в обычном редаксе
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
// тут мы ничего никуда не диспатчим, функция createAsyncThunk сделает за нас манипуляции выше, первый аргумент - название thunk'a, вторым аргументом передаем коллбэк в котором реализовываем нужные нам действия
// за то, куда какие данные помещать (т.к. тут мы ничего не диспатчим) отвечает специальное поле внутри слайса - экстраРедюсерс
export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
	try {
		const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users'); // указываем дженейрик того, что мы хотим увидеть в поле data
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue('Не удалось загрузить пользователей'); // вот этот метод это второй аргумент, который мы передаем вторым аргументов в createAsyncThunk
	}
});
