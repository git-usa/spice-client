import React from "react";
import {useState} from "react";
import ResultBar from "../../singles/ResultBar";
import FormCreatePeople from "../../forms/FormCreatePeople";
import {_l, _ladEleById} from "../../../modules/scripts/_lady.js";
import validateForm from "../../../modules/scripts/validateForm";
import type TypeResult from "../../../modules/interfaces/TypeResult";
import RegisterPerson from "../../../modules/ajaxCalls/RegisterPerson";

const formId = "createPeopleForm";

const validate = (cbResult : (result : TypeResult) => void) => {
	validateForm(formId, (inputs) => {
		if(inputs.password !== inputs.repass){
			cbResult({text : "Password Mismatch", type : "error"});
			return;
		}
		
		RegisterPerson((result, data) => {
			cbResult(result);
			if(result.type === "pass"){
				console.info(data);
				_ladEleById<HTMLInputElement>("name").focus();
				_l(formId)._clearInputs("input,textarea");
			}
		}, inputs);
	}, cbResult);
};

const PeopleCreate = () => {
	console.info("CREATE PEOPLE RENDERED");
	const initial : TypeResult = {text : "Please input all fields", type : "info"};
	const [result, setResult]  = useState(initial);
	const resultBar            = <ResultBar text={result.text} type={result.type}/>;
	return <>
		<h3>Create People</h3>
		<div id={formId} className={"la-container flex-center-vertical"}>
			<FormCreatePeople
				onEnter={(e) => {
					if(e.key === "Enter" || e.keyCode === 13) validate(setResult);
				}}
				onClick={() => validate(setResult)}/>
		</div>
		<div>
			{resultBar}
		</div>
	</>;
	
};
export default PeopleCreate;