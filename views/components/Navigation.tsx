
import "./navigation.scss"
import React, {useState} from "preact/compat";
import { Link } from "preact-router";
import connect from "../store/connect";
import {ActionTypes} from "../store/types";
import api from "../apis";

const Navigation = (props)=>{
	
	const [openMenu, setOpenMenu] =
		useState(false)
	
	function getCallbackUrl(){
		let hash = window.location.hash
		if(hash !== "#/login"){
			return hash.replace("#/", "")
		}
	}
	
	const {authState, appState} = props
	
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
	
	function toggleTheme(){
		let html = document.getElementById("html")
		let theme = ""
		if(appState.theme === "light"){
			theme = "dark"
		} else {
			theme = "light"
		}
		
		localStorage.setItem("theme", theme)
		html.setAttribute("data-theme", theme)
		
		props.actions.dispatch({
			type: ActionTypes.TOGGLE_THEME,
			payload: theme
		})
	}
	

	
	
	function authPanel(isOpen){
		return (
			<div className={["panel", isOpen ? "panel-show" : ""].join(" ")}>
				{ authState ? (
					<>
						<li onClick={handleLogout} className="panel__item">Logout</li>
					</>
				) : (
					<>
						<li className="panel__item"><Link href={`/login?callback=${getCallbackUrl()}`}>Login</Link></li>
						<li className="panel__item"><Link href={`/registration?callback=${getCallbackUrl()}`}>Registration</Link></li>
					</>
				) }
			</div>
		)
	}
	
	
	return (
		<div className="navigation">
			<div className="container">
					<div className="main-nav flex justify-between align-center">
						<div  className="logo">
							<Link href="/">
								<img src="/.netlify/functions/server/static/images/logo.svg" />
							</Link>
						</div>
						<div className="flex align-center">
							<li className="nav-item"><Link href="/">Home</Link></li>
							
							
							{ authState && (
								<li className="nav-item"><Link href="/add-post">Add Post</Link></li>
							)}
							
							<li className="nav-item">
								{appState.theme === "light"
									? <svg onClick={toggleTheme} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"/></svg>
									: <svg  onClick={toggleTheme} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"/></svg>
								}
							</li>
							
							<li
								onTouchStart={()=>setOpenMenu(true)}
								onTouchMove={()=>setOpenMenu(false)}
								onClick={()=>setOpenMenu(true)}
								onMouseLeave={()=>setOpenMenu(false)}
								onMouseEnter={()=>setOpenMenu(true)} className="relative">
								{ authState ? (
									authState.avatar
										? <img  className="avatar" src={authState.avatar} alt="" />
										: <AlphabeticAvatar username={authState.username}/>
								) : (
									<a className="block" >
										<svg className="icon block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z"/></svg>
									</a>
								)
								 }
								 
								{authPanel(openMenu)}
								
							</li>
						</div>
					</div>
			</div>
		</div>
	)
}

function AlphabeticAvatar({username}){
	let letters = [
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	]
	let colors = [
		"#ff9951", "#d6b7ff", "#FF0000", "#a464ff",
		"#52ff3f", "#e7f867", "#30d2ff", "#a7ffaa",
		"#481fff", "#ffabab", "#b677ff", "#FF0000",
		"#ff52ab", "#FF0000", "#29ffa3", "#ff8d6c",
		"#c745ff", "#6e87d2", "#8afdce", "#ff46ed",
		"#ffae4c", "#4606b8", "#ffc27e", "#FF0000",
		"#46a2ff", "#80fff3",
	]
	let l = username[0]
	let a = letters.indexOf(l)
	
	return (
		<div className="avatar-letter" style={{background: colors[a]}}>{l}</div>
	)
	
}

export default connect(Navigation)