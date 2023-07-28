import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {TypeResultCb} from "../interfaces/TypeResult";

const JaxUpdate = (jax : TypeJax, cbResult : TypeResultCb) => {
	const msg = `Updating Content for ${jax.of}`;
	console.info(jax);
	console.info(msg);
	cbResult({type : "info", text : msg});
	AjaxPostCall("http://localhost:8080/update", jax.of, jax.by, cbResult);
};

export default JaxUpdate;