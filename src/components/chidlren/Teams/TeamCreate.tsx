import React from "react";
import {useEffect, useState} from "react";
import {showResultBar} from "../../singles/ResultBar";
import FormCreateTeam from "../../forms/FormCreateTeam";
import BlankComponent from "../../singles/BlankComponent";
import JaxCreate from "../../../modules/ajaxCalls/JaxCreate";
import JaxMyList from "../../../modules/ajaxCalls/JaxMyList";
import _l, {_ladEleById} from "../../../modules/scripts/_lady.js";
import type TypeResult from "../../../modules/interfaces/TypeResult";

const formId      = "createTeamForm";
const btnReloadId = "btnReloadCreateTeam";
const resultBarId = "setCreateTeamResult";
const showResult  = (result : TypeResult) => showResultBar(resultBarId, result);

const validate = () => {
	const inputs = _l(formId)._getInputs("input,textarea,select");
	
	if(typeof inputs === "string"){
		showResult({text : inputs, type : "error"});
		return;
	}
	showResult({text : "Registering Team...", type : "info"});
	
	JaxCreate({of : "team", by : inputs}, (result, data) => {
		showResult(result);
		if(result.type === "info") return;
		if(!data) return;
		console.info(data);
		_l(formId)._clearInputs("input,textarea");
	});
};

const TeamCreate = () => {
	
	console.info("CREATE TEAM RENDERED");
	
	const [reload, setReload]     = useState<boolean>();
	const [mainComp, setMainComp] = useState(<BlankComponent/>);
	
	const onEnter = (e : React.KeyboardEvent) => {
		if(e.key === "Enter" || e.keyCode === 13) validate();
	};
	const onClick = () => validate();
	
	useEffect(() => {
		
		JaxMyList({of : "createTeam", by : null}, (result, data) => {
			showResult(result);
			if(result.type === "info") return;
			_ladEleById<HTMLButtonElement>(btnReloadId).disabled = false;
			if(!data) return;
			if(!data.projects || !data.people || data.projects.length === 0 || data.people.length === 0){
				showResult({text : "No Person or Project Found for Team UP", type : "error"});
				return;
			}
			
			const form = <>
				<div id={formId} className={"la-container flex-center-vertical"}>
					<FormCreateTeam projectList={data.projects}
					                peopleList={data.people}
					                cbResult={showResult}
					                onEnter={onEnter}
					                onClick={onClick}/>
				</div>
			</>;
			
			setMainComp(form);
		});
	}, [reload]);
	
	const reloadList = () => {
		_ladEleById<HTMLButtonElement>(btnReloadId).disabled = true;
		setReload(!reload);
	};
	
	return <>
		<h3>Create Team</h3>
		<div className={"la-container"}>
			<div id={resultBarId} className={"la-l8 la-s"}></div>
			<div className={"la-l2 la-s"}>
				<button id={btnReloadId} onClick={reloadList} className={"w3-khaki w3-button w3-ripple la-btn"}>Reload Form</button>
			</div>
		</div>
		<div>
			{mainComp}
		</div>
	</>;
	
};
export default TeamCreate;