import {useState} from "react";
import useComponent from "./useComponent";
import AppNavBar from "../containers/AppNavBar";
import AppActionBar from "../containers/AppActionBar";
import {ModalLogout} from "../containers/ModalLogout";
import DoLogout from "../../modules/ajaxCalls/DoLogout";
import type TypeResult from "../../modules/interfaces/TypeResult";
import type {CbComponentJax, HandleComponentJax} from "../../modules/interfaces/TypeJax";

const cbLogoutYes = (cbAfterOut : ()=>void, setResult : (result : TypeResult)=>void) => {
	document.getElementById("btnLogoutYes").disabled    = true;
	document.getElementById("btnLogoutCancel").disabled = true;
	setResult({type : "info", text : "Requesting Logout From Server..."});
	DoLogout((result, isOut) => {
		setResult(result);
		if(isOut){
			cbAfterOut();
			return;
		}
		document.getElementById("btnLogoutYes").disabled    = false;
		document.getElementById("btnLogoutCancel").disabled = false;
	});
};

const AppUi = ({user, cbAfterOut}) => {
	console.count("APP UI RENDERED");
	
	// Initialize Initial Component
	const initComponent : CbComponentJax = {name : user ? "home" : "blank"};
	
	// Details of Component to be Loaded
	const [component : CbComponentJax, setComponent] = useState(initComponent);
	
	// Function To Render/Switch Between Components
	const handleComponentJax : HandleComponentJax = (name, jax) => {
		switch(name){
			case "logout":
				document.getElementById("modalLogout").style.display = "block";
				break;
			default:
				setComponent({name, jax, cbHandler : handleComponentJax});
		}
	};
	
	return <>
		{/* App Navigation Bar */}
		<AppNavBar cbHandler={handleComponentJax} user={user}/>
		
		{/* Modal Box/Component For Logout  */}
		<ModalLogout cbYes={(setResult) => cbLogoutYes(cbAfterOut, setResult)}/>
		
		{/* App Title & Action Bar */}
		<div style={{marginTop : "75px"}}>
			<div className={"la-container flex-center w3-white"}>
				{/* App Title */}
				<div className={"la-s100 la-l40"}>
					<h3 style={{textTransform : "capitalize"}} className={"w3-padding-left"}>
						Welcome {user.name}
					</h3>
				</div>
				{/* Action Bar */}
				<div className={"la-s100 la-l60"}>
					<AppActionBar cbComponent={handleComponentJax} isSuper={user.super}/>
				</div>
			</div>
		</div>
		
		{/* Main Component */}
		<div className={"w3-padding w3-white"}>
			{useComponent(component.name, component.jax, component.cbHandler)}
		</div>
	</>;
};

export default AppUi;