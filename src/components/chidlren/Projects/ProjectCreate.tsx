import React from "react";
import {useEffect, useState} from "react";
import _l, {_ladEleById} from "../../../modules/scripts/_lady.js";
import type {TypeResult, HandleResult} from "../../../modules/interfaces/TypeResult";
import ResultBar from "../../singles/ResultBar";
import {lats_post, lats_toJson} from "../../../modules/scripts/lajax";
import FormCreateProject from "../../forms/FormCreateProject";
import type {TypePeople} from "../../../modules/interfaces/TypePeople";
import BlankComponent from "../../singles/BlankComponent";

const validateForm = (cb : HandleResult) => {
	const inputs = _l("createForm")._getInputs("input,textarea,select");
	
	if(typeof inputs === "string"){
		cb({text : inputs, type : "error"});
		return;
	}
	// cb({text : "Check Console...", type : "info"});
	// return;
	cb({text : "Registering Project...", type : "info"});
	lats_post({
		          url    : "http://localhost:8080/project",
		          params : {service : "register", params : inputs},
		          next   : (request) => {
			          const response = lats_toJson(request.response);
			          if(typeof response === "string"){
				          cb({text : response, type : "error"});
				          return;
			          }
			
			          if(!response.result){
				          cb({text : response.message, type : "error"});
				          return;
			          }
			
			          _ladEleById<HTMLInputElement>("name").focus();
			          _l("createForm")._clearInputs("input,textarea");
			          cb({text : response.message, type : "pass"});
			          // console.info(response.data);
		          }
	          });
};

const validateOnEnter = (e : React.KeyboardEvent, cb : HandleResult) => {
	if(!(e.key === "Enter" || e.keyCode === 13)) return;
	validateForm(cb);
};
const validateOnClick = (e : React.MouseEvent, cb : HandleResult) => {
	validateForm(cb);
};

const getPeopleList = (cbList : (list : TypePeople[]) => void, cbResult : (result : TypeResult) => void) => {
	cbResult({text : "Waiting for People list...", type : "info"});
	lats_post({
		          url    : "http://localhost:8080/people",
		          params : {service : "list"},
		          next   : (request) => {
			          const response = lats_toJson(request.response);
			          if(typeof response === "string"){
				          cbResult({text : response, type : "error"});
				          return;
			          }
			          if(!response.result){
				          cbResult({text : response.message, type : "error"});
				          return;
			          }
			          cbList(response.data);
		          }
	          });
};

const ProfileProject = () => {
	
	console.info("CREATE PROJECT RENDERED");
	
	const initial : TypeResult = {text : "Welcome", type : "info"};
	const [result, setResult]  = useState(initial);
	
	const [mainComp, setMainComp] = useState(<BlankComponent/>);
	
	const resultBar = <ResultBar text={result.text} type={result.type}/>;
	
	useEffect(() => {
		getPeopleList((list) => {
			if(!list || list.length === 0){
				setResult({text : "No Person Found for Manager", type : "error"});
				return;
			}
			
			setResult({text : "Please input all fields...", type : "info"});
			
			const form = <div id={"createForm"} className={"la-container flex-center-vertical"}>
				<FormCreateProject peopleList={list}
				                   cbResult={setResult}
				                   onEnter={(e) => validateOnEnter(e, setResult)}
				                   onClick={(e) => validateOnClick(e, setResult)}/>
			</div>;
			
			setMainComp(form);
		}, setResult);
	}, []);
	
	return <>
		<h3>Create Project</h3>
		<div>
			{mainComp}
		</div>
		<div>
			{resultBar}
		</div>
	</>;
	
};
export default ProfileProject;