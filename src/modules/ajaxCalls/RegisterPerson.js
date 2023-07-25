import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";

const RegisterPerson = (cbResult : (result : TypeResult, data : any)=>void, params) => {
	console.info("REGISTERING PERSON");
	cbResult({type : "info", text : "Registering Person"});
	AjaxPostCall("http://localhost:8080/people", "register", params, cbResult);
};

export default RegisterPerson;