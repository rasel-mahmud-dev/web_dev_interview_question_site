
const esbuild = require('esbuild')
// clients bundlers
const {sassPlugin} = require('esbuild-sass-plugin')
esbuild.build({
	entryPoints: ["views/index.tsx"],
	bundle: true,
	minify: false,
	sourcemap: true,
	// outdir: "out/static",
	outdir: "dist/public/javascripts",
	chunkNames: "chunks/[name]",
	// chunkNames: "chunks/[name]-[hash]",
	target: ['chrome90'],
	format:"esm",
	watch: true,
	
	incremental: false,
	splitting: false,
	plugins: [sassPlugin()]
})
	.then(r=>{
		console.log("client js are watching...")
	})
	.catch(ex=>{
		process.exit(1)
		console.log(ex)
	})

