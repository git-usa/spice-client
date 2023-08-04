import React from "react";
import List from "./List";
import Blank from "./Blank";
import Create from "./Create";
import Profile from "./Profile";
import {WrapComp} from "./WrapError";
import ResultBar from "../singles/ResultBar";
import AppHome from "../chidlren/AppChildren/AppHome";
import type {HandleComponentJax, TypeJax} from "../../modules/interfaces/TypeJax";

const wrap = (component : any, message : string) => <WrapComp component={component} msg={message}/>;

const UseComponent = (name : string, jax ? : TypeJax, cbComponentJax ? : HandleComponentJax) => {
	// console.clear();
	console.info(`Using Component : ${name}`);
	if(!name) throw Error("Missing Component Reference to Use");
	
	if(!jax || !cbComponentJax){
		switch(name){
			case "blank":
				return wrap(<Blank/>, "Blank Comp :");
			case "home":
				return wrap(<AppHome/>, "App Home :");
			default:
				throw Error(`Invalid Component Reference Received : ${name}`);
		}
	}
	
	switch(name){
		case "blank":
			return wrap(<Blank/>, "Blank Comp :");
		case "home":
			return wrap(<AppHome/>, "App Home :");
		
		case "create":
			return wrap(<Create of={jax.of} by={jax.by}/>, "Error in Create Component");
		case"list":
			return wrap(<List by={jax.by} of={jax.of} cbHandler={cbComponentJax}/>, "Error in List Component");
		case "profile":
			return wrap(<Profile by={jax.by} of={jax.of} cbHandler={cbComponentJax}/>, "Error in Profile Component");
		
		case "info":
		case "pass":
		case "error":
			return wrap(<ResultBar text={jax.by} type={name}/>, "Error in Result Component");
		default:
			return <ResultBar text={`Invalid Component Reference Received : ${name}`} type={"error"}/>;
	}
};

export default UseComponent;