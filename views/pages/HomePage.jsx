import React from 'react';

import "./styles.css"

function Home() {
	
	const [posts, setPost] = React.useState([
		{title: "Post One"},
		{title: "Post Two"},
		{title: "Post Three"},
		{title: "Post Four"},
	])
	
	return (
		<div>
			<h1 className="title">Main App</h1>
			<button onClick={()=>alert("hello")}>Click Me ssssasddddd asdasd</button>
			{ posts.map(post=>(
				<li>{post.title}</li>
			)) }
		</div>
	)
}

export default Home