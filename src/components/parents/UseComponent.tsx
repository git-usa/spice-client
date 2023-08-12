import React from "react";
import List from "./List";
import Blank from "./Blank";
import Create from "./Create";
import Profile from "./Profile";
import AppLogin from "./AppLogin";
import {WrapComp} from "./WrapError";
import ResultBar from "../singles/ResultBar";
import TypeWrap from "../../modules/interfaces/TypeWrap";
import AppHome from "../chidlren/App/AppHome";
import type {CbComponentJax} from "../../modules/interfaces/TypeJax";

const Wrap = ({component, msg} : TypeWrap) => <WrapComp component={component} msg={msg}/>;

const UseComponent = ({name, jax, cbHandler : cbComponentJax} : CbComponentJax) => {
	// console.clear();
	console.info(`Using Component : ${name}`);
	if(!name) throw Error("Missing Component Reference to Use");
	
	if(!jax || !cbComponentJax){
		switch(name){
			case "blank":
				// return Wrap({component : <Blank/>, msg : "Blank Comp :"});
				return <Wrap component={<Blank/>} msg={"Blank Comp"}/>;
			case "home":
				return <Wrap component={<AppHome/>} msg={"App Home :"}/>;
			// return Wrap({component : <AppHome/>, msg : "App Home :"});
			default:
				throw Error(`Invalid Component Reference Received : ${name}`);
		}
	}
	
	switch(name){
		case "blank":
			return <Wrap component={<Blank/>} msg={"Blank Component:"}/>;
		case "home":
			return <Wrap component={<AppHome/>} msg={"App Home:"}/>;
		
		case "create":
			return <Wrap component={<Create of={jax.of} by={jax.by}/>} msg={"Create Component:"}/>;
		case"list":
			return <Wrap component={<List jax={jax} cbHandler={cbComponentJax}/>} msg={"List Component:"}/>;
		case "profile":
			return <Wrap component={<Profile jax={jax} cbHandler={cbComponentJax}/>} msg={"Profile Component:"}/>;
		
		case "info":
		case "pass":
		case "error":
			return <Wrap component={<ResultBar text={jax.by} type={name}/>} msg={"Result Component:"}/>;
		
		case "login":
			return <Wrap component={<AppLogin result={jax.by.result} setRetry={jax.by.retry} cbAfterIn={jax.by.cbAfterIn}/>} msg={"App Login:"}/>;
		default:
			return <ResultBar text={`Invalid Component Reference Received : ${name}`} type={"error"}/>;
	}
};

export default UseComponent;