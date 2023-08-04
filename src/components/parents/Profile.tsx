import React from "react";
import Blank from "./Blank";
import WrapError, {WrapComp} from "./WrapError";
import {useEffect, useRef, useState} from "react";
import {showResultBar} from "../singles/ResultBar";
import BlankComponent from "../singles/BlankComponent";
import {_ladEleById} from "../../modules/scripts/_lady.js";
import {ModalCompose} from "../containers/ModalCompose";
import ProfileTeam from "../chidlren/Teams/ProfileTeam";
import JaxCompose from "../../modules/ajaxCalls/JaxCompose";
import JaxProfile from "../../modules/ajaxCalls/JaxProfile";
import ProfilePeople from "../chidlren/People/ProfilePeople";
import ProfileProject from "../chidlren/Projects/ProfileProject";
import {lat_isValidObject} from "../../modules/scripts/labject";
import {TypeProfileAny} from "../../modules/interfaces/TypeProfile";
import type {TypeResult, HandleResult} from "../../modules/interfaces/TypeResult";
import type {CbJaxHandleComponentJax, TypeJax} from "../../modules/interfaces/TypeJax";

const resultBarId = "setProfileResult";

const showResult = ({text, type} : TypeResult) => showResultBar(resultBarId, {text, type});

const Profile = (jax : CbJaxHandleComponentJax) => {
	console.clear();
	console.info(jax);
	const of           = jax.of;
	const btnReloadId  = "btnReload";
	const btnComposeId = "btnCompose";
	
	const [reload, setReload]       = useState<boolean>();
	const [component, setComponent] = useState(<Blank/>);
	
	const profile = useRef<TypeProfileAny>({data : null, type : null});
	
	useEffect(() => {
		setComponent(<Blank/>);
		
		const btnReload : HTMLButtonElement  = _ladEleById(btnReloadId);
		const btnCompose : HTMLButtonElement = _ladEleById(btnComposeId);
		
		if(btnReload) btnReload.disabled = true;
		if(btnCompose) btnCompose.disabled = true;
		
		showResult({text : "Getting Profile...", type : "info"});
		
		JaxProfile({by : jax.by, of : jax.of}, (result, data) => {
			showResult(result);
			if(result.type === "info") return;
			btnReload.disabled = false;
			
			if(!lat_isValidObject(data)){
				setComponent(<BlankComponent/>);
				return;
			}
			
			showResult({text : "Profile Found", type : "pass"});
			
			switch(of){
				case "people":
					setComponent(<WrapComp msg={"Error in Profile People"}
					                       component={<ProfilePeople cbHandler={jax.cbHandler} profile={data}/>}/>);
					break;
				case "project":
					setComponent(<ProfileProject cbHandler={jax.cbHandler} project={data}/>);
					break;
				case "team":
					setComponent(<ProfileTeam cbHandler={jax.cbHandler} team={data}/>);
					break;
				default:
					showResult({text : "Invalid Profile Component", type : "error"});
			}
			
			// setProfile(data)
			profile.current.data = data;
			profile.current.type = of;
			btnCompose.disabled  = false;
		});
	}, [reload]);
	
	const reloadProfile = () => {
		(_ladEleById(btnReloadId) as HTMLButtonElement).disabled = true;
		setReload(!reload);
	};
	
	const showCompose = () => {
		const modal : HTMLElement = _ladEleById("modalCompose");
		if(modal) modal.style.display = "block";
	};
	
	const compose = (setResult : HandleResult, subject ? : string, message ? : string) => {
		setResult({text : "Composing Message...", type : "info"});
		subject = subject && subject.trim();
		message = message && message.trim();
		
		if(!subject || subject.length === 0){
			setResult({text : "Missing Subject", type : "error"});
			return;
		}
		
		if(!message || message.length === 0){
			setResult({text : "Missing Message", type : "error"});
			return;
		}
		
		const jax : TypeJax = {
			of : profile.current.type,
			by : {
				id : profile.current.data.id,
				subject, message
			}
		};
		
		JaxCompose(jax, (result, data) => {
			setResult(result);
			console.info(data);
		});
	};
	
	const btnClass = "w3-button w3-khaki w3-ripple";
	
	return <>
		<WrapError component={<ModalCompose cbYes={compose}/>} fallback={"Modal Compose in Profile :"}/>
		<div className={"la-container flex-center-vertical"}>
			<div className={"la-l8 la-s100"} id={resultBarId}></div>
			<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnComposeId} className={btnClass} onClick={showCompose}>Compose</button>
				<button id={btnReloadId} className={btnClass} onClick={reloadProfile}>Reload Profile</button>
			</div>
		</div>
		<div>
			<WrapError fallback="Some Error Occurred" component={component}/>
		</div>
	</>;
};

export default Profile;