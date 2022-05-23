const esbuild = require('esbuild')

// server bundler
esbuild.build({
	entryPoints: ["app.jsx"],
	bundle: true,
	minify: true,
	sourcemap: true,
	outdir: "out/server",
	chunkNames: "chunks/[name]-[hash]",
	platform: "node",
	target: "node16.4",
	format:"esm",
	watch: true,
	external: ["./node_modules/*"],
	incremental: false,
	splitting: true,
})
	.then(r=>{
		console.log("server building...")
	})
	.catch(ex=>{
		process.exit(1)
		console.log(ex)
})

// client bundler
esbuild.build({
	entryPoints: ["client.entry.jsx"],
	bundle: true,
	minify: true,
	sourcemap: true,
	target: ['chrome58'],
	outdir: "out/client",
	chunkNames: "chunks/[name]-[hash]",
	format:"esm",
	watch: true,
	incremental: false,
	splitting: true,
})
	.then(r=>{
		console.log("client build...")
	})
	.catch(ex=>{
		process.exit(1)
		console.log(ex)
})



// esbuild.build({
// 	entryPoints: ["app.jsx"],
// 	bundle: true,
// 	chunkNames: "chunks/[name]-[hash]",
// 	outdir: "out/client",
// })