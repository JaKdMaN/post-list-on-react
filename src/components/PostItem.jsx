import React from "react";
import MyButton from "./UI/button/MyButtton";

const PostItem = ({ remove, number, post }) => {

	return (
		<div className="post">
			<div className="post__content">
				<h1>{number}. {post.title}</h1>
				<div>
					{post.body}
				</div>
			</div>
			<div className="post__btns">
				<MyButton onClick={() => remove(post)}>
					Удалить
				</MyButton>
			</div>
		</div>
	)
}


export default PostItem