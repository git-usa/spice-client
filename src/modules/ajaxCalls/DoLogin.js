import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const DoLogin = (cbResult : (result : TypeResult, data : any)=>void, params) => {
	AjaxPostCall("http://localhost:8080/people", "login", params, cbResult);
};

export default DoLogin;