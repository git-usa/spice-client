import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const JaxLogout = (cbResult : (result : TypeResult, isOut : boolean) => void) => {
	AjaxPostCall("http://localhost:8080/login", "logout", null, cbResult);
};

export default JaxLogout;