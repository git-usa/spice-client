import React from "react";
import type {HandleResultData} from "../../../modules/interfaces/TypeResult";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeLog} from "../../../modules/interfaces/TypeLog";
import {useEffect} from "react";
import _l from "../../../modules/scripts/_lady.js";
import {lat_cloneArray, lat_cloneObject} from "../../../modules/scripts/labject.js";

const tabId = "logTab";

interface Type{
	logs : TypeLog[];
	cbResult : HandleResultData;
	cbComponent : HandleComponentJax;
}

const ListLogs = (props : Type) => {
	const logs = lat_cloneArray(props.logs).map(log => {
		const obj : any = lat_cloneObject(log);
		obj.creator     = log.creator && log.creator.name;
		return obj;
	});
	console.info(logs);
	
	useEffect(() => {
		
		_l(tabId)._replace(null)._showData(logs, null, "creator action path brief createdAt", null, null, true, {createdAt : {input : "date"}});
	}, []);
	
	return <div id={tabId}></div>;
	
};

export default ListLogs;