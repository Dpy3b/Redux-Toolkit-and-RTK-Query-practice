import React, { useEffect } from 'react';
import './App.css';
import PostContainer from './components/PostContainer';
import PostContainerCopy from './components/PostContainerCopy';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';
import { userSlice } from './store/reducers/UserSlice';

function App() {
	const { count } = useAppSelector(state => state.userReducer);
	const { increment } = userSlice.actions; // возвращаем экшн криэйтор
	const dispatch = useAppDispatch();
	const { users, isLoading, error } = useAppSelector(state => state.userReducer); // автокомплит подхватывает редюсер и конкретные поля в стейте, всё благодаря нашему кастомному хуку

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<div className='App'>
			<div
				style={{
					border: '2px solid coral',
					display: 'inline-flex',
					flexDirection: 'column',
					textAlign: 'center',
				}}
			>
				<div>{count}</div>
				<button style={{ maxWidth: 100 }} onClick={() => dispatch(increment(10))}>
					Инкремент
				</button>
			</div>

			{isLoading && <h1>Идёт загрузка...</h1>}
			{error && <h1>{error}</h1>}
			{/* {JSON.stringify(users, null, 2)} */}
			{users.map(user => (
				<div key={user.id}>
					{user.id}) {user.name}
				</div>
			))}
			<div>
				<b>
					Для запуска сервера юзаем{' '}
					<span style={{ color: 'crimson' }}>
						json-server --watch db.json --port 5000
					</span>
				</b>
				<PostContainer />
				<hr />
				<PostContainerCopy />
			</div>
		</div>
	);
}

export default App;
