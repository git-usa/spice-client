import {useEffect, useState} from "react";
import type TypeResult from "../../modules/interfaces/TypeResult";
import ResultBar from "../singles/ResultBar";
import JaxList from "../../modules/ajaxCalls/JaxList";
import type {CbJax} from "../../modules/interfaces/TypeJax";
import {lat_isValidArray} from "../../modules/scripts/labject";
import Blank from "./Blank";
import {_ladEleById} from "../../modules/scripts/_lady";
import ListPeople from "../chidlren/People/ListPeople";
import ListProjects from "../chidlren/Projects/ListProjects";
import ListTeams from "../chidlren/Teams/ListTeams";
import ListMessages from "../chidlren/People/ListMessages";

/**
 *
 * @constructor
 * @param jax
 */
const List = (jax : CbJax) => {
	
	console.info(jax);
	const btnReloadId = "btnReload";
	
	const init : TypeResult                = {text : "", type : ""};
	const [reload, setReload]              = useState();
	const [component, setComponent]        = useState(<Blank/>);
	const [result : TypeResult, setResult] = useState(init);
	
	useEffect(() => {
		setComponent(<Blank/>);
		JaxList({by : jax.by, of : jax.of}, (result, data) => {
			setResult(result);
			_ladEleById(btnReloadId).disabled = false;
			if(!lat_isValidArray(data, 0)) return;
			
			if(data.length === 0){
				setResult({text : `No Records Found to List ${jax.of}`, type : "error"});
				return;
			}
			
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
					setComponent(<ListMessages messages={data}/>)
					break;
				default:
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
		<div>{component}</div>
	</>;
};

export default List;