import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxCompose = (jax : TypeJax, cbResult : HandleResultData) => {
	const msg = `Composing Message for ${jax.of}`;
	console.info(msg);
	console.info(jax.by);
	// cbResult({type : "info", text : msg});
	AjaxPostCall("compose", jax.of, jax.by, cbResult);
};

export default JaxCompose;