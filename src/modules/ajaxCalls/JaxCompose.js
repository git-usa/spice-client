import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {TypeResultCb} from "../interfaces/TypeResult";

const JaxCompose = (jax : TypeJax, cbResult : TypeResultCb) => {
	const msg = `Composing Message for ${jax.of}`;
	console.info(msg);
	console.info(jax.by);
	// cbResult({type : "info", text : msg});
	AjaxPostCall("http://localhost:8080/compose", jax.of, jax.by, cbResult);
};

export default JaxCompose;