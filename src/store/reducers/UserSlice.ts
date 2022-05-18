import { fetchUsers } from './ActionCreators';
import { IUser } from './../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	users: IUser[];
	isLoading: boolean;
	error: string;
	count: number;
}

const initialState: UserState = {
	users: [],
	isLoading: false,
	error: '',
	count: 0,
};

// в контексте редакс-тулкита слайс это редюсер, после создания слайса мы можем вытащить из него отдельно редюсер, и отдельно экшн-криэйторы
// функция, принимающая начальное состояние, объект функций-редюсеров и "название слайса (досл. части)", и автоматически генерирующая экшн-криэйторы и типы экшнов, соответствующие редюсерам и состоянию
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// поле редюсерс аналогично конструкции switch/case в обычном редаксе, каждый кейс идёт как отдельный редюсер
		// внутри создаем функции, которые как-то изменяют состояние. они принимают аргументом стейт и некоторый экшн
		//
		usersFetching: state => {
			state.isLoading = true;
		},
		usersFetchingSuccess: (state, action: PayloadAction<IUser[]>) => {
			state.isLoading = false;
			state.error = '';
			state.users = action.payload;
		},
		usersFetchingError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		// старый пример со счетчиком
		increment: (state, action: PayloadAction<number>) => {
			state.count += action.payload;
		},
	},
	extraReducers: {
		// когда мы используем createAsyncThunk, для нас уже создается 3 состояния, пендинг, режектед и фуллфилед, те же сценарии что раньше мы обрабатывали вручную
		// вот в таком подходе все необходимые данные редакс тулкит перемещает за нас в состояние, и нам не нужно ничего вручную диспатчить
		// а так синтаксис не меняется, все так же как и выше
		[fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
			state.isLoading = false;
			state.error = '';
			state.users = action.payload;
		},
		[fetchUsers.pending.type]: (state, action: PayloadAction<IUser[]>) => {
			state.isLoading = true;
		},
		[fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default userSlice.reducer; // вытаскиваем редюсер и экспортируем для использования в store.ts
