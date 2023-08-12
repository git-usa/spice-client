import React from "react";
import Blank from "./Blank";
import {WrapComp} from "./WrapError";
import {useEffect, useState} from "react";
import {showResultBar} from "../singles/ResultBar";
import JaxList from "../../modules/ajaxCalls/JaxList";
import ListSwitch from "../chidlren/Lists/ListSwitch";
import {_ladEleById} from "../../modules/scripts/_lady.js";
import TypeResult from "../../modules/interfaces/TypeResult";
import type {CbJaxHandleComponentJax} from "../../modules/interfaces/TypeJax";
import {lat_isValidArray, lat_isValidObject} from "../../modules/scripts/labject.js";

const btnReloadId = "btnReload";
const resultBarId = "setListResult";

const showResult   = (result : TypeResult) => showResultBar(resultBarId, result);
const toggleButton = (enable = false) => _ladEleById<HTMLButtonElement>(btnReloadId).disabled = !enable;

/**
 *
 * @constructor
 * @param jax
 * @param cbHandler
 */
const List = ({jax, cbHandler} : CbJaxHandleComponentJax) => {
	console.count("LIST RENDERED");
	const [reload, setReload]       = useState<boolean>();
	const [component, setComponent] = useState(<Blank/>);
	
	const reloadList = () => setReload(!reload);
	
	useEffect(() => {
		toggleButton();
		setComponent(<Blank/>);
		JaxList({by : jax.by, of : jax.of}, (result, data) => {
			
			// console.info("SHOWING RESULT");
			showResultBar(resultBarId, result);
			
			if(result.type !== "info") toggleButton(true);
			
			if(!data) return;
			
			if(!lat_isValidArray(data, 0) && !lat_isValidObject(data)){
				showResult({text : "No Records Found to List ", type : "error"});
				return;
			}
			
			console.info("SET COMPONENT");
			setComponent(<WrapComp component={<ListSwitch of={jax.of} list={data} cbHandler={cbHandler}/>} msg={"List Component:"}/>);
		});
	}, [jax, reload]);
	
	return <>
		<div className={"la-container flex-center-vertical"}>
			<div className={"la-l8 la-s100"} id={resultBarId}></div>
			<div className={"la-l2 la-s10 w3-right-align"}>
				<button id={btnReloadId} className={"w3-button w3-khaki w3-ripple"} onClick={reloadList}>Reload List</button>
			</div>
		</div>
		{component}
	</>;
};

export default List;