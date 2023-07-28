import Blank from "./Blank";
import {useEffect, useState} from "react";
import ErrorBoundary from "./ErrorBoundary";
import ResultBar from "../singles/ResultBar";
import ListTeams from "../chidlren/Teams/ListTeams";
import JaxList from "../../modules/ajaxCalls/JaxList";
import ListPeople from "../chidlren/People/ListPeople";
import {_ladEleById} from "../../modules/scripts/_lady";
import ListMessages from "../chidlren/Messages/ListMessages";
import ListProjects from "../chidlren/Projects/ListProjects";
import type TypeResult from "../../modules/interfaces/TypeResult";
import type {CbJaxHandleComponentJax} from "../../modules/interfaces/TypeJax";
import {lat_isValidArray, lat_isValidObject} from "../../modules/scripts/labject";

/**
 *
 * @constructor
 * @param jax
 */
const List = (jax : CbJaxHandleComponentJax) => {
	const btnReloadId                      = "btnReload";
	const init : TypeResult                = {text : "", type : ""};
	const [reload, setReload]              = useState();
	const [component, setComponent]        = useState(<Blank/>);
	const [result : TypeResult, setResult] = useState(init);
	
	useEffect(() => {
		setComponent(<Blank/>);
		JaxList({by : jax.by, of : jax.of}, (result, data) => {
			if(result.type !== "info")
				_ladEleById(btnReloadId).disabled = false;
			
			if(result.type !== "pass"){
				setResult(result);
				return;
			}
			
			if(!lat_isValidArray(data, 0) && !lat_isValidObject(data)){
				setResult({text : "No Records Found to List ", type : "error"});
				return;
			}
			
			setResult(result);
			// console.info(data);
			// return;
			
			switch(jax.of){
				case "people":
					setComponent(<ListPeople cbComponent={jax.cbHandler} people={data} cbResult={setResult}/>);
					break;
				case "project":
					setComponent(<ListProjects projects={data} cbResult={setResult} cbComponent={jax.cbHandler}/>);
					break;
				case"team":
					setComponent(<ListTeams teams={data} cbResult={setResult} cbComponent={jax.cbHandler}/>);
					break;
				case "message":
					setComponent(<ListMessages messages={data}/>);
					break;
				default:
					console.info("RESULT 5");
					setResult({text : `No Component to List ${jax.of}`, type : "error"});
			}
			
		});
	}, [jax, reload]);
	
	const reloadList = () => {
		_ladEleById(btnReloadId).disabled = true;
		setReload(!reload);
	};
	
	return <>
		<div className={"la-container flex-center-vertical"}>
			<div className={"la-l8 la-s100"}>
				<ResultBar text={result.text} type={result.type}/>
			</div>
			<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnReloadId} className={"w3-button w3-khaki w3-ripple"} onClick={reloadList}>Reload List</button>
			</div>
		</div>
		<div>
			<ErrorBoundary fallback={<ResultBar text={"Some Error Occurred while Loading Component. Check Console."} type={"error"}/>}>
				{component}
			</ErrorBoundary>
		</div>
	</>;
};

export default List;