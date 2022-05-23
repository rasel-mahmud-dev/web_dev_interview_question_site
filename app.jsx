import express from "express";
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// import renderString from "preact-render-to-string";

const app = express()


import App from "./Main"


app.get("*", (req, res)=>{

	const str = ReactDOMServer.renderToString(<App/>)
	res.setHeader("Content-Type", "text/html")
	res.write(`
	<html>
		<body>
			<div>
			${str}
		</div>
	</body>
	</html>
	`)
	res.end()
	
})

app.listen(1000, ()=>{} )

// console.log(renderString(App));