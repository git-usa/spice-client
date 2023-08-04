import {InpBrief, InpCategory, InpName} from "../singles/CliInputs";
import React, {useEffect} from "react";
import {BtnRegister} from "../singles/CliButtons";
import type {TypePeople} from "../../modules/interfaces/TypePeople";
import {SelPeople} from "../singles/CliSelects";
import type TypeResult from "../../modules/interfaces/TypeResult";

const rowClass = "la-s100 la-l100 la-container flex-center-vertical w3-padding-hor-16";

const FormCreateProject = (
	props : {
		peopleList : TypePeople[],
		onEnter : (e : React.KeyboardEvent) => void,
		onClick : (e : React.MouseEvent) => void,
		cbResult : (result : TypeResult) => void
	}) => {
	
	useEffect(() => {
		document.getElementById("name")?.focus();
	}, []);
	
	if(!props.peopleList || props.peopleList.length === 0){
		props.cbResult({text : "Received People List is Empty, can't show form.", type : "error"});
		return <></>;
	}
	
	const components : any = {
		name     : <InpName onEnter={props.onEnter} id={"name"}/>,
		category : <InpCategory onEnter={props.onEnter} id={"category"}/>,
		manager  : <SelPeople peopleList={props.peopleList}/>,
		brief    : <InpBrief onEnter={props.onEnter} id={"brief"}/>
	};
	
	const render = Object.keys(components).map(key => {
		const component = components[key];
		return <div key={`create${key}ForProject`} className={rowClass}>
			<div id={key + "label"} className={"la-s100 la-l010 la-capital la-bold w3-text-red"}>{key}</div>
			<div className={"la-s100 la-l25"}>{component}</div>
		</div>;
	});
	
	return <>
		{render}
		<div className={rowClass}>
			<div className={"la-s100 la-l010 la-capital la-bold w3-text-deep-purple"}>Actions</div>
			<div className={"la-s100 la-l25"}>
				<div className={"w3-bar"}>
					<BtnRegister onclick={props.onClick} colorClass={"w3-khaki w3-right w3-bar-item"}/>
				</div>
			</div>
		</div>
	</>;
};

export default FormCreateProject;