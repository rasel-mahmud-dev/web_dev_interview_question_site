import express from "express";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";

// import renderString from "preact-render-to-string";
const app = express()

app.use("/client", express.static("out/client"))

import App from "./Main"

app.get("*", (req, res)=>{
	const context = {};
	
	const markup = ReactDOMServer.renderToString(
		<StaticRouter
				location={req.url}
				context={context}>
					<App />
		</StaticRouter>
	);
	
	if (context.url) {
		// Somewhere a `<Redirect>` was rendered
		// redirect(301, context.url);
		console.log("not found.........s...s.")
	} else {
		// we're good, send the response
		
		res.setHeader("Content-Type", "text/html")
		res.write(`
			<html>
				<body>
					<div id="app">
					${markup}
				</div>
				<script src="client/client.entry.js"></script>
			</body>
			</html>
		`)
		res.end()
	}
})



app.listen(1000, ()=>{
	console.log("server is running on port 1000")
})


