import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { postAPI } from '../services/PostServise';
import userReducer from './reducers/UserSlice';
// ниже обычный редакс // в редакс тулкит нам даже не нужна функция комбайн редюсерс, можно юзать просто объект
const rootReducer = combineReducers({
	userReducer,
	[postAPI.reducerPath]: postAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postAPI.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
