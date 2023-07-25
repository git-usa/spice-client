import {useEffect} from "react";
import _l from "../../../modules/scripts/_lady";
import type {TypeListTeam} from "../../../modules/interfaces/TypeList";
import type {TypeResultCb} from "../../../modules/interfaces/TypeResult";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import {lat_cloneObject} from "../../../modules/scripts/labject";

interface Type{
	teams : TypeListTeam[];
	cbResult : TypeResultCb;
	cbComponent : HandleComponentJax;
}

const ListTeams = (props : Type) => {
	
	console.count("SHOW TEAM LIST RENDERED");
	const tabId = "listTable";
	
	const teams : TypeListTeam[]               = props.teams;
	const cbResult : TypeResultCb             = props.cbResult;
	const cbComponentJax : HandleComponentJax = props.cbComponent;
	
	useEffect(() => {
		console.info("SHOW TEAM LIST USE EFFECT RENDERED");
		
		if(!teams || teams.length === 0){
			console.error("NO TEAM DATA RECEIVED. CHANGING RESULT");
			cbResult({text : "No Team Received", type : "error"});
			return;
		}
		
		const mod = () => teams.map(
			team => {
				const t : TypeListTeam = lat_cloneObject(team);
				
				const creator = "creator" in team && team.creator;
				const manager = "manager" in team && team.manager;
				const project = "project" in team && team.project;
				
				t.creatorId = creator._id;
				t.managerId = manager._id;
				t.projectId = project._id;
				
				t.creator = creator.name;
				t.manager = manager.name;
				t.project = project.name;
				
				return t;
			});
		
		console.info("FOUND TEAM DATA. CHANGING RESULT MESSAGE");
		cbResult({text : "Showing Team Data", type : "info"});
		
		const onShow = (c, h, v, i : TypeListTeam) => {
			if(!i) return;
			
			switch(h){
				case "name":
				case "creator":
				case "manager":
				case "project":
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
					c._click(() => cbComponentJax("profile", {of : "team", by : i._id}));
					break;
				case "creator":
					c._click(() => cbComponentJax("profile", {of : "people", by : i.creatorId}));
					break;
				case "manager":
					c._click(() => cbComponentJax("profile", {of : "people", by : i.managerId}));
					break;
				case "project":
					c._click(() => cbComponentJax("profile", {of : "project", by : i.projectId}));
			}
		};
		
		const table = _l(tabId)._replace();
		table._showData(mod(), null, "name category creator manager project createdAt brief", onShow, null, true, {createdAt : {input : "date"}})
		     ._classes("w3-table w3-table-all");
		
	}, []);
	
	return <><div id={tabId}></div></>;
};

export default ListTeams;