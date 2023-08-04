import {lats_post, lats_toJson} from "../scripts/lajax";
import type TypeResponse from "../interfaces/TypeResponse";
import type {HandleResultData} from "../interfaces/TypeResult";

export const AjaxPostCall = (url : string, service : string, params : any, cbResult : HandleResultData) => {
	lats_post(
		{
			url,
			params : {service, params},
			next   : (request) => {
				const response : TypeResponse | string = lats_toJson(request.response, "result message");
				
				if(typeof response === "string"){
					console.error("ERROR IN RESPONSE CONVERSION");
					cbResult({text : response, type : "error"}, null);
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