import React from "react";
import Blank from "./Blank";
import {WrapComp} from "./WrapError";
import {useEffect, useState} from "react";
import ListLogs from "../chidlren/Logs/ListLogs";
import {showResultBar} from "../singles/ResultBar";
import ListTeams from "../chidlren/Teams/ListTeams";
import JaxList from "../../modules/ajaxCalls/JaxList";
import ListPeople from "../chidlren/People/ListPeople";
import {_ladEleById} from "../../modules/scripts/_lady.js";
import ListMessages from "../chidlren/Messages/ListMessages";
import ListProjects from "../chidlren/Projects/ListProjects";
import type {CbJaxHandleComponentJax} from "../../modules/interfaces/TypeJax";
import {lat_isValidArray, lat_isValidObject} from "../../modules/scripts/labject.js";
import TypeResult from "../../modules/interfaces/TypeResult";

const resultBarId = "setListResult";

const showResult = (result : TypeResult) => showResultBar(resultBarId, result);

/**
 *
 * @constructor
 * @param jax
 */
const List = (jax : CbJaxHandleComponentJax) => {
	console.count("LIST RENDERED");
	const btnReloadId               = "btnReload";
	const [reload, setReload]       = useState<boolean>();
	const [component, setComponent] = useState(<Blank/>);
	
	useEffect(() => {
		setComponent(<Blank/>);
		JaxList({by : jax.by, of : jax.of}, (result, data) => {
			
			// console.info("SHOWING RESULT");
			showResultBar(resultBarId, result);
			
			if(result.type !== "info"){
				// console.info("BUTTON ENABLED");
				_ladEleById<HTMLButtonElement>(btnReloadId).disabled = false;
			}
			
			if(!data){
				// console.info("NO DATA. RETURN");
				return;
			}
			
			if(!lat_isValidArray(data, 0) && !lat_isValidObject(data)){
				// console.info("NOT VALID DATA");
				showResultBar(resultBarId, {text : "No Records Found to List ", type : "error"});
				return;
			}
			
			// console.info(data);
			// return;
			
			console.info("SET COMPONENT");
			switch(jax.of){
				case "people":
					setComponent(
						<WrapComp msg={"List People"}
						          component={<ListPeople cbComponent={jax.cbHandler} people={data}/>}/>
					);
					break;
				case "project":
					setComponent(
						<WrapComp msg={"List Project"}
						          component={<ListProjects cbComponent={jax.cbHandler} projects={data}/>}/>
					);
					break;
				case"team":
					setComponent(
						<WrapComp msg={"List Team"}
						          component={<ListTeams cbResult={showResult} teams={data} cbComponent={jax.cbHandler}/>}/>
					);
					break;
				case "message":
					setComponent(<WrapComp msg={"List Messages"} component={<ListMessages messages={data}/>}/>);
					break;
				case "log":
					setComponent(<WrapComp msg={"List Logs"} component={<ListLogs logs={data} cbResult={showResult} cbComponent={jax.cbHandler}/>}/>);
					break;
				default:
					// console.info("RESULT 5");
					showResultBar(resultBarId, {text : `No Component to List ${jax.of}`, type : "error"});
			}
			
		});
	}, [jax, reload]);
	
	const reloadList = () => {
		_ladEleById<HTMLButtonElement>(btnReloadId).disabled = true;
		setReload(!reload);
	};
	
	return <>
		<div className={"la-container flex-center-vertical"}>
			<div className={"la-l8 la-s100"} id={resultBarId}></div>
			<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnReloadId} className={"w3-button w3-khaki w3-ripple"} onClick={reloadList}>Reload List</button>
			</div>
		</div>
		<div>
			{component}
		</div>
	</>;
};

export default List;