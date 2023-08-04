export interface TypeAjaxResponse{
	status : number;
	statusText : string;
	response : any;
}

export interface TypeAjax{
	next? : (request : TypeAjaxResponse, carry : undefined | null | any) => void;
	params : {};
	url : string;
	method? : string;
	carry? : any | undefined;
}

export default TypeAjax;