import JaxList from "../ajaxCalls/JaxList";
import {HandleResult} from "../interfaces/TypeResult";

const LoadList = (of : string, title : string, cbResult : HandleResult, sendData : (data : any) => void, by ? : {}) => {
	console.count(`LOADING ${title}`);
	cbResult({type : "info", text : `Loading ${title} List...`});
	JaxList({of, by}, (result, data) => {
		if(!data){
			cbResult(result);
			return;
		}
		
		if(Array.isArray(data) && data.length > 0){
			sendData(data);
			cbResult({type : "info", text : `Please Select A ${title}`});
		} else{
			cbResult({type : "error", text : `No ${title} Found`});
		}
	}, false);
};

export default LoadList;