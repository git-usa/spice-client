import type TypeAjax from "../interfaces/TypeAjax";

/**
 *
 * @param {TypeAjax} props
 */
export const lats_ajax = (props : TypeAjax) => {
	const params : any = props.params;
	for(let key in params){
		if(!params.hasOwnProperty(key)) continue;
		const value = params[key];
		params[key] = (typeof value === "object" || Array.isArray(value))
		              ? JSON.stringify(value)
		              : value;
	}
	
	// Encode Keys & Data as URI String
	const encodedParams = Object.keys(params)
	                            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	                            .join("&");
	
	// Create & Initialize New HTTP Request
	const httpRequest = new XMLHttpRequest();
	httpRequest.open(props.method || "post", props.url, true);
	httpRequest.withCredentials = true;
	httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	// If Next is Available, Call Next When Request is finished & Response is ready
	httpRequest.onreadystatechange = function(this : XMLHttpRequest){
		if(this.readyState === 4 && props.next)
			props.next({status : this.status, statusText : this.statusText, response : this.response}, props.carry);
	};
	
	// Send HTTP Request with Encoded Params
	httpRequest.send(encodedParams);
};

/**
 *
 * @param {TypeAjax} props
 */
export const lats_get = (props : TypeAjax) => {
	props.method = "get";
	lats_ajax(props);
};

export const lats_post = (props : TypeAjax) => {
	props.method = "post";
	lats_ajax(props);
};

/**
 *
 * @param text
 * @param checkKeys
 * @returns {TypeResponse|string}
 */
export const lats_toJson = (text : string, checkKeys : string | string[] = []) => {
	try{
		const result = JSON.parse(text);
		if(checkKeys){
			if(!Array.isArray(checkKeys)){
				checkKeys = checkKeys.trim().split(" ");
			}
			if(Array.isArray(checkKeys) && checkKeys.length > 0){
				let missingKey = undefined;
				checkKeys.forEach(key => {
					if(!result.hasOwnProperty(key))
						missingKey = key;
				});
				if(missingKey) return (`Missing ${missingKey} from Object`);
			}
		}
		return result;
	} catch(e : any){
		console.error(text);
		return `${e.message} => Check Console for details`;
	}
};