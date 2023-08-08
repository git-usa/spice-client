import React from "react";
import {useState} from "react";
import {WrapComp} from "./WrapError";
import UseComponent from "./UseComponent";
import AppNavBar from "../containers/AppNavBar";
import AppActionBar from "../containers/AppActionBar";
import {ModalLogout} from "../containers/ModalLogout";
import JaxLogout from "../../modules/ajaxCalls/JaxLogout";
import type TypeResult from "../../modules/interfaces/TypeResult";
import type {TypeProfileMin} from "../../modules/interfaces/TypeAll";
import type {HandleComponentJax} from "../../modules/interfaces/TypeJax";
import {_ladEleById} from "../../modules/scripts/_lady";
import {TypePeopleSession} from "../../modules/interfaces/TypePeople";

const cbLogoutYes = (cbAfterOut : () => void, setResult : (result : TypeResult) => void) => {
	const btnYes : HTMLButtonElement    = _ladEleById("btnLogoutYes");
	const btnCancel : HTMLButtonElement = _ladEleById("btnLogoutCancel");
	
	btnYes.disabled    = true;
	btnCancel.disabled = true;
	
	setResult({type : "info", text : "Requesting Logout From Server..."});
	JaxLogout((result, isOut) => {
		setResult(result);
		if(isOut){
			cbAfterOut();
			return;
		}
		
		btnYes.disabled    = false;
		btnCancel.disabled = false;
	});
};

interface Type{
	user : TypePeopleSession;
	cbAfterOut : () => void;
}

const AppUi = ({user, cbAfterOut} : Type) => {
	console.count("APP UI RENDERED");
	console.info(user);
	
	// Main Component to be Loaded
	const [component, setComponent] = useState(UseComponent(user ? "home" : "blank"));
	
	// Function To Render/Switch Between Components
	const handleComponentJax : HandleComponentJax = (name, jax) => {
		switch(name){
			case "logout":
				const modal : HTMLElement = _ladEleById("modalLogout");
				if(modal)
					modal.style.display = "block";
				break;
			default:
				setComponent(UseComponent(name, jax, handleComponentJax));
		}
	};
	
	return <>
		{/* App Navigation Bar */}
		<WrapComp component={<AppNavBar cbHandler={handleComponentJax} user={user}/>} msg={"App Navigation Bar :"}/>
		
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
			{component}
		</div>
	</>;
};

export default AppUi;