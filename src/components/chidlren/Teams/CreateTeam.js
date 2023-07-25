import {useEffect, useState} from "react";

import _l from "../../../modules/scripts/_lady";
import type TypeResult from "../../../modules/interfaces/TypeResult";
import ResultBar from "../../singles/ResultBar";
import {lats_post, lats_toJson} from "../../../modules/scripts/lajax";
import ShowTeamCreateForm from "./ShowTeamCreateForm";
import type {TypePeople} from "../../../modules/interfaces/TypePeople";
import BlankComponent from "../../singles/BlankComponent";

const validateForm = (cb : (result : TypeResult)=>void) => {
	const inputs = _l("createForm")._getInputs("input,textarea,select");
	
	if(typeof inputs === "string"){
		cb({text : inputs, type : "error"});
		return;
	}
	cb({text : "Registering Team...", type : "info"});
	lats_post({
		          url    : "http://localhost:8080/team",
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
			
			          _l("name").focus();
			          _l("createForm")._clearInputs();
			          cb({text : response.message, type : "pass"});
		          }
	          });
};

const validateOnEnter = (e : KeyboardEvent, cb) => {
	if(!(e.key === "Enter" || e.keyCode === 13)) return;
	validateForm(cb);
};
const validateOnClick = (e : MouseEvent, cb) => {
	validateForm(cb);
};

const GetListsForTeam = (cbList : (list : TypePeople[])=>void, cbResult : (result : TypeResult)=>void) => {
	cbResult({text : "Waiting for all lists...", type : "info"});
	lats_post({
		          url    : "http://localhost:8080/team",
		          params : {service : "listsToCreate"},
		          next   : (request) => {
			
			          console.info("RESPONSE RECEIVED");
			
			          const response = lats_toJson(request.response);
			          if(typeof response === "string"){
				          cbResult({text : response, type : "error"});
				          return;
			          }
			          if(!response.result){
				          cbResult({text : response.message, type : "error"});
				          return;
			          }
			
			          cbResult({text : "RESPONSE RECEIVED", type : "pass"});
			          cbList(response.data);
		          }
	          });
};

const CreateTeam = () => {
	
	console.info("CREATE TEAM RENDERED");
	
	const initial : TypeResult             = {text : "Welcome", type : "info"};
	const [result : TypeResult, setResult] = useState(initial);
	
	const [mainComp, setMainComp] = useState(<BlankComponent/>);
	
	const resultBar = <ResultBar text={result.text} type={result.type}/>;
	
	useEffect(() => {
		GetListsForTeam((list) => {
			console.info("SHOWING LISTS");
			if(!list || !list.projects || !list.people || list.projects.length === 0 || list.people.length === 0){
				setResult({text : "No Person or Project Found for Team UP", type : "error"});
				return;
			}
			
			setResult({text : "Please input all fields...", type : "info"});
			
			const form = <div id={"createForm"} className={"la-container flex-center-vertical"}>
				<ShowTeamCreateForm
					projectList={list.projects}
					peopleList={list.people}
					cbResult={setResult}
					onEnter={(e) => validateOnEnter(e, setResult)}
					onClick={(e) => validateOnClick(e, setResult)}/>
			</div>;
			
			setMainComp(form);
		}, setResult);
	}, []);
	
	return <>
		<h3>Create Team</h3>
		<div>
			{mainComp}
		</div>
		<div>
			{resultBar}
		</div>
	</>;
	
};
export default CreateTeam;