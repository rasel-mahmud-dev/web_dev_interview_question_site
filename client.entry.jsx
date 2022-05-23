import React, {Suspense} from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./Main";



// After
import { hydrateRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = hydrateRoot(container);

root.render(
	<BrowserRouter>
		<Suspense fallback={<h1>sdffffffff</h1>}>
			<App />
		</Suspense>
	</BrowserRouter>
)
// Unlike with createRoot, you don't need a separate root.render() call here.

