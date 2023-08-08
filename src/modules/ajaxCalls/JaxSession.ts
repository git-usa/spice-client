import {AjaxPostCall} from "./AjaxCalls";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxSession = (cbResult : HandleResultData) => {
	console.info("CONTACTING SERVER FOR VERIFYING LOGIN SESSION");
	AjaxPostCall("http://localhost:8080/login", "session", null, cbResult);
};

export default JaxSession;