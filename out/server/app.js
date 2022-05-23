import a from"../../node_modules/express/index.js";import u from"../../node_modules/react/index.js";import k from"../../node_modules/react-dom/server.node.js";import{StaticRouter as x}from"../../node_modules/react-router-dom/server.js";import o,{Suspense as f}from"../../node_modules/react/index.js";import t from"../../node_modules/react/index.js";import{Link as i}from"../../node_modules/react-router-dom/main.js";var d=()=>t.createElement("div",null,t.createElement(i,{to:"/"},"Home"),t.createElement(i,{to:"/about"},"About"),t.createElement(i,{to:"/contact"},"Contact")),m=d;import{Route as s,Routes as g}from"../../node_modules/react-router-dom/main.js";var v=o.lazy(()=>import("./chunks/HomePage-BYWULTFA.js")),b=o.lazy(()=>import("./chunks/AboutPage-CMY6KTJZ.js")),h=e=>o.createElement("div",{className:"foo"},o.createElement(m,null),o.createElement(f,{fallback:o.createElement("h1",null,"Loading.....")},o.createElement(g,null,o.createElement(s,{path:"/about",element:o.createElement(b,null)}),o.createElement(s,{path:"/",element:o.createElement(v,null)})))),l=h;var n=a();n.use("/client",a.static("out/client"));n.get("*",(e,r)=>{let p={},c=k.renderToString(u.createElement(x,{location:e.url,context:p},u.createElement(l,null)));p.url?console.log("not found.........s...s."):(r.setHeader("Content-Type","text/html"),r.write(`
			<html>
				<body>
					<div id="app">
					${c}
				</div>
				<script src="client/client.entry.js"><\/script>
			</body>
			</html>
		`),r.end())});n.listen(1e3,()=>{console.log("server is running on port 1000")});
//# sourceMappingURL=app.js.map
