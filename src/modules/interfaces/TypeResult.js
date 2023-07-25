export interface TypeResult{
	id? : string;
	text : string | null;
	type? : "error" | "pass" | "info";
}

export interface TypeResultCb{
	(result : TypeResult, data : any) : any;
}

export interface HandlerResult{
	(result : TypeResult) : any;
}

export default TypeResult;