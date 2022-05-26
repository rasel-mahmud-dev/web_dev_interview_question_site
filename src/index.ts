import mongoose from "mongoose";

// const express = require('express');
// const serverless = require('serverless-http');const app = express();
// const bodyParser = require('body-parser');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// // var session = require('express-session')
// var cookieSession = require('cookie-session')


require("dotenv").config()

// for host
// import routes from "../dist/routes"

//dev
import routes from "../src/routes"

require("../src/models")

export default  function (app, router){
  
  mongoose.connect(process.env.MONGO_DB_URI).then(r=>{
    console.log("database connected.")
  }).catch(ex=>{
    console.log("database not connect")
  })
  

// access if from          /.netlify/functions/server
//   router.get("/", (r, res)=>{
//     res.send("hi")
//   })

// access if from          /
//   app.get("/", (r, res)=>{
//     res.send("ap")
// })
  
  
  if(process.env.NODE_ENV === "development"){
    // require("../src/models")
  } else {
    // require("../src/models")
    // require("../models")
    // require("./dist")
  }
  
  routes(router)
  // routes(app)
  

}