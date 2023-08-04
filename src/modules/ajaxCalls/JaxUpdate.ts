import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxUpdate = (jax : TypeJax, cbResult : HandleResultData) => {
	const msg = `Updating Content for ${jax.of}`;
	console.info(jax);
	console.info(msg);
	cbResult({type : "info", text : msg}, null);
	AjaxPostCall("http://localhost:8080/update", jax.of, jax.by, cbResult);
};

export default JaxUpdate;