import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const DoLogout = (cbResult : (result : TypeResult, isOut : boolean)=>void) => {
	AjaxPostCall("http://localhost:8080/people", "logout", null, cbResult);
};

export default DoLogout;