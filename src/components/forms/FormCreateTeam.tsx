import React from "react";
import {InpBrief, InpCategory, InpName} from "../singles/CliInputs";
import {useEffect} from "react";
import {BtnRegister} from "../singles/CliButtons";
import type {TypePeople} from "../../modules/interfaces/TypePeople";
import {SelPeople, SelProject} from "../singles/CliSelects";
import type TypeResult from "../../modules/interfaces/TypeResult";
import type {TypeProject} from "../../modules/interfaces/TypeProject";

const rowClass = "la-s100 la-l100 la-container flex-center-vertical w3-padding-hor-16";

interface Type{
	projectList : TypeProject[],
	peopleList : TypePeople[],
	onClick : (e : React.MouseEvent) => void,
	cbResult : (result : TypeResult) => void,
	onEnter : (e : React.KeyboardEvent) => void,
}

const FormCreateTeam = (props : Type) => {
	
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
		project  : <SelProject projectList={props.projectList}/>,
		manager  : <SelPeople peopleList={props.peopleList}/>,
		brief    : <InpBrief onEnter={props.onEnter} id={"brief"}/>
	};
	
	const render = Object.keys(components).map(key => {
		const component = components[key];
		return <div className={rowClass}>
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

export default FormCreateTeam;