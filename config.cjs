const {build, formatMessages} = require("esbuild");
const {esBuildDevServer, startServer, sendError, sendReload} = require("esbuild-dev-server");

(async () => {
	const builder = await build({
		entryPoints: ["app.jsx"],
		bundle: true,
		minify: false,
		sourcemap: true,
		// target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
		outdir: "out",
		"chunk-names": "chunks/[name]-[hash] ",
		platform: "node",
		target: "node16.4",
		format:"esm",
		watch: true,
		external: "./node_modules/*",
		incremental: true,
		splitting: true,
		plugins: [
			esBuildDevServer({
				Port: "8080",
				Index: "dist/index.html",
				StaticDir: "dist",
				WatchDir: "src",
				OnLoad: async () => {
					try {
						await builder.rebuild();
						await sendReload();
					} catch(result) {
						let str = await formatMessages(result.errors, {kind: 'error', color: true});
						await sendError(str.join(""));
					}
				}
			})
		],
	});
	await startServer();
})();