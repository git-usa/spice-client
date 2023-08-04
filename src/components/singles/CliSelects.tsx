import React from "react";
import type {TypePeople} from "../../modules/interfaces/TypePeople";
import type {TypeProject} from "../../modules/interfaces/TypeProject";

export const CliSelect = (props : { id : string, list : any[], classes? : string; }) => {
	const optionsList = props.list.map(v => {
		return <option key={`${props.id}_${v.id}`} value={v.id} className={"la-capital"}>{v.text}</option>;
	});
	return <select id={props.id} className={`w3-input la-input ${props.classes}`}>{optionsList}</select>;
};

export const SelPeople = (props : { peopleList : TypePeople[] }) => {
	
	const optionList = props.peopleList.map(v => {
		return <option value={v.id} className={"la-capital"}>{`${v.name} | ${v.role}`}</option>;
	});
	
	return <select id={"manager"}>{optionList}</select>;
};

export const SelProject = (props : { projectList : TypeProject[], id? : string, classes? : string }) => {
	const optionList = props.projectList.map(v => {
		return <option key={`selProject${v.id}`} value={v.id} className={"la-capital"}>{`${v.name} | ${v.category}`}</option>;
	});
	
	return <select id={props.id || "project"} className={props.classes}>{optionList}</select>;
};