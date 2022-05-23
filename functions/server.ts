const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
import mongoose from "mongoose";
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import ejsLayouts from "express-ejs-layouts"
var ejs = require('ejs');

require("dotenv").config()

// for host
// import routes from "../dist/routes"

//dev
import routes from "../src/routes"

const router = express.Router();


// view engine setup
app.set('views', path.resolve( 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use(ejsLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if(process.env.NODE_ENV === "development"){
	require("../src/models")
} else {
	require("../dist/models")
}


//  middleware handler
app.use(function( req, res, next) {
	// set locals, only providing error in development
	res.locals.html = "";
	res.locals.sidebarData  = false;
	res.locals.slug = "";
	next()
});



routes(app)


// dev
router.use("/static/", express.static(path.resolve('dist/public')));


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda


const uri = process.env.MONGO_DB_URI
mongoose.connect(uri).then(r => {
	console.log("database connected.")
}).catch(ex=>{
	console.log(ex)
	console.log("database not connected.")
})

module.exports = app;
module.exports.handler = serverless(app);

