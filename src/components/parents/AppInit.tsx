import React, {createContext, Dispatch, SetStateAction, useState} from "react";
import LoadComponent from "./LoadComponent";
import {WrapComp} from "./WrapError";

export const LoadComponentContext = createContext<undefined | Dispatch<SetStateAction<React.JSX.Element>>>(undefined);

const loadComponent = (component : string, message : string) => {
	return <WrapComp component={LoadComponent(component)} msg={message}/>;
};

const AppInit = () => {
	console.info("In App Init");
	// const [comp, setComp] = useState(LoadComponent("sample"));
	const [comp, setComp] = useState(loadComponent("sample", "Sample Comp"));
	return <>
		
		<LoadComponentContext.Provider value={setComp}>
			{comp}
		</LoadComponentContext.Provider>
	
	</>;
};

export default AppInit;