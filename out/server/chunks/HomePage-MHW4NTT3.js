import "./chunk-ARCZTGWE.js";

// views/pages/HomePage.jsx
import React from "../../node_modules/react/index.js";
function Home() {
  const [posts, setPost] = React.useState([
    { title: "Post One" },
    { title: "Post Two" },
    { title: "Post Three" },
    { title: "Post Four" }
  ]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", {
    className: "title"
  }, "Main App"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => alert("hello")
  }, "Click Me ssssasddddd asdasd"), posts.map((post) => /* @__PURE__ */ React.createElement("li", null, post.title)));
}
var HomePage_default = Home;
export {
  HomePage_default as default
};
