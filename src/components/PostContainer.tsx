import React, { useEffect, useState } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostServise';
import PostItem from './PostItem';

const PostContainer = () => {
	const [limit, setLimit] = useState(10);
	// автосгенерированные хуки на основании тех эндпоинтов которые мы описываем
	const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit);
	// сюда первым параметром что-то, что будем использовать в запросе, вторым параметром {pollingInterval: 1000 // аналог вебсокетов}
	const [createPost, { error: createError }] = postAPI.useCreatePostMutation(); // возвращает нам кортеж, первый элемент это функция для мутации, второй это объект где находится поля isLoading, data и т.д
	const [updatePost, { error: updateError }] = postAPI.useUpdatePostMutation();
	const [deletePost, { error: deleteError }] = postAPI.useDeletePostMutation();

	useEffect(() => {
		/* setTimeout(() => {
			setLimit(3);
		}, 1000); */
	}, []);

	const handleCreate = async () => {
		const title = prompt();
		await createPost({ title, body: title } as IPost); // поскольку айдишник будет генерировать сам сервер, указываем as IPost чтобы тайпскрипт не ругался на то, что в объекте нету айдишника
	};

	const handleRemove = (post: IPost) => {
		deletePost(post);
	};
	const handleUpdate = (post: IPost) => {
		updatePost(post);
	};
	return (
		<div>
			<div className='post__list'>
				{/* <button onClick={() => refetch()}>REFRESH</button> */}
				<button onClick={handleCreate}>Add new post</button>
				{isLoading && <h1>Идёт загрузка...</h1>}
				{error && <h1>Произошла ошибка при загрузке</h1>}
				{posts &&
					posts.map(post => (
						<PostItem
							remove={handleRemove}
							update={handleUpdate}
							key={post.id}
							post={post}
						/>
					))}
			</div>
		</div>
	);
};

export default PostContainer;
