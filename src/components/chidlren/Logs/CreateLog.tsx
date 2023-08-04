import React from "react";
import {useEffect, useState} from "react";
import {WrapComp} from "../../parents/WrapError";
import {showResultBar} from "../../singles/ResultBar";
import FormCreateLog from "../../forms/FormCreateLog";
import {_ladEleById} from "../../../modules/scripts/_lady.js";
import JaxMyList from "../../../modules/ajaxCalls/JaxMyList";
import validateForm from "../../../modules/scripts/validateForm";
import type TypeResult from "../../../modules/interfaces/TypeResult";
import Blank from "../../parents/Blank";
import type {TypeLog} from "../../../modules/interfaces/TypeLog";
import JaxCreate from "../../../modules/ajaxCalls/JaxCreate";

const formId      = "createLogForm";
const btnReloadId = "btnReloadCreateLog";
const resultBarId = "setCreateLogResult";

const showResult = (result : TypeResult) => showResultBar(resultBarId, result);

const validate  = () => {
	console.info("validating form");
	validateForm(formId, (inputs : TypeLog) => {
		const log : TypeLog = {brief : inputs.brief, path : "projects", document : inputs.path, action : inputs.action};
		JaxCreate({of : "log", by : log}, (result, data) => {
			showResult(result);
			if(!data) return;
			console.info(data);
		});
		
	}, showResult, "input,select");
};
const CreateLog = () => {
	
	const [reload, setReload]     = useState<boolean>();
	const [mainComp, setMainComp] = useState(<Blank/>);
	
	useEffect(() => {
		setMainComp(<Blank/>);
		showResult({type : "info", text : "Getting Project List..."});
		JaxMyList({of : "project", by : null}, (result, data) => {
			showResult(result);
			if(result.type === "info") return;
			_ladEleById<HTMLButtonElement>(btnReloadId).disabled = false;
			if(!data) return;
			showResult({text : "Input All Fields", type : "info"});
			setMainComp(
				<WrapComp component={<FormCreateLog extra={data} onEnter={onEnter} onClick={onClick}/>} msg={"Error in Create Log Form"}/>
			);
		});
	}, [reload]);
	
	const onClick = () => validate();
	const onEnter = (e : React.KeyboardEvent) => (e.key === "Enter" || e.keyCode === 13) && validate();
	
	const reloadList = () => {
		_ladEleById<HTMLButtonElement>(btnReloadId).disabled = true;
		setReload(!reload);
	};
	
	return <>
		<div className={"la-container"}>
			<div id={resultBarId} className={"la-l8 la-s"}></div>
			<div className={"la-l2 la-s"}>
				<button id={btnReloadId} onClick={reloadList} className={"w3-khaki w3-button w3-ripple la-btn"}>Reload Form</button>
			</div>
			<div className={"la-l8 la-s"}></div>
			<div id={formId} className={"la-l la-s"}>{mainComp}</div>
		</div>
	</>;
};

export default CreateLog;