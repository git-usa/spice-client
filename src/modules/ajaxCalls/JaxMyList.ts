import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxMyList = (jax : TypeJax, cbResult : HandleResultData) => {
	const msg = `GETTING MY LIST FROM SERVER FOR ${jax.of}`;
	console.info(msg);
	cbResult({type : "info", text : msg});
	AjaxPostCall("myList", jax.of, jax, cbResult);
};

export default JaxMyList;