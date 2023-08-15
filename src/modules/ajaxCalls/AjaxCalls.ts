import {lats_post, lats_toJson} from "../scripts/lajax";
import type TypeResponse from "../interfaces/TypeResponse";
import type {HandleResultData} from "../interfaces/TypeResult";

export const AjaxPostCall = (url : string, service : string, params : any, cbResult : HandleResultData) => {
	
	// url = `https://spice-server-6its.onrender.com/${url}`;
	url = `http://localhost:8080/${url}`;
	console.info("SENDING POST REQUEST TO " + url);
	
	lats_post(
		{
			url,
			params : {service, params},
			next   : (request) => {
				// console.info("BEFORE CONVERT");
				// console.info(request.response);
				
				/*if(request && request.response){
					cbResult({text : "check console", type : "error"});
					return;
				}*/
				
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
				
				cbResult({text : response.message, type : "pass"}, response.data || response.token || true);
			}
		}
	);
};