import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {TypeResultCb} from "../interfaces/TypeResult";

const JaxProfile = (jax : TypeJax, cbResult : TypeResultCb) => {
	const msg = `GETTING Profile for ${jax.of}  From Server`;
	console.info(msg);
	// cbResult({type : "info", text : msg});
	AjaxPostCall("http://localhost:8080/profile", jax.of, {id : jax.by}, cbResult);
};

export default JaxProfile;