import React from 'react';
import { postAPI } from '../services/PostServise';
import PostItem from './PostItem';

const PostContainerCopy = () => {
	const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(15);
	return (
		<div>
			<div className='post__list'>
				{isLoading && <h1>Идёт загрузка...</h1>}
				{error && <h1>Произошла ошибка при загрузке</h1>}
				{/* {posts && posts.map(post => <PostItem key={post.id} post={post} />)} */}
			</div>
		</div>
	);
};

export default PostContainerCopy;
