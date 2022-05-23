var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// views/pages/HomePage.jsx
var HomePage_exports = {};
__export(HomePage_exports, {
  default: () => HomePage_default
});
function Home() {
  const [posts, setPost] = import_react2.default.useState([
    { title: "Post One" },
    { title: "Post Two" },
    { title: "Post Three" },
    { title: "Post Four" }
  ]);
  return /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h1", null, "Main App"), posts.map((post) => /* @__PURE__ */ import_react2.default.createElement("li", null, post.title)));
}
var import_react2, HomePage_default;
var init_HomePage = __esm({
  "views/pages/HomePage.jsx"() {
    import_react2 = __toESM(require("./node_modules/react/index.js"));
    HomePage_default = Home;
  }
});

// views/pages/AboutPage.jsx
var AboutPage_exports = {};
__export(AboutPage_exports, {
  default: () => AboutPage_default
});
function AboutPage() {
  return /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h1", null, "AboutPage "));
}
var import_react3, AboutPage_default;
var init_AboutPage = __esm({
  "views/pages/AboutPage.jsx"() {
    import_react3 = __toESM(require("./node_modules/react/index.js"));
    AboutPage_default = AboutPage;
  }
});

// app.jsx
var import_express = __toESM(require("./node_modules/express/index.js"));
var import_react5 = __toESM(require("./node_modules/react/index.js"));
var import_server = __toESM(require("./node_modules/react-dom/server.node.js"));
var import_server2 = require("./node_modules/react-router-dom/server.js");

// Main.jsx
var import_react4 = __toESM(require("./node_modules/react/index.js"));

// views/components/Navigation.jsx
var import_react = __toESM(require("./node_modules/react/index.js"));
var import_react_router_dom = require("./node_modules/react-router-dom/main.js");
var Navigation = () => {
  return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(import_react_router_dom.Link, {
    to: "/"
  }, "Home"), /* @__PURE__ */ import_react.default.createElement(import_react_router_dom.Link, {
    to: "/about"
  }, "About"), /* @__PURE__ */ import_react.default.createElement(import_react_router_dom.Link, {
    to: "/contact"
  }, "Contact"));
};
var Navigation_default = Navigation;

// Main.jsx
var import_react_router_dom2 = require("./node_modules/react-router-dom/main.js");
var Home2 = import_react4.default.lazy(() => Promise.resolve().then(() => (init_HomePage(), HomePage_exports)));
var AboutPage2 = import_react4.default.lazy(() => Promise.resolve().then(() => (init_AboutPage(), AboutPage_exports)));
var Main = (props) => {
  return /* @__PURE__ */ import_react4.default.createElement("div", {
    className: "foo"
  }, /* @__PURE__ */ import_react4.default.createElement(Navigation_default, null), /* @__PURE__ */ import_react4.default.createElement(import_react_router_dom2.Routes, null, /* @__PURE__ */ import_react4.default.createElement(import_react4.Suspense, {
    fallback: /* @__PURE__ */ import_react4.default.createElement("h1", null, "Loading.....")
  }, /* @__PURE__ */ import_react4.default.createElement(import_react_router_dom2.Route, {
    path: "/about",
    element: /* @__PURE__ */ import_react4.default.createElement(AboutPage2, null)
  }), /* @__PURE__ */ import_react4.default.createElement(import_react_router_dom2.Route, {
    path: "/",
    element: /* @__PURE__ */ import_react4.default.createElement(Home2, null)
  }))));
};
var Main_default = Main;

// app.jsx
var app = (0, import_express.default)();
app.get("*", (req, res) => {
  const context = {};
  const markup = import_server.default.renderToString(/* @__PURE__ */ import_react5.default.createElement(import_server2.StaticRouter, {
    location: req.url,
    context
  }, /* @__PURE__ */ import_react5.default.createElement(Main_default, null)));
  if (context.url) {
    console.log("not found...");
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(`
			<html>
				<body>
					<div>
					${markup}
				</div>
			</body>
			</html>
			`);
    res.end();
  }
});
app.listen(1e3, () => {
});
