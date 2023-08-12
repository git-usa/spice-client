export interface TypeJax{
	of : string;
	by : any;
}

export interface TypeComponentJax{
	name : string;
	jax? : TypeJax;
}

export interface HandleJax{
	(jax : TypeJax) : any;
}

export interface HandleComponentJax{
	(name : string, jax : TypeJax) : any;
}

export interface CbJax extends TypeJax{
	cbHandler : HandleJax;
}

export interface CbJaxHandleComponentJax{
	jax : TypeJax;
	cbHandler : HandleComponentJax;
}

export interface CbComponentJax extends TypeComponentJax{
	cbHandler : HandleComponentJax;
}

export default TypeJax;