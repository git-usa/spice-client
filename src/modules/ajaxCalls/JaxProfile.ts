import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxProfile = (jax : TypeJax, cbResult : HandleResultData) => {
	const msg = `GETTING Profile for ${jax.of} From Server`;
	console.info(msg);
	// console.info(jax);
	cbResult({type : "info", text : msg});
	AjaxPostCall("profile", jax.of, {id : jax.by}, cbResult);
};

export default JaxProfile;