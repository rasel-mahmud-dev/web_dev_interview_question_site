
import "./styles.scss"
import api from "../apis";


import React from "preact/compat";
import {useEffect} from "preact/hooks";
import connect from "../store/connect";
import { Link } from "preact-router";
import {ActionTypes} from "../store/types";

// import Collapse from "../components/Collapse/Collapse"
import SweetAlert from "./SweetAlert";
import errorMessage from "../response/errorResponse";

const HomePage = (props)=>{

	const {authState} = props
	
	const [message, setMessage] = React.useState("")
	
	useEffect( ()=>{
		
		 if(props.postState.sidebarData && Object.keys(props.postState.sidebarData).length > 0){
		 	
		 	// no need re-fetch post
		 	
		 } else {
			
			 (async function () {
				 try {
				 	let sidebar_dataStr = localStorage.getItem("sidebar_data")
					 let sidebar_data = JSON.parse(sidebar_dataStr)
					 if(sidebar_data){
						 props.actions.dispatch({
							 type: ActionTypes.FETCH_SIDEBAR_DATA,
							 payload: sidebar_data
						 })
						 return
					 }
					 let response = await api.post("/api/sidebar_data")
					 if (response.status === 200) {
					 	localStorage.setItem("sidebar_data", JSON.stringify(response.data.sidebarData))
						 props.actions.dispatch({
							 type: ActionTypes.FETCH_SIDEBAR_DATA,
							 payload: response.data.sidebarData
						 })
					 }
				 } catch (ex) {
					 console.log(ex)
				 }
			 }())
		 }
		 
	}, [])
	
	
	const [activeIds, setActiveIds] = React.useState<string[]>(["1"])
	
	
	function setCollapse(id: string){
		let update = [...activeIds]
		let inx = update.indexOf(id)
		if(inx !== -1){
			update.splice(inx)
		} else {
			update.push(id)
		}
		setActiveIds(      update)
	}
	
	function handleDelete(category_slug, post_id){
		if(authState && authState.role === "admin"){
				api.delete(`/api/post/${post_id}`).then(response=>{
					if(response.status === 201){
						props.actions.dispatch({
							type: ActionTypes.DELETE_POST,
							payload: {
								category_slug,
								post_id
							}
						})
					} else {
						setMessage("only admin can this action")
					}
				}).catch(ex=>{
					setMessage(errorMessage(ex))
				})
		} else {
			setMessage("only admin can this action")
		}
	}
	

	return (
		<div className="mt-10">
			<SweetAlert onClose={()=>setMessage("")} message={message} />
			
			{/*<label  className="hover:text-primary-400 cursor-pointer font-medium text-[16px] text-gray-900" onClick={()=>setCollapse("1")} htmlFor="">How can I change the password of my account?</label>*/}
			{/*<Collapse state={activeIds} id="1">*/}
			{/*	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium, ad adipisci aliquid animi aperiam aspernatur at cum delectus dignissimos, dolor ducimus eligendi error esse facilis maiores maxime natus necessitatibus nobis nostrum obcaecati odio quae quos sequi suscipit tempore temporibus, velit voluptates voluptatibus voluptatum! Dignissimos enim esse perspiciatis repellendus sint? Dignissimos doloremque, id in iste magnam maxime pariatur quae sapiente sunt. Accusantium ad asperiores commodi consequatur consequuntur distinctio, dolor doloribus ducimus ex exercitationem expedita explicabo hic, impedit iste magnam magni nemo nobis nostrum odit optio perferendis quaerat quam quas quasi qui suscipit unde? Consequatur cupiditate dolorem libero perferendis praesentium tenetur.</p>*/}
			{/*</Collapse>*/}
			
			
			<div className="grid">
				{ props.postState.sidebarData && Object.keys(props.postState.sidebarData).map((key)=>(
					<div className="each-cat">
						<h4 class="category_name">{key}</h4>
						{ props.postState.sidebarData[key] &&  props.postState.sidebarData[key].map(post=>(
							<div class="post">
								<Link href={`/${post.category_slug}/${post.slug}`}>{post.title}</Link>
								<div className="flex action">
									<Link href={`/update-post/${post.slug}`}><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg></Link>
									<svg onClick={()=>handleDelete(key, post._id)} class="icon"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0-41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16l21.2 339a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM173.6 48h100.8l19.2 32H154.4zm173.3 416H101.11l-21-336h287.8z"/></svg>
								</div>
							
							</div>
						))}
					</div>
				)) }
			</div>
		</div>
	)
}


export default connect(HomePage)