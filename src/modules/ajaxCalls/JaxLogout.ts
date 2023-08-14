import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const JaxLogout = (cbResult : (result : TypeResult, isOut : boolean) => void) => {
	AjaxPostCall("login", "logout", null, cbResult);
};

export default JaxLogout;