import {AjaxPostCall} from "./AjaxCalls";
import type TypeJax from "../interfaces/TypeJax";
import type {HandleResultData} from "../interfaces/TypeResult";

const JaxCreate = (jax : TypeJax, cbResult : HandleResultData) => {
	const msg = `CREATING RECORD FOR ${jax.of}`;
	console.info(msg);
	cbResult({type : "info", text : msg}, null);
	AjaxPostCall("create", jax.of, jax.by, cbResult);
};

export default JaxCreate;