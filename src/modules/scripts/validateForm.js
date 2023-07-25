import _l from "./_lady";
import type TypeResult from "../interfaces/TypeResult";

const validateForm = (formId, next : (inputs : any)=>void, cbError : (result : TypeResult)=>void) => {
	const inputs = _l(formId)._getInputs();
	if(typeof inputs === "string") cbError({text : inputs, type : "error"});
	else next(inputs);
};

export default validateForm;