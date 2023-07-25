import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const JaxProjectProfile = (cbResult : (result : TypeResult, data : any)=>void, projectId) => {
	console.info("GETTING Project Profile From Server");
	cbResult({type : "info", text : "Getting Project Profile From Server"});
	AjaxPostCall("http://localhost:8080/project", "profile", {projectId}, cbResult);
};

export default JaxProjectProfile;