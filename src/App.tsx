import React, { useEffect } from 'react';
import './App.css';
import PostContainer from './components/PostContainer';
import PostContainerCopy from './components/PostContainerCopy';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';
import { userSlice } from './store/reducers/UserSlice';

function App() {
	//const { count } = useAppSelector(state => state.userReducer);
	//const { increment } = userSlice.actions;
	const dispatch = useAppDispatch();
	const { users, isLoading, error } = useAppSelector(state => state.userReducer);

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<div className='App'>
			{/* <h1>{count}</h1>
			<button>Кнопочка</button> */}

			{/* {isLoading && <h1>Идёт загрузка...</h1>}
			{error && <h1>{error}</h1>}
			{JSON.stringify(users, null, 2)} */}

			<PostContainer />
			<hr />
			<PostContainerCopy />
		</div>
	);
}

export default App;
