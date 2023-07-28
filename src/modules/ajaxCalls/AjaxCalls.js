import {lats_post, lats_toJson} from "../scripts/lajax";
import type TypeResponse from "../interfaces/TypeResponse";
import type TypeResult from "../interfaces/TypeResult";

export const AjaxPostCall = (url, service, params, cbResult : (result : TypeResult, data : any)=>void) => {
	lats_post(
		{
			url,
			params : {service, params},
			next   : (request) => {
				const response : TypeResponse | string = lats_toJson(request.response, "result message");
				
				if(typeof response === "string"){
					console.error("ERROR IN RESPONSE CONVERSION");
					cbResult({text : response, type : "error"});
					return;
				}
				
				if(!response.result){
					console.error("NEGATIVE RESPONSE RECEIVED");
					cbResult({text : response.message, type : "error"}, response.data || false);
					return;
				}
				
				cbResult({text : response.message, type : "pass"}, response.data || true);
			}
		}
	);
};