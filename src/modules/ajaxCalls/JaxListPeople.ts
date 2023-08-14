import {AjaxPostCall} from "./AjaxCalls";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxListPeople = (cbResult : HandleResultData) => {
	console.info("GETTING PEOPLE LIST FROM SERVER");
	cbResult({type : "info", text : "Getting People List From Server"});
	AjaxPostCall("people", "listWorkings", null, cbResult);
};

export default JaxListPeople;