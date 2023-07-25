import {useEffect} from "react";
import _l from "../../../modules/scripts/_lady";
import type {TypeResultCb} from "../../../modules/interfaces/TypeResult";
import {lat_cloneObject} from "../../../modules/scripts/labject";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeListProject} from "../../../modules/interfaces/TypeList";

interface Type{
	projects : TypeListProject[];
	cbResult : TypeResultCb;
	cbComponent : HandleComponentJax;
}

const ListProjects = (props : Type) => {
	
	console.info("SHOW PROJECT LIST RENDERED");
	
	const projects : TypeListProject[]      = props.projects;
	const cbResult : TypeResultCb          = props.cbResult;
	const cbComponent : HandleComponentJax = props.cbComponent;
	
	useEffect(() => {
		console.info("SHOW PROJECT LIST USE EFFECT RENDERED");
		
		if(!projects || projects.length === 0){
			console.error("NO PROJECT DATA RECEIVED. CHANGING RESULT");
			cbResult({text : "No Project Received", type : "error"});
			return;
		}
		
		const projs = projects.map(project => {
			const pro     = lat_cloneObject(project);
			const creator = "creator" in pro && pro.creator;
			const manager = "manager" in pro && pro.manager;
			
			pro.creatorId = creator._id;
			pro.managerId = manager._id;
			
			pro.creator = creator.name;
			pro.manager = manager.name;
			
			return pro;
		});
		
		const onShow = (c, h, v, i : TypeListProject) => {
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
		
		const table = _l("listTable")._replace();
		table._showData(
			projs,
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