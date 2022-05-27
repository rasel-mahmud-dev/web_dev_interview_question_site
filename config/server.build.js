const esbuild = require('esbuild')

const isDev = process.env.NODE_ENV === "development"

// server bundler
esbuild.build({
	entryPoints: ["src/index.ts"],
	bundle: true,
	keepNames: true,
	sourcemap: 'external',
	outdir: "dist",
	platform: "node",
	watch: isDev ? {
		onRebuild(error, result) {
			if (error) {
				console.error('watch build failed:', error)
			} else {
				console.log('watch build succeeded:', result)
			}
		},
	} :  false,
	external: ["./node_modules/*"],
	minify: !isDev, // Compressed code
	// splitting: true,
	format: "cjs",
	target: ["node16"],
	incremental: false,
	assetNames: 'assets/[name]-[hash]'
})
	.then(r=>{
		console.log("server building...")
	})
	.catch(ex=>{
		process.exit(1)
		console.log(ex)
	})



