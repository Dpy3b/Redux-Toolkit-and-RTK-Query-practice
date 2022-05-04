import { fetchUsers } from './ActionCreators';
import { IUser } from './../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	users: IUser[];
	isLoading: boolean;
	error: string;
	//count: number
}

const initialState: UserState = {
	users: [],
	isLoading: false,
	error: '',
	//count: 0
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		//
		/* usersFetching: state => {
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
		}, */
		// старый пример со счетчиком
		/* increment: (state, action: PayloadAction<number>) => {
			state.count += action.payload
		} */
	},
	extraReducers: {
		// вот в таком подходе все необходимые данные редакс тулкит перемещает за нас в состояние, и нам не нужно ничего вручную диспатчить
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

export default userSlice.reducer;