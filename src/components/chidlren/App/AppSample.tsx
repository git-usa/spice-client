import React, {useContext} from "react";
import {LoadComponentContext} from "../../parents/AppInit";
import LoadComponent from "../../parents/LoadComponent";

const AppSample = () => {
	
	const setComp = useContext(LoadComponentContext);
	
	const loadComp = (comp : string) => {
		if(!setComp) return;
		setComp(LoadComponent(comp));
	};
	
	return <>
		<div>This is App Sample</div>
		<button onClick={() => loadComp("home")}>Home</button>
	</>;
	
};

export default AppSample;