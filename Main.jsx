import React, {Suspense} from 'react';
import Navigation from "./views/components/Navigation";
import { Route, Routes } from "react-router-dom";


// import HomePage from "./views/pages/HomePage"
// import AboutPage from "./views/pages/AboutPage"

const HomePage = React.lazy(()=> import("./views/pages/HomePage")) ;
const AboutPage =  React.lazy(()=>import("./views/pages/AboutPage"));

const Main = (props)=> {
	
	return (
		<div className="foo">
			<Navigation />
			
			{/*<Switch>*/}
			{/*	<Route path="/about">*/}
			{/*		<About />*/}
			{/*	</Route>*/}
			{/*	<Route path="/users">*/}
			{/*		<Users />*/}
			{/*	</Route>*/}
			{/*	<Route path="/">*/}
			{/*		<Home />*/}
			{/*	</Route>*/}
			{/*	*/}
			{/*</Switch>*/}
			
					<Suspense fallback={<h1>Loading.....</h1>}>
				<Routes>
						<Route
							path="/about"
							element={
								// <Suspense fallback={<h1>Loading...</h1>}>
									<AboutPage />
								// </Suspense>
							}
						/>
						
						<Route path="/" element={
							// <Suspense
							// 	fallback={<h1>Loading...</h1>}>
									<HomePage />
								// </Suspense>
							}
						/>
				</Routes>
					</Suspense>
			
		</div>
	)
}

export default Main