import React, {useRef} from "react";
import Blank from "./Blank";
import WrapError, {WrapComp} from "./WrapError";
import {useEffect, useState} from "react";
import {showResultBar} from "../singles/ResultBar";
import BlankComponent from "../singles/BlankComponent";
import {_ladEleById} from "../../modules/scripts/_lady.js";
import JaxProfile from "../../modules/ajaxCalls/JaxProfile";
import ProfileSwitch from "../chidlren/Profiles/ProfileSwitch";
import {lat_isValidObject} from "../../modules/scripts/labject";
import type {TypeResult} from "../../modules/interfaces/TypeResult";
import {ModalCompose, showModalCompose} from "../modals/ModalCompose";
import type {CbJaxHandleComponentJax} from "../../modules/interfaces/TypeJax";

const btnReloadId  = "btnReload";
const btnComposeId = "btnCompose";
const resultBarId  = "setProfileResult";
const showResult   = ({text, type} : TypeResult) => showResultBar(resultBarId, {text, type});
const toggleButton = (enable = false, toCompose = true) => {
	_ladEleById<HTMLButtonElement>(btnReloadId).disabled = !enable;
	toCompose && (_ladEleById<HTMLButtonElement>(btnComposeId).disabled = !enable);
};

const Profile = ({jax, cbHandler} : CbJaxHandleComponentJax) => {
	const [reload, setReload]       = useState<boolean>();
	const [component, setComponent] = useState(<Blank/>);
	
	const profile = useRef<string>();
	
	useEffect(() => {
		toggleButton();
		setComponent(<Blank/>);
		showResult({text : "Getting Profile...", type : "info"});
		JaxProfile({by : jax.by, of : jax.of}, (result, data) => {
			showResult(result);
			if(result.type === "info") return;
			toggleButton(true, false);
			if(!lat_isValidObject(data)){
				setComponent(<BlankComponent/>);
				return;
			}
			profile.current = jax.by;
			toggleButton(true);
			setComponent(<WrapComp component={<ProfileSwitch of={jax.of} profile={data} cbHandler={cbHandler}/>} msg={""}/>);
		});
	}, [jax, reload]);
	
	const reloadProfile = () => setReload(!reload);
	
	const btnClass = "w3-button w3-khaki w3-ripple";
	
	const showCompose = () => {
		if(!profile || !profile.current){
			showResult({text : "Missing Profile", type : "error"});
			return;
		}
		const cbAfterCompose = (data : any) => {
			console.info("AFTER COMPOSE");
			console.info(data);
		};
		showModalCompose({of : jax.of, id : jax.by, cbAfterCompose});
	};
	
	return <>
		<WrapError component={<ModalCompose/>} fallback={"Modal Compose in Profile :"}/>
		<div className={"la-container flex-center-vertical w3-padding-hor-12"}>
			<div className={"la-l8 la-s100"} id={resultBarId}></div>
			<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnComposeId} className={btnClass} onClick={showCompose}>Compose</button>
				<button id={btnReloadId} className={btnClass} onClick={reloadProfile}>Reload Profile</button>
			</div>
		</div>
		<div>
			{component}
		</div>
	</>;
};

export default Profile;