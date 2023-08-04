import React from "react";
import {WrapComp} from "./WrapError";
import CreateLog from "../chidlren/Logs/CreateLog";
import CreateTeam from "../chidlren/Teams/CreateTeam";
import CreatePeople from "../chidlren/People/CreatePeople";
import type TypeJax from "../../modules/interfaces/TypeJax";
import CreateProject from "../chidlren/Projects/CreateProject";

const wrap = (component : any, message : string) => <WrapComp component={component} msg={message}/>;

const Create = (jax : TypeJax) => {
	
	const getComponent = () => {
		switch(jax.of){
			case"people":
				return wrap(<CreatePeople/>, "Error in Create Project Component");
			case"project":
				return wrap(<CreateProject/>, "Error in Create Project Component");
			case"team":
				return wrap(<CreateTeam/>, "Error in Create Team Component");
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