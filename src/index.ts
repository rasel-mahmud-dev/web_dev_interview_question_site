import mongoose from "mongoose";

require("dotenv").config()


//local dev
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
  
  routes(router)
  // routes(app)
  

}