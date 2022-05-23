import express from "express";
import path from "path";


const app = require("../functions/server")



const liveReload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = liveReload.createServer()
liveReloadServer.watch(path.join(__dirname, 'views'));

liveReloadServer.server.once("connection", ()=>{
  setTimeout(()=>{
    liveReloadServer.refresh("/")
  }, 5)
})
app.use(connectLiveReload())

app.use("/.netlify/functions/server/static/", express.static(path.resolve("src/public")))

let routes = require("../src/routes")
routes(app)

app.listen(1000, () => console.log("server is running on port 1000"))

