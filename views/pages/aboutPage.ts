import "./styles.scss"
import api from "../apis";
import store from "../store";

class aboutPage {

	constructor() {
		window.aboutClick = function () {
			alert("about click")
		}
	}
	async useEffect(){
		console.log("useEffect about page...")
		
		
	}
	
	render() {
		return (`
			<div class="container">
				<h1>AboutPage </h1>
					<h2>${Date.now().toString()}</h2>
				<button onclick="aboutClick()">Click</button>
			</div>
		`)
	}
}

export default aboutPage