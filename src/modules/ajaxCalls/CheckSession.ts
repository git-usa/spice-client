import {AjaxPostCall} from "./AjaxCalls";
import type {HandleResultData} from "../interfaces/TypeResult";

const CheckSession = (cbResult : HandleResultData) => {
	console.info("CONTACTING SERVER FOR VERIFYING LOGIN SESSION");
	AjaxPostCall("http://localhost:8080/people", "logged", null, cbResult);
};

export default CheckSession;