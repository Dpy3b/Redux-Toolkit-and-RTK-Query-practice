import { IPost } from './../models/IPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postAPI = createApi({
	reducerPath: 'postAPI', // некоторый уникальный ключ, который будет однозначно опеределять текущий сервис
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
	tagTypes: ['Post'],
	endpoints: build => ({
		// здесь описываем все эндпоинты на которые мы будем отправлять запросы и как-то изменять наше состояние, endpoints это стрелочная функция которая возвращает объект
		// как ключи указываем названия методов в значение передаем результат вызова метода query либо mutation (query - для получения данных с сервера, мутэйшн - для изменения)
		fetchAllPosts: build.query<IPost[], number>({ // обозначаем через дженерик что конкретно будет возвращать хук, в качестве второго дженерика указываем тип аргумента, который будет ожидать этот хук
			// функция квери возвращает объект, принимает аргументы которые необходимы для запроса (тело запроса, параметры, какой-то url)
			query: (limit = 5) => ({
				url: '/posts', // будет приплюсосываться к базовому url
				params: { // параметры запроса
					_limit: limit,
				},
			}),
			providesTags: result => ['Post'], // указываем, что эндпоинт занимается тем, что работает с тегом Post
		}),
		createPost: build.mutation<IPost, IPost>({
			query: post => ({
				url: '/posts',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Post'],
		}),
		updatePost: build.mutation<IPost, IPost>({
			query: post => ({
				url: `/posts/${post.id}`,
				method: 'PUT',
				body: post,
			}),
			invalidatesTags: ['Post'],
		}),
		deletePost: build.mutation<IPost, IPost>({
			query: post => ({
				url: `/posts/${post.id}`,
				method: 'DELETE',
				body: post,
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});
