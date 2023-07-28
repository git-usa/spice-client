import {useEffect, useRef, useState} from "react";
import ResultBar from "../singles/ResultBar";
import JaxProfile from "../../modules/ajaxCalls/JaxProfile";
import type {CbJaxHandleComponentJax, TypeJax} from "../../modules/interfaces/TypeJax";
import type TypeResult, {HandlerResult} from "../../modules/interfaces/TypeResult";
import ProfilePeople from "../chidlren/People/ProfilePeople";
import ProfileProject from "../chidlren/Projects/ProfileProject";
import {lat_isValidObject} from "../../modules/scripts/labject";
import {_ladEleById} from "../../modules/scripts/_lady";
import Blank from "./Blank";
import ProfileTeam from "../chidlren/Teams/ProfileTeam";
import BlankComponent from "../singles/BlankComponent";
import {ModalCompose} from "../containers/ModalCompose";
import JaxCompose from "../../modules/ajaxCalls/JaxCompose";
import ErrorBoundary from "./ErrorBoundary";

interface Type{
	data : any;
	type : string;
}

const Profile = (jax : CbJaxHandleComponentJax) => {
	console.count("PROFILE RENDERED");
	const of          = jax.of;
	const btnReloadId = "btnReload";
	const btnCompose  = "btnCompose";
	
	const [reload, setReload]              = useState();
	const [component, setComponent]        = useState();
	const [result : TypeResult, setResult] = useState({});
	
	const profile   = useRef({data : null, type : null});
	const resultBar = <ResultBar text={result.text} type={result.type}/>;
	
	useEffect(() => {
		setComponent(<Blank/>);
		_ladEleById(btnCompose).disabled  = true;
		_ladEleById(btnReloadId).disabled = true;
		
		setResult({text : "Getting Profile...", type : "info"});
		
		JaxProfile({by : jax.by, of : jax.of}, (result, data) => {
			
			_ladEleById(btnReloadId).disabled = false;
			
			if(!lat_isValidObject(data)){
				setComponent(<BlankComponent/>);
				setResult(result);
				return;
			}
			
			setResult({text : "Profile Found", type : "pass"});
			console.info(data);
			
			switch(of){
				case "people":
					setComponent(<ProfilePeople cbHandler={jax.cbHandler} profile={data}/>);
					break;
				case "project":
					setComponent(<ProfileProject cbHandler={jax.cbHandler} project={data}/>);
					break;
				case "team":
					setComponent(<ProfileTeam cbHandler={jax.cbHandler} team={data}/>);
					break;
			}
			
			// setProfile(data)
			profile.current.data             = data;
			profile.current.type             = of;
			_ladEleById(btnCompose).disabled = false;
		});
	}, [jax, reload]);
	
	const reloadProfile = () => {
		_ladEleById(btnReloadId).disabled = true;
		setReload(!reload);
	};
	
	const showCompose = () => {
		document.getElementById("modalCompose").style.display = "block";
	};
	
	const compose = (subject : string, message : string, setResult : HandlerResult) => {
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
				id : profile.current.data._id,
				subject, message
			}
		};
		
		JaxCompose(jax, (result, data) => {
			setResult(result);
			console.info(result);
			console.info(data);
		});
	};
	
	return <>
		<ModalCompose cbYes={compose}/>
		<div className={"la-container flex-center-vertical"}>
			<div className={"la-l8 la-s100"}>
				{resultBar}
			</div>
			<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnCompose} className={"w3-button w3-khaki w3-ripple"} onClick={showCompose}>Compose</button>
				<button id={btnReloadId} className={"w3-button w3-khaki w3-ripple"} onClick={reloadProfile}>Reload Profile</button>
			</div>
		</div>
		<div>
			<ErrorBoundary fallback={<ResultBar text={"Some Error Occurred. Check Console."} type={"error"}/>}>
				{component}
			</ErrorBoundary>
		</div>
	</>;
};

export default Profile;