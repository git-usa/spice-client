import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {TypeResultCb} from "../interfaces/TypeResult";

const JaxList = (jax : TypeJax, cbResult : TypeResultCb) => {
	const msg = `GETTING LIST FROM SERVER FOR ${jax.of}`;
	console.info(msg);
	cbResult({type : "info", text : msg});
	AjaxPostCall("http://localhost:8080/list", jax.of, jax, cbResult);
};

export default JaxList;