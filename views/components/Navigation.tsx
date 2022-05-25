
import "./navigation.scss"
import React from "preact/compat";
import { Link } from "preact-router";
import connect from "../store/connect";
import {ActionTypes} from "../store/types";
import api from "../apis";

const Navigation = (props)=>{
	
	const {authState} = props
	
	function handleLogout(){
		api.get("/api/logout").then(res=>{
			if(res.status === 201) {
				props.actions.dispatch({
					type: ActionTypes.LOGOUT,
					payload: null
				})
			}
		})
			.catch(ex=>{
			
		})
	}
	
	
	return (
		<div className="navigation">
			<div className="container">
					<div className="main-nav flex justify-between align-center">
						<div  className="logo">
							<Link href="/">
								<img src="/.netlify/functions/server/static/images/javascript-refresh.svg" />
							</Link>
						</div>
						<div className="flex align-center">
							<li className="nav-item"><Link href="/">Home</Link></li>
							<li className="nav-item"><Link href="/about">About</Link></li>
							{ authState && (
								<li className="nav-item"><Link href="/add-post">Add Post</Link></li>
							)}
							<li className="">
								{ authState ? (
									<img onClick={handleLogout} className="avatar" src={authState?.avatar} alt="" />
								) : (
									<Link className="block"  href="/login">
										<svg className="icon block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z"/></svg>
									</Link>
								)
								 }
							</li>
						</div>
					</div>
			</div>
		</div>
	)
}

export default connect(Navigation)