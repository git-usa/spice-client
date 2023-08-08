import React from "react";
import Blank from "./Blank";
import Create from "./Create";
import {WrapComp} from "./WrapError";
import ResultBar from "../singles/ResultBar";
import AppHome from "../chidlren/AppChildren/AppHome";
import type {TypeJax} from "../../modules/interfaces/TypeJax";
import AppSample from "../chidlren/AppChildren/AppSample";
import LoadPage from "./LoadPage";
import AppLogin from "./AppLogin";

const wrap = (component : any, message : string) => <WrapComp component={component} msg={message}/>;

const LoadComponent = (name : string, jax ? : TypeJax) => {
	// console.clear();
	console.info(`Loading Component for APP : ${name}`);
	if(!name) throw Error("Missing Component Reference to Load");
	
	if(!jax){
		switch(name){
			case "blank":
				return wrap(<Blank/>, "Blank Comp :");
			case "home":
				return wrap(<AppHome/>, "App Home :");
			case "sample":
				return wrap(<AppSample/>, "App Sample :");
			default:
				throw Error(`Invalid Component Reference Received : ${name}`);
		}
	}
	
	switch(name){
		case "create":
			return wrap(<Create of={jax.of} by={jax.by}/>, "Error in Create Component");
		
		case "info":
		case "pass":
		case "error":
			return wrap(<ResultBar text={jax.of} type={name}/>, "Error in Result Component");
		
		case "wait":
			return wrap(<LoadPage message={jax.of} addClass={"w3-text-white w3-xxxlarge la-lightBold"}/>, "Waiting Page:");
		
		case "login":
			return wrap(<AppLogin result={jax.by.result} setRetry={jax.by.retry} cbAfterIn={jax.by.cbAfterIn}/>, "App Login:");
		
		default:
			return <ResultBar text={`Invalid Component Reference Received : ${name}`} type={"error"}/>;
	}
};

export default LoadComponent;