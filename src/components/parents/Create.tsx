import Blank from "./Blank";
import {WrapComp} from "./WrapError";
import React, {useEffect, useState} from "react";
import CreateSwitch from "../chidlren/Create/CreateSwitch";
import type TypeJax from "../../modules/interfaces/TypeJax";

// const wrap = (component : any, message : string) => <WrapComp component={component} msg={message}/>;


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
		{component}
	</>;
};
export default Create;