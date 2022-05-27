const express = require('express');
const serverless = require('serverless-http');
const app = express();

const bodyParser = require('body-parser');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// var session = require('express-session')
var cookieSession = require('cookie-session')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// app.use(session({
// 	secret: 'keyboard cat',
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: { secure: true }
// }))



// import mainApp from "../dist"

// for local server
import mainApp from "../dist"


const router = express.Router();



// dev
router.use("/static/", express.static(path.resolve('dist/public')));


mainApp(app, router)


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda


if(process.env.NODE_ENV === "development") {
  const liveReload = require("livereload");
  const connectLiveReload = require("connect-livereload");
  
  const liveReloadServer = liveReload.createServer()
  liveReloadServer.watch(path.join(__dirname, 'views'));
  
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/")
    }, 5)
  })
  app.use(connectLiveReload())
}

app.get("*", (req, res, next) => {
  res.setHeader("Content-Type", "text/html")
  res.write(`
		<!DOCTYPE html>
		<html id="html" data-theme="light" lang="en">
			<head>
				<meta charset="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" media="(prefers-color-scheme: light)" content="white">
				<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black">
				<title>Interview Docs</title>
					<link rel="stylesheet" href="/.netlify/functions/server/static/asserts/index.css">
				</head>
				<body>
					<div id="root"></div>
					 <script type="module" src="/.netlify/functions/server/static/asserts/index.js"></script>
					 <script src="//localhost:35729/livereload.js?snipver=1"  defer=""></script>
				</body>
			</html>
  `)
  res.end()
})




module.exports = app;
module.exports.handler = serverless(app);




// const express = require('express');
// const serverless = require('serverless-http');
// const app = express();
// const bodyParser = require('body-parser');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// // var session = require('express-session')
// var cookieSession = require('cookie-session')
//
//
// require("dotenv").config()
//
// // for host
// // import routes from "../dist/routes"
//
//
// //dev
// import routes from "../src/routes"
//
// const router = express.Router();
//
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
//
// app.set('trust proxy', 1) // trust first proxy
// app.use(cookieSession({
// 	name: 'session',
// 	keys: ['key1', 'key2']
// }))
//
//
// // app.set('trust proxy', 1) // trust first proxy
//
// // app.use(session({
// // 	secret: 'keyboard cat',
// // 	resave: false,
// // 	saveUninitialized: true,
// // 	cookie: { secure: true }
// // }))
//
// if(process.env.NODE_ENV === "development"){
// 	require("../src/models")
// } else {
// 	require("../dist/models")
// }
//
//
//
//
//
//
// // dev
// router.use("/static/", express.static(path.resolve('dist/public')));
// // app.use("/static/", express.static(path.resolve('dist/public')));
//
//
//
// // router.use("/static/" ,express.static("out/static"))
// // router.use("/static2/" ,express.static("dist/public"))
//
//
//
//
// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
//
//
// // const uri = process.env.MONGO_DB_URI
// // mongoose.connect(uri).then(r => {
// // 	console.log("database connected.")
// // }).catch(ex=>{
// // 	console.log("database not connected.")
// // })
//
// routes(router)
// routes(app)
//
//
// app.get("*", (req, res, next) => {
// 	res.setHeader("Content-Type", "text/html")
// 	res.write(`
// 		<!DOCTYPE html>
// 		<html lang="en">
// 			<head>
// 				<meta charset="UTF-8" />
// 				<link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
// 				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
// 				<meta name="theme-color" media="(prefers-color-scheme: light)" content="white">
// 				<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black">
// 				<title>Interview Docs</title>
// 					<link rel="stylesheet" href="/.netlify/functions/server/static/javascripts/index.css">
// 				</head>
// 				<body>
// 					<div id="root"></div>
// 					 <script type="module" src="/.netlify/functions/server/static/javascripts/index.js"></script>
// 					 <script id="__bs_script__">//<![CDATA[
//     				document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.27.10'><\\/script>".replace("HOST", location.hostname));
// 						//]]></script>
// 				</body>
// 			</html>
//   `)
// 	res.end()
// })
//
//
//
//
// module.exports = app;
// module.exports.handler = serverless(app);
//

