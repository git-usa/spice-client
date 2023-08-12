import React from "react";
import {WrapComp} from "./WrapError";
import CreateLog from "../chidlren/Logs/CreateLog";
import TeamCreate from "../chidlren/Teams/TeamCreate";
import PeopleCreate from "../chidlren/People/PeopleCreate";
import type TypeJax from "../../modules/interfaces/TypeJax";
import ProfileProject from "../chidlren/Projects/ProjectCreate";

const wrap = (component : any, message : string) => <WrapComp component={component} msg={message}/>;

const Create = (jax : TypeJax) => {
	
	const getComponent = () => {
		switch(jax.of){
			case"people":
				return wrap(<PeopleCreate/>, "Error in Create Project Component");
			case"project":
				return wrap(<ProfileProject/>, "Error in Create Project Component");
			case"team":
				return wrap(<TeamCreate/>, "Error in Create Team Component");
			case "log":
				return wrap(<CreateLog/>, "Error in Create Log Component");
			default:
				throw Error(`Invalid Create Component Request ${jax.of}`);
		}
	};
	
	return <>
		{getComponent()}
	</>;
};
export default Create;