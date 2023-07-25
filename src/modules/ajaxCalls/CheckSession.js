import type TypeResult from "../interfaces/TypeResult";
import type TypeResponse from "../interfaces/TypeResponse";
import {AjaxPostCall} from "./AjaxCalls";

const CheckSession = (cbResult : (result : TypeResult, response : TypeResponse)=>void) => {
	console.info("CONTACTING SERVER FOR VERIFYING LOGIN SESSION");
	AjaxPostCall("http://localhost:8080/people", "logged", null, cbResult);
};

export default CheckSession;