import {AjaxPostCall} from "./AjaxCalls";
import type TypeResult from "../interfaces/TypeResult";
import TypeJax from "../interfaces/TypeJax";

const JaxLogin = (cbResult : (result : TypeResult, data : any) => void, jax : TypeJax) => {
	AjaxPostCall("login", "login", jax, cbResult);
};

export default JaxLogin;