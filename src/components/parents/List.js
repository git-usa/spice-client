import Blank from "./Blank";
import {useEffect, useState} from "react";
import WrapError from "./WrapError";
import ListTeams from "../chidlren/Teams/ListTeams";
import JaxList from "../../modules/ajaxCalls/JaxList";
import ListPeople from "../chidlren/People/ListPeople";
import {_ladEleById} from "../../modules/scripts/_lady";
import ListMessages from "../chidlren/Messages/ListMessages";
import ListProjects from "../chidlren/Projects/ListProjects";
import ResultBar, {staticResultBar} from "../singles/ResultBar";
import type TypeResult from "../../modules/interfaces/TypeResult";
import type {CbJaxHandleComponentJax} from "../../modules/interfaces/TypeJax";
import {lat_isValidArray, lat_isValidObject} from "../../modules/scripts/labject";

/**
 *
 * @constructor
 * @param jax
 */
const List = (jax : CbJaxHandleComponentJax) => {
	console.count("LIST RENDERED");
	const btnReloadId               = "btnReload";
	const [reload, setReload]       = useState();
	const [component, setComponent] = useState(<Blank/>);
	
	const showResult = ({text, type} : TypeResult) => {
		console.info("SET RESULT");
		document.getElementById("setResult").innerHTML = staticResultBar(text, type);
	};
	
	useEffect(() => {
		// setComponent(<Blank/>);
		JaxList({by : jax.by, of : jax.of}, (result, data) => {
			
			{
				console.info("SHOWING RESULT");
				showResult(result);
			}
			
			if(result.type !== "info"){
				console.info("BUTTON ENABLED");
				_ladEleById(btnReloadId).disabled = false;
			}
			
			if(!data){
				console.info("NO DATA. RETURN");
				return;
			}
			
			if(!lat_isValidArray(data, 0) && !lat_isValidObject(data)){
				console.info("NOT VALID DATA");
				showResult({text : "No Records Found to List ", type : "error"});
				return;
			}
			
			// console.info(data);
			// return;
			
			console.info("SET COMPONENT");
			switch(jax.of){
				case "people":
					setComponent(<ListPeople cbResult={showResult} cbComponent={jax.cbHandler} people={data}/>);
					break;
				case "project":
					setComponent(<ListProjects cbResult={showResult} projects={data} cbComponent={jax.cbHandler}/>);
					break;
				case"team":
					setComponent(<ListTeams cbResult={showResult} teams={data} cbComponent={jax.cbHandler}/>);
					break;
				case "message":
					setComponent(<ListMessages messages={data}/>);
					break;
				default:
					console.info("RESULT 5");
					showResult({text : `No Component to List ${jax.of}`, type : "error"});
			}
			
		});
	}, [jax, reload]);
	
	const reloadList = () => {
		_ladEleById(btnReloadId).disabled = true;
		setReload(!reload);
	};
	
	return <>
		<div className={"la-container flex-center-vertical"}>
			<div className={"la-l8 la-s100"} id={"setResult"}></div>
			<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnReloadId} className={"w3-button w3-khaki w3-ripple"} onClick={reloadList}>Reload List</button>
			</div>
		</div>
		<div>
			<WrapError
				component={component}
				fallback={<ResultBar text={"Some Error In Loading List Component. Check Console."} type={"error"}/>}/>
		</div>
	</>;
};

export default List;