import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxList = (jax : TypeJax, cbResult : HandleResultData) => {
	const msg = `GETTING LIST FROM SERVER FOR ${jax.of}`;
	console.info(msg);
	cbResult({type : "info", text : msg}, null);
	AjaxPostCall("list", jax.of, jax, cbResult);
};

export default JaxList;