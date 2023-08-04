import React from "react";
import {useEffect} from "react";
import _l, {_lady} from "../../../modules/scripts/_lady.js";
import type {HandleResultData} from "../../../modules/interfaces/TypeResult";
import {lat_cloneObject} from "../../../modules/scripts/labject.js";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeListProject} from "../../../modules/interfaces/TypeList";

interface Type{
	projects : TypeListProject[];
	cbResult : HandleResultData;
	cbComponent : HandleComponentJax;
}

const ListProjects = (props : Type) => {
	
	console.info("SHOW PROJECT LIST RENDERED");
	
	const projects : TypeListProject[]     = props.projects;
	const cbResult : HandleResultData      = props.cbResult;
	const cbComponent : HandleComponentJax = props.cbComponent;
	
	useEffect(() => {
		console.info("SHOW PROJECT LIST USE EFFECT RENDERED");
		
		if(!projects || projects.length === 0){
			console.error("NO PROJECT DATA RECEIVED. CHANGING RESULT");
			cbResult({text : "No Project Received", type : "error"});
			return;
		}
		
		const cloneProjects = projects.map(project => {
			const pro : any = lat_cloneObject(project);
			pro.creator     = project.creator.name;
			pro.manager     = project.manager.name;
			pro.creatorId   = project.creator.id;
			pro.managerId   = project.manager.id;
			return pro;
		});
		
		const onShow = (c : typeof _lady, h : string, v : any, i : TypeListProject) => {
			if(!i) return;
			
			switch(h){
				case "name":
				case "creator":
				case "manager":
					c._capitalWords()._classes("w3-text-blue la-bold la-underline-hover la-unset");
					break;
				case "category":
					c._capitalWords();
					break;
				default:
					return;
			}
			
			switch(h){
				case "name":
					c._click(() => cbComponent("profile", {of : "project", by : i._id}));
					break;
				case"creator":
					c._click(() => cbComponent("profile", {of : "people", by : i.creatorId}));
					break;
				case"manager":
					c._click(() => cbComponent("profile", {of : "people", by : i.managerId}));
					break;
			}
		};
		
		const table = _l("listTable")._replace(null);
		table._showData(
			cloneProjects,
			null,
			"name category creator manager createdAt teams brief",
			onShow,
			null,
			true,
			{createdAt : {input : "date"}}
		)._classes("w3-table w3-table-all");
		
	}, []);
	
	return <><div id={"listTable"}></div></>;
};

export default ListProjects;