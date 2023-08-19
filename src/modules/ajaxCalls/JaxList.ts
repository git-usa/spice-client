import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxList = (jax : TypeJax, cbResult : HandleResultData, isBrief = true) => {
	const msg = `GETTING LIST FROM SERVER FOR ${jax.of}`;
	console.info(msg);
	cbResult({type : "info", text : msg}, null);
	AjaxPostCall(isBrief ? "listBrief" : "list", jax.of, jax, cbResult);
};

export default JaxList;