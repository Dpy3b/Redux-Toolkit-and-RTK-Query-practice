import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { postAPI } from '../services/PostServise';
import userReducer from './reducers/UserSlice';
// ниже обычный редакс // в редакс тулкит нам даже не нужна функция комбайн редюсерс, можно юзать просто объект
const rootReducer = combineReducers({
	userReducer,
	[postAPI.reducerPath]: postAPI.reducer, // как ключ указываем reducerPath, как значение наш редюсер

});
console.log(postAPI.reducer);
console.log(postAPI.reducerPath)
export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postAPI.middleware), // добавляем миддлвейр который получаем из нашего postAPI
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
