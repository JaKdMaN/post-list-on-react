import React, { useEffect, useState } from "react";
import PostServise from "./API/PostServise";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { getPageCount } from "./utils/pages";

import MyButton from "./components/UI/button/MyButtton";
import MyLoader from "./components/UI/loader/MyLoader";
import MyModal from "./components/UI/modal/MyModal";
import { useFetching } from "./hooks/useFetching";
import { usePosts } from "./hooks/usePosts";
import './styles/App.css';

function App() {

	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	let pagesArray = []
	for (let i = 0; i < totalPages; i++) {
		pagesArray.push(i + 1);
	}

	const [fetchPosts, isPostsLoadning, postError] = useFetching(async () => {
		const response = await PostServise.getAll(limit, page);
		setPosts(response.data)
		const totalCount = (response.headers['x-total-count'])
		setTotalPages(getPageCount(totalCount, limit))
	})

	console.log(totalPages)

	useEffect(() => {
		fetchPosts()
	}, [])

	const createPost = (newPost) => {
		setPosts([newPost, ...posts])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}


	return (
		<div className="App">
			<MyButton onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px 0' }} />

			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{postError &&
				<h1>Возникла ошибка - {postError}</h1>}
			{isPostsLoadning
				? <MyLoader />
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'} />
			}
		</div>
	);
}

export default App;
