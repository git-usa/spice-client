import Blank from "./Blank";
import {WrapComp} from "./WrapError";
import React, {useEffect, useState} from "react";
import {showResultBar} from "../singles/ResultBar";
import CreateSwitch from "../chidlren/Create/CreateSwitch";
import type TypeJax from "../../modules/interfaces/TypeJax";
import TypeResult from "../../modules/interfaces/TypeResult";

// const wrap = (component : any, message : string) => <WrapComp component={component} msg={message}/>;

// const btnReloadId = "btnReload";
const resultBarId = "setCreateResult";
const showResult  = (result : TypeResult) => {showResultBar(resultBarId, result);};

const Create = (jax : TypeJax) => {
	console.count("CREATE RENDERED");
	// const [reload, setReload]       = useState<boolean>();
	const [component, setComponent] = useState(<Blank/>);
	
	// const reloadForm = () => setReload(!reload);
	
	useEffect(() => {
		// showResult({type : "info", text : "Loading Form..."});
		setComponent(<WrapComp component={<CreateSwitch of={jax.of}/>} msg={"Create Member"}/>);
	}, [jax]);
	
	return <>
		<div className={"la-container flex-center-vertical"}>
			<div className={"la-l8 la-s100"} id={resultBarId}></div>
			{/*<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnReloadId} className={"w3-button w3-khaki w3-ripple"} onClick={reloadForm}>Reload Form</button>
			</div>*/}
		</div>
		{component}
	</>;
};
export default Create;