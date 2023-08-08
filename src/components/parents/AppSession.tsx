import React, {useContext, useEffect, useState} from "react";
import {LoadComponentContext} from "./AppInit";
import {WrapComp} from "./WrapError";
import LoadPage from "./LoadPage";
import JaxSession from "../../modules/ajaxCalls/JaxSession";
import TypeResult from "../../modules/interfaces/TypeResult";
import {TypePeopleSession} from "../../modules/interfaces/TypePeople";
import LoadComponent from "./LoadComponent";
import TypeJax from "../../modules/interfaces/TypeJax";
import AppLogin from "./AppLogin";

const lc   = (name : string, jax : TypeJax) => LoadComponent(name, jax);
const wrap = (component : JSX.Element, message ? : string) => <WrapComp component={component} msg={message || "App Session:"}/>;

const AppSession = () => {
	const setComp = useContext(LoadComponentContext);
	
	const [retry, setRetry] = useState<boolean>(false);
	
	useEffect(() => {
		if(!setComp) return;
		JaxSession((result : TypeResult, data : TypePeopleSession) => {
			if(result.type === "error"){
				setComp(<AppLogin result={result} cbAfterIn={user => console.info(user)} setRetry={() => setRetry(!retry)}/>);
			} else if(data) setComp(wrap(lc("info", {of : result.text || "Date Received", by : null})));
		});
	}, [retry]);
	
	return <>
		{wrap(<LoadPage message={"Checking Login Status, Please wait..."} addClass={"w3-text-white w3-xxxlarge la-lightBold"}/>)}
	</>;
};

export default AppSession;