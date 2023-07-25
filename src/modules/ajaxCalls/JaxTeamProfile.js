import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const JaxTeamProfile = (cbResult : (result : TypeResult, data : any)=>void, teamId) => {
	console.info("GETTING Team Profile From Server");
	cbResult({type : "info", text : "Getting Team Profile From Server"});
	AjaxPostCall("http://localhost:8080/team", "profile", {teamId}, cbResult);
};

export default JaxTeamProfile;