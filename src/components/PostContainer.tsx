import React, { useEffect, useState } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostServise';
import PostItem from './PostItem';

const PostContainer = () => {
	const [limit, setLimit] = useState(10);
	const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit); // сюда вторым параметром {pollingInterval: 1000 // аналог вебсокетов}
	const [createPost, { error: createError }] = postAPI.useCreatePostMutation();
	const [updatePost, { error: updateError }] = postAPI.useUpdatePostMutation();
	const [deletePost, { error: deleteError }] = postAPI.useDeletePostMutation();

	useEffect(() => {
		/* setTimeout(() => {
			setLimit(3);
		}, 1000); */
	}, []);

	const handleCreate = async () => {
		const title = prompt();
		await createPost({ title, body: title } as IPost);
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
						<PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
					))}
			</div>
		</div>
	);
};

export default PostContainer;
