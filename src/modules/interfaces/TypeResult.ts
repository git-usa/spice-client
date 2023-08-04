export interface TypeResult{
	id? : string;
	text : string | null;
	type? : "error" | "pass" | "info";
}

export interface HandleResult{
	(result : TypeResult) : any;
}

export interface HandleResultData{
	(result : TypeResult, data ? : any) : any;
}

export default TypeResult;