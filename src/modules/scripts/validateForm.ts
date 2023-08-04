import _l from "./_lady";
import type TypeResult from "../interfaces/TypeResult";

const validateForm = (formId : string, next : (inputs : any) => void, cbError : (result : TypeResult) => void, selector = "input,textarea") => {
	const inputs = _l(formId)._getInputs(selector);
	if(typeof inputs === "string") cbError({text : inputs, type : "error"});
	else next(inputs);
};

export default validateForm;