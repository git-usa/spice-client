import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const RegisterPerson = (cbResult : (result : TypeResult, data : any) => void, params : any) => {
	console.info("REGISTERING PERSON");
	cbResult({type : "info", text : "Registering Person"}, null);
	AjaxPostCall("people", "register", params, cbResult);
};

export default RegisterPerson;