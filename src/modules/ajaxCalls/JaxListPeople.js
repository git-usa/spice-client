import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const JaxListPeople = (cbResult : (result : TypeResult, data : any)=>void) => {
	console.info("GETTING PEOPLE LIST FROM SERVER");
	cbResult({type : "info", text : "Getting People List From Server"});
	AjaxPostCall("http://localhost:8080/people", "listWorkings", null, cbResult);
};

export default JaxListPeople;