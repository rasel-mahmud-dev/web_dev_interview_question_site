const esbuild = require('esbuild')

// server bundler
esbuild.build({
	entryPoints: ["functions/server.ts"],
	bundle: true,
	minify: false,
	sourcemap: true,
	outdir: "build",
	chunkNames: "chunks/[name]-[hash]",
	platform: "node",
	target: "node16.4",
	format:"esm",
	watch: true,
	external: ["./node_modules/*"],
	incremental: true,
	splitting: true,
})
	.then(r=>{
		console.log("server building...")
	})
	.catch(ex=>{
		process.exit(1)
		console.log(ex)
	})
	
	
