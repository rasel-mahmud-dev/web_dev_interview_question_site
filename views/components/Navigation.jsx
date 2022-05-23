import React from 'react';
import { Link } from "react-router-dom";

import "./navigation.css"

const Navigation = () => {
	return (
		<div>
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			<Link to="/contact">Contact</Link>
		</div>
	);
};

export default Navigation;

